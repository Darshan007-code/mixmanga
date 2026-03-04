# MixManga 📖

MixManga is a high-performance, modern platform for tracking and reading **Manga, Manhwa, and Webtoons**. Rebranded from MixAnime, it now offers a seamless vertical reading experience, professional database tracking, and industry-leading performance optimizations.

**Live Demo**: [https://mixmanga.onrender.com](https://mixmanga.onrender.com)

---

## 🚀 Key Features

- **Vertical Webtoon Reader**: A native, long-strip reading experience powered by the **Consumet API**.
- **Manga, Manhwa & Webtoon Tracking**: Comprehensive database for tracking your progress across all types of Asian media.
- **Smart Performance**: 
  - **In-Memory Caching**: Instant navigation with a specialized memory-first cache layer.
  - **Image Optimization**: Drastically reduced loading times with optimized thumbnail delivery.
- **Modern User Profiles**: Sleek, glassmorphic profile dashboard with real-time reading statistics and favorites.
- **Safe Content Filter**: A dedicated **Safe Search** system that keeps 18+ content hidden behind an explicit toggle.
- **Global Search**: Search across thousands of titles with instant results.
- **User Authentication**: Secure JWT-based login and registration system.

---

## 🛠️ Technologies Used

- **Frontend**: React.js (Vite), Tailwind CSS, Framer Motion (for high-end animations).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Local or Atlas).
- **APIs**: AniList (Metadata), Consumet (Chapter fetching and image lists).
- **Caching**: Specialized Memory Map + LocalStorage fallback.

---

## 💻 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally or on Atlas)

### Steps

1. **Clone the Project**:
   ```bash
   git clone https://github.com/Darshan007-code/mixmanga.git
   cd mixmanga
   ```

2. **Backend Configuration**:
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGO_DB_URL=mongodb://localhost:27017/mixmanga
   JWT_SECRET=your_secret_key
   SALT=10
   ```

3. **Install Dependencies**:
   ```bash
   # Root
   npm install
   
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

4. **Run the Application**:
   ```bash
   # In one terminal (Backend)
   cd backend
   npm start
   
   # In another terminal (Frontend)
   cd frontend
   npm run dev
   ```

---

## 👤 Developer

Developed and Optimized by **Darshan Patil**.

- **GitHub**: [@Darshan007-code](https://github.com/Darshan007-code)
- **Project URL**: [https://github.com/Darshan007-code/mixmanga](https://github.com/Darshan007-code/mixmanga)

---

## 📜 License

This project is licensed under the MIT License.

---

*Thank you for using MixManga! If you find this project useful, feel free to give it a ⭐ on GitHub.*
