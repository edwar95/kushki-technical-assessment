# Imagen base Node 20
FROM node:20-bullseye

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código
COPY . .

# Exponer el puerto de NestJS
EXPOSE 3000

# Comando para desarrollo con hot reload
CMD ["npm", "run", "start:dev", "--", "--watch", "--poll"]
