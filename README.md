# 🎒 TokenBag v2 - Secure AI Node Sharing

TokenBag is a decentralized-style AI compute sharing platform. Create secure "Bags" of tokens and share them with your team or friends without exposing your master API keys.

<img width="1906" height="1000" alt="image" src="https://github.com/user-attachments/assets/9867019e-f20c-4d81-aa2a-b7991aa6b7e4" />


## ⚡ Features
- **Secure Vaults:** Store and manage multiple AI nodes.
- **Anonymous Access:** Use AI without creating an account (via Bag IDs).
- **Real-time Chat:** Persisted chat history via Supabase.
- **Hacker Aesthetic:** Ultra-modern dark UI with Framer Motion.
<img width="1906" height="1000" alt="image" src="https://github.com/user-attachments/assets/8277f59d-f056-4b6a-bfd5-fe954933a9fe" />
 <img width="1872" height="873" alt="image" src="https://github.com/user-attachments/assets/d9469c3e-5124-4e26-938c-1aa2aace8427" />

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS, Lucide Icons
- **Backend:** Node.js, Express, Axios
- **Database:** Supabase (PostgreSQL)
- **Auth:** Google OAuth via Supabase
<img width="1935" height="1047" alt="image" src="https://github.com/user-attachments/assets/ce9285dd-c7ab-405c-8a6f-093779838828" />

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
