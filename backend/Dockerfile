FROM python:3.11-slim as base
WORKDIR /app

# Install system deps
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

FROM base as deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM base as runtime
COPY --from=deps /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY . .
ENV PYTHONUNBUFFERED=1
# production command: use gunicorn with uvicorn workers
CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "app.main:app", "--bind", "0.0.0.0:8000", "--workers", "2"]
