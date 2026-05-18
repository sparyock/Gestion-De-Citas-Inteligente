# Etapa 1: compilar Angular
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG API_GATEWAY_URL=http://localhost:8080
RUN sed -i "s|http://localhost:8080|${API_GATEWAY_URL}|g" src/app/config/api.config.ts \
  && npm run build

# Etapa 2: servir archivos estáticos con nginx
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/gestion-citas-frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
