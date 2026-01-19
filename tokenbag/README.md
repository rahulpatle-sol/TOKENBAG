# 🎒 TokenBag v2 - Secure AI Node Sharing

TokenBag is a decentralized-style AI compute sharing platform. Create secure "Bags" of tokens and share them with your team or friends without exposing your master API keys.



## ⚡ Features
- **Secure Vaults:** Store and manage multiple AI nodes.
- **Anonymous Access:** Use AI without creating an account (via Bag IDs).
- **Real-time Chat:** Persisted chat history via Supabase.
- **Hacker Aesthetic:** Ultra-modern dark UI with Framer Motion.

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS, Lucide Icons
- **Backend:** Node.js, Express, Axios
- **Database:** Supabase (PostgreSQL)
- **Auth:** Google OAuth via Supabase

## 🚀 Installation
1. Clone the repo: `git clone https://github.com/your-username/tokenbag.git`
2. Install deps: `npm install`
3. Setup `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_BACKEND_URL`
4. Run: `npm run dev`

## 🔒 Protocol
Encryption: RSA-256
Handshake: JWT + Supabase Auth