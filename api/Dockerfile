FROM python:3.11

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Especifica el puerto como variable de entorno con un valor por defecto
ENV PORT=8000

CMD uvicorn main:app --host 0.0.0.0 --port $PORT
