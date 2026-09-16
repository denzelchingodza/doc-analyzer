#!/bin/bash
cd "$(dirname "$0")"
git add frontend/app/page.tsx frontend/components/Sidebar.tsx frontend/components/MainPanel.tsx frontend/app/app/page.tsx
git commit -m "feat: dark SU maroon theme across landing page and chat app"
git push origin main
