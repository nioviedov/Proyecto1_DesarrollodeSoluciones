FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Especifica el puerto como variable de entorno con un valor por defecto
ENV PORT=3000
ENV REACT_APP_API_URL=http://localhost:8000

CMD ["npm", "start"]
