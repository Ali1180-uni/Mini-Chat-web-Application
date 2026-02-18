# Deployment Guide for Chat.io

## Architecture
- **Frontend**: Deployed on Netlify (static hosting)
- **Backend**: Deployed on Render (supports WebSockets)

> ⚠️ **Important**: Netlify doesn't support WebSockets. The backend MUST be deployed on Render, Railway, or similar.

---

## 🚀 Backend Deployment (Render)

### Option 1: Deploy via Dashboard
1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo
4. Configure:
   - **Root Directory**: `Backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variable:
   - `FRONTEND_URL` = Your Netlify URL (e.g., `https://your-app.netlify.app`)
6. Click **"Create Web Service"**
7. Copy your backend URL (e.g., `https://chat-io-backend.onrender.com`)

### Option 2: Deploy via render.yaml
1. Push your code to GitHub
2. Go to Render Dashboard → **"New +"** → **"Blueprint"**
3. Select your repo - it will auto-detect `render.yaml`

---

## 🌐 Frontend Deployment (Netlify)

### Step 1: Deploy
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub repo
4. Configure:
   - **Base directory**: `Frontend/Chat.io`
   - **Build command**: `npm run build`
   - **Publish directory**: `Frontend/Chat.io/dist`
5. Click **"Deploy"**

### Step 2: Add Environment Variable
1. Go to **Site settings** → **Environment variables**
2. Add:
   - **Key**: `VITE_BACKEND_URL`
   - **Value**: Your Render backend URL (e.g., `https://chat-io-backend.onrender.com`)
3. **Trigger a redeploy** for changes to take effect

---

## 🔧 Environment Variables Summary

### Frontend (Netlify)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BACKEND_URL` | Backend WebSocket server URL | `https://chat-io-backend.onrender.com` |

### Backend (Render)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Auto-set by Render | - |
| `FRONTEND_URL` | Allowed CORS origin | `https://your-app.netlify.app` |

---

## 🧪 Testing Deployment

1. Open your Netlify URL
2. Open the same URL in another browser/incognito
3. Send messages between both windows
4. Messages should sync in real-time!

---

## 🐛 Troubleshooting

### WebSocket Connection Failed
- Ensure `VITE_BACKEND_URL` is set correctly in Netlify
- Check Render logs for errors
- Verify `FRONTEND_URL` in Render matches your Netlify domain

### CORS Errors
- Update `FRONTEND_URL` in Render to match your Netlify URL exactly
- Include `https://` in the URL

### Render Free Tier Spin-down
- Free Render instances spin down after 15 mins of inactivity
- First message after spin-down may take ~30 seconds to connect

---

## 📱 Local Development

```bash
# Terminal 1 - Backend
cd Backend
npm install
npm run dev

# Terminal 2 - Frontend
cd Frontend/Chat.io
npm install
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:3000
