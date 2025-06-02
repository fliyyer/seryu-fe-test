# 🎬 Cinema App

A modern movie browsing web application powered by [The Movie Database (TMDB)](https://www.themoviedb.org/), built with **React 19**, **TypeScript**, **React Query**, and **Tailwind CSS**.

---

## 🚀 Features

- 🔐 **TMDB Authentication** (Login via TMDB)
- 🎞️ Display **Now Playing** and **Top Rated** movies
- 🔍 Movie **search** with suggestion dropdown
- 📝 **Movie detail** page with information & rating
- ❤️ Add/remove movie to/from **Favorites**
- 📌 Add/remove movie to/from **Watchlist**
- 📁 View list of **Favorites** and **Watchlist**

---

## 📦 Tech Stack

 - ⚛️ React 19
 - 🎨 Tailwind CSS
 - 🎯 TypeScript
 - 🔁 React Query v5 (TanStack Query)
 - 🌐 Axios
 - 🚦 React Router DOM v7
 - 🔔 React Toastify — Notifikasi toast
 - 🛠️ Vite
 - 🧼 ESLint
---

# Run Project
```
git clone https://github.com/your-username/cinema-app.git
cd cinema-app

Install dependencies
npm install

# Start the dev server
npm run dev
```

## ⚙️ Environment Variables

Create a `.env` file at the root of the project and add the following:

```env
VITE_TMDB_API_KEY=...
VITE_TMDB_API_URL=https://api.themoviedb.org/3
VITE_BASE_URL=http://localhost:5173
```


## 🔑 TMDB Login Flow
1. User clicks Login TMDB button
2. Redirected to TMDB for permission
3. On success, redirected back to /auth/callback
4. tmdb_session_id is stored in localStorage and used for all authorized API calls