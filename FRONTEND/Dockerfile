# 1. Imagen base con Node 22
FROM node:22-bullseye

# 2. Crear y establecer directorio de trabajo
WORKDIR /app

# 3. Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# 4. Instalar dependencias
RUN npm install

# 5. Copiar todo el proyecto al contenedor
COPY . .

# 6. Construir la app para producción (opcional si quieres servirla)
RUN npm run build

# 7. Exponer puerto que Vite usa por defecto en dev (5173)
EXPOSE 5173

# 8. Comando por defecto para levantar Vite en modo dev
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
