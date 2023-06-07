FROM python:3.10

ENV PYTHONDONTWRITEBYTECODE=1 \
PYTHONUNBUFFERED=1

RUN pip install --upgrade pip setuptools

WORKDIR /backend
COPY requirements.txt .
RUN pip install --no-cache -r requirements.txt

COPY . .

# Expose application port
EXPOSE 8000