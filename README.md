# Proyecto de Análisis de Imágenes con OpenAI

## Descripción

Este proyecto consiste en una **aplicación web con frontend y backend** que se comunican para analizar imágenes mediante el modelo **GPT-4 Mini** de OpenAI.  
El frontend está construido con **Vite + React**, mientras que el backend está desarrollado en **NestJS**.

---

## Tecnologías utilizadas

- **Frontend:** React v18, Vite v7.1.5, Node.js v22  
- **Backend:** NestJS, Node.js v20  
- **IA:** OpenAI GPT-4 Mini  
- **Contenedores:** Docker, Docker Compose  

---

## Variables de entorno

Para el **backend**, crea un archivo `.env` en la carpeta `BACKEND` con la siguiente variable:

```env
OPENAI_API_KEY=tu_api_key_de_openai
```

## Instalación y levantamiento con Docker Compose

```bash
# 1. Instalar Docker y Docker Compose en tu máquina
# (Dependiendo de tu sistema operativo, sigue la documentación oficial)

# 2. Levantar los contenedores para frontend y backend
docker-compose up --build

# 3. Levantar los contenedores en segundo plano
docker-compose up -d --build

# 4. Detener y eliminar los contenedores
docker-compose down
```

Vistar el proyecto en la url: 

http://localhost:5173/
