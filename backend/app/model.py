from typing import Dict, Any
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def extract_skills_from_text(text: str, top_k: int = 20):
    # Very basic heuristic: split by common separators and look for capitalized tokens or known tech words.
    candidates = set()
    tokens = text.replace('\n', ' ').split(' ')
    for t in tokens:
        tt = t.strip(',.;()')
        if len(tt) > 1 and tt[0].isupper() and len(tt) <= 25:
            candidates.add(tt)
    # Also include some known tech keywords if present
    common = ['Python','Java','JavaScript','Dart','Flutter','React','Node','SQL','NoSQL','AWS','Docker','Kubernetes','TensorFlow','PyTorch','FastAPI','PostgreSQL']
    for k in common:
        if k.lower() in text.lower():
            candidates.add(k)
    return list(candidates)[:top_k]

def analyze_resume(resume_text: str, job_description: str) -> Dict[str, Any]:
    # If job_description empty, use sample
    if not job_description:
        job_description = 'Software Engineer with experience in Python, REST APIs, Docker, and cloud (AWS)'

    # Basic skill extraction
    resume_skills = extract_skills_from_text(resume_text)
    job_skills = extract_skills_from_text(job_description)

    # TF-IDF similarity between resume and job description
    corpus = [resume_text, job_description]
    vect = TfidfVectorizer(stop_words='english', max_features=2000)
    try:
        X = vect.fit_transform(corpus)
        sim = float(cosine_similarity(X[0], X[1])[0,0])
    except Exception:
        sim = 0.0

    # Simple score (0-100)
    score = int(sim * 100)

    # Missing skills
    missing = [s for s in job_skills if s not in resume_skills]

    return {
        'score': score,
        'resume_skills': resume_skills,
        'job_skills': job_skills,
        'missing_skills': missing,
        'raw_similarity': sim,
        'advice': [
            'Add measurable achievements (numbers).',
            'Include technologies from the job description explicitly.',
            'Keep resume to 1-2 pages for early-mid careers.'
        ]
    }
