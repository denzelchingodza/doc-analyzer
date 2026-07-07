"""
DocuZen Eval Scorer
-------------------
Uploads the golden test document to the DocuZen API, fires every question
in questions.json, grades each answer by checking how many expected keywords
appear in the response, then exits 0 (pass) or 1 (fail) based on a threshold.

The GitHub Action reads the exit code. Exit 1 fails the build.

Environment variables:
  DOCUZEN_API_URL   Base URL of the running backend. Default: http://localhost:8000
  EVAL_THRESHOLD    Minimum pass rate (0.0 to 1.0) required. Default: 0.75
"""

import json
import os
import sys
import time

import requests

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

API_BASE   = os.getenv("DOCUZEN_API_URL", "http://localhost:8000").rstrip("/")
THRESHOLD  = float(os.getenv("EVAL_THRESHOLD", "0.75"))

DATASET_DIR    = os.path.join(os.path.dirname(__file__), "dataset")
TEST_DOC_PATH  = os.path.join(DATASET_DIR, "test_document.pdf")
QUESTIONS_PATH = os.path.join(DATASET_DIR, "questions.json")

# ---------------------------------------------------------------------------
# API helpers
# ---------------------------------------------------------------------------

def upload_document():
    """Upload the test PDF and return the document ID."""
    with open(TEST_DOC_PATH, "rb") as f:
        response = requests.post(
            f"{API_BASE}/documents/upload",
            files={"file": ("test_document.pdf", f, "application/pdf")},
            timeout=60,
        )
    response.raise_for_status()
    doc_id = response.json()["id"]
    print(f"  Uploaded test document → ID: {doc_id}")
    return doc_id


def wait_for_ready(doc_id, timeout=120):
    """Poll the document status until it is ready or timeout is reached."""
    print("  Waiting for document to finish processing", end="", flush=True)
    for _ in range(timeout // 3):
        response = requests.get(f"{API_BASE}/documents/{doc_id}", timeout=10)
        status = response.json().get("status")
        if status == "ready":
            print(" done.")
            return True
        if status == "failed":
            print(" FAILED.")
            return False
        print(".", end="", flush=True)
        time.sleep(3)
    print(" TIMEOUT.")
    return False


def ask_question(doc_id, question):
    """Send a question to the chat endpoint and return the answer string."""
    response = requests.post(
        f"{API_BASE}/chat/",
        json={"document_id": doc_id, "question": question},
        timeout=30,
    )
    response.raise_for_status()
    return response.json()["answer"]


def delete_document(doc_id):
    """Clean up the test document after the eval run."""
    try:
        requests.delete(f"{API_BASE}/documents/{doc_id}", timeout=10)
        print(f"  Cleaned up test document {doc_id}")
    except Exception:
        pass  # cleanup failure should not affect the exit code


# ---------------------------------------------------------------------------
# Scoring
# ---------------------------------------------------------------------------

def score_answer(answer, expected_keywords):
    """
    Checks how many expected keywords appear in the answer (case insensitive).
    Returns a float between 0.0 and 1.0.

    Example: expected_keywords = ["contract", "January", "2024"]
    If the answer contains "contract" and "January" but not "2024", score = 0.67
    """
    if not expected_keywords:
        return 1.0
    answer_lower = answer.lower()
    hits = sum(1 for kw in expected_keywords if kw.lower() in answer_lower)
    return hits / len(expected_keywords)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def run_eval():
    print("\n" + "=" * 50)
    print("DocuZen Eval Runner")
    print(f"API: {API_BASE}")
    print(f"Threshold: {THRESHOLD:.0%}")
    print("=" * 50 + "\n")

    # Load questions
    with open(QUESTIONS_PATH) as f:
        questions = json.load(f)
    print(f"Loaded {len(questions)} questions from questions.json\n")

    # Upload test document
    print("Uploading test document...")
    try:
        doc_id = upload_document()
    except Exception as e:
        print(f"FATAL: Could not upload test document: {e}")
        sys.exit(1)

    # Wait for processing
    if not wait_for_ready(doc_id):
        print("FATAL: Document never became ready.")
        delete_document(doc_id)
        sys.exit(1)

    # Run questions
    print(f"\nRunning {len(questions)} questions...\n")
    results = []

    for q in questions:
        q_id      = q["id"]
        question  = q["question"]
        keywords  = q["expected_keywords"]
        min_score = q.get("min_keyword_score", 0.6)

        print(f"[{q_id}] {question}")

        try:
            answer = ask_question(doc_id, question)
        except Exception as e:
            print(f"  ERROR: {e}")
            results.append({"id": q_id, "passed": False, "score": 0.0, "error": str(e)})
            continue

        score  = score_answer(answer, keywords)
        passed = score >= min_score
        label  = "PASS" if passed else "FAIL"

        # Show a short preview of the answer
        preview = answer[:100].replace("\n", " ")
        print(f"  Answer: {preview}...")
        print(f"  Keywords matched: {score:.0%} (need {min_score:.0%}) → {label}\n")

        results.append({"id": q_id, "passed": passed, "score": score})

    # Clean up
    print("Cleaning up...")
    delete_document(doc_id)

    # Summary
    passed_count = sum(1 for r in results if r["passed"])
    total        = len(results)
    pass_rate    = passed_count / total if total else 0.0

    print("\n" + "=" * 50)
    print("EVAL SUMMARY")
    print("=" * 50)

    for r in results:
        icon = "✓" if r["passed"] else "✗"
        print(f"  {icon}  {r['id']}  ({r['score']:.0%})")

    print(f"\nPassed: {passed_count}/{total} ({pass_rate:.0%})")
    print(f"Required: {THRESHOLD:.0%}")
    print("=" * 50)

    if pass_rate < THRESHOLD:
        print(f"\nEVAL FAILED — quality dropped below {THRESHOLD:.0%}")
        print("Check the questions above marked with ✗ to see what regressed.")
        sys.exit(1)
    else:
        print(f"\nEVAL PASSED")
        sys.exit(0)


if __name__ == "__main__":
    run_eval()
