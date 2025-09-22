# AI Resume Analyzer 🚀

**AI Resume Analyzer** is a modern web application that evaluates resumes against job descriptions, producing an **ATS-like score**, skills match, and actionable suggestions to improve your chances of getting hired.  

Built with **Next.js + Tailwind CSS** for a sleek frontend and **FastAPI** for a high-performance backend, this project includes **dark mode support**, a responsive design, and a full Docker setup for production deployment.  

---

## 🌟 Features

- Upload PDF resumes and get instant analysis.
- Compare resumes with a specific job description.
- Generates:
  - ATS-style **score**.
  - **Matched and missing skills**.
  - **Actionable improvement advice**.
- Dark mode toggle for modern UI experience.
- Responsive design (desktop + mobile).
- Dockerized for **easy deployment**.
- Simple **drag-and-drop upload** with file preview.

---



## 🏗 Tech Stack

| Layer        | Technology |
| ------------ | ---------- |
| Frontend     | Next.js, Tailwind CSS, Axios, next-themes |
| Backend      | FastAPI, Python, Uvicorn, Gunicorn |
| ML/NLP       | Scikit-learn (TF-IDF), pdfminer.six |
| Containerization | Docker, Docker Compose |
| Version Control | Git, GitHub |

---

## ⚡ Quick Start

### 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/ai-resume-analyzer.git<br>
cd ai-resume-analyzer

### 2. Run with Docker (recommended)

docker-compose up --build
Frontend: http://localhost:3000
Backend API Docs: http://localhost:8000/docs

### 3. Run in Dev Mode (optional)
- Backend
  - cd backend
  - python -m venv venv
  - source venv/bin/activate   # Windows: venv\Scripts\activate
  - pip install -r requirements.txt
  - uvicorn app.main:app --reload --port 8000

- Frontend
  - cd frontend
  - npm install
  - npm run dev
  ➡ http://localhost:3000

### 🛠 Usage

- Open the web app in your browser.
- Drag & drop or select a PDF resume.
- Optionally, enter a job description.
- Click Analyze Resume.

View:
- Score (0–100)
- Matched / Missing Skills
- Advice for improvement
- Toggle between light & dark mode with the navbar button.

### 📦 Project Structure
 

ai-resume-analyzer/<br>
├─ backend/              # FastAPI backend<br>
│  ├─ app/<br>
│  │  ├─ main.py<br>
│  │  ├─ model.py<br>
│  │  └─ utils.py<br>
│  └─ Dockerfile<br>
├─ frontend/             # Next.js + Tailwind frontend<br>
│  ├─ pages/<br>
│  ├─ components/<br>
│  ├─ styles/<br>
│  └─ Dockerfile<br>
├─ docker-compose.yml<br>
├─ README.md<br>
└─ .gitignore<br>

### 🚀 Future Improvements
- Replace TF-IDF with sentence-transformers for semantic skill matching.
- Add user authentication (JWT) and store uploads in S3 / cloud storage.
- Deploy backend to Render / Cloud Run and frontend to Vercel.
- Add real-time resume parsing & feedback with progress animations.


### 📜 License
This project is MIT licensed. Feel free to use, modify, and contribute!

Made by Akitha Chanupama



---





