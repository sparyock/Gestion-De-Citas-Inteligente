# HU-07 - Dockerización completa del sistema

## Historia de usuario

Como equipo de desarrollo, quiero ejecutar el sistema completo mediante Docker, para facilitar la instalación, prueba y ejecución del proyecto en diferentes equipos.

## Descripción

Esta historia permite levantar todos los componentes del sistema usando Docker Compose. El proyecto incluye contenedores para frontend, API Gateway, microservicios, bases de datos PostgreSQL y MongoDB.

Se definieron ambientes separados para `develop`, `qa` y `main`, cada uno con sus propios puertos, redes y volúmenes.

## Criterios de aceptación

- El sistema debe contar con Dockerfile para los servicios necesarios.
- El frontend debe estar dockerizado con Nginx.
- Los microservicios deben ejecutarse como contenedores.
- PostgreSQL debe ejecutarse en contenedores separados por microservicio.
- MongoDB debe ejecutarse en contenedor para auditoría.
- Deben existir archivos `docker-compose` por ambiente.
- Los ambientes `develop`, `qa` y `main` deben poder levantarse de forma independiente.
- Los puertos no deben generar conflictos entre ambientes.

## Archivos relacionados

```txt
docker-compose.develop.yml
docker-compose.qa.yml
docker-compose.main.yml
backend/*/Dockerfile
frontend/gestion-citas-frontend/Dockerfile
frontend/gestion-citas-frontend/nginx.conf
```

## Comandos probados

### Develop

```bash
docker compose -f docker-compose.develop.yml up -d --build
```

### QA

```bash
docker compose -f docker-compose.qa.yml up -d --build
```

### Main

```bash
docker compose -f docker-compose.main.yml up -d --build
```

### Ver contenedores

```bash
docker ps
```

## Resultado esperado

El sistema debe levantar todos los contenedores correctamente y permitir acceder al frontend, API Gateway, microservicios y bases de datos según el ambiente utilizado.

## Evidencias

Las evidencias se encuentran en: `docs/evidencias/semana-4`

- Captura de `docker ps` en develop.
- Captura de `docker ps` en QA.
- Captura de `docker ps` en main.
- Captura del frontend ejecutándose en Docker.
- Captura de servicios backend ejecutándose.
- Captura de bases de datos PostgreSQL y MongoDB.

## Estado

Completada y probada.

---

# HU-08 - Validación automática con GitHub Actions

## Historia de usuario

Como equipo de desarrollo, quiero tener una validación automática del proyecto en GitHub, para detectar errores de compilación antes de integrar cambios a las ramas principales.

## Descripción

Esta historia permite validar automáticamente el proyecto usando GitHub Actions. El workflow configurado compila los microservicios Spring Boot, compila el frontend Angular y valida los archivos Docker Compose.

La validación se ejecuta al realizar cambios en las ramas `develop`, `qa` y `main`.

## Criterios de aceptación

- Debe existir la carpeta `.github/workflows`.
- Debe existir el archivo `ci.yml`.
- El pipeline debe compilar los microservicios Java.
- El pipeline debe compilar el frontend Angular.
- El pipeline debe validar los archivos Docker Compose.
- El workflow debe ejecutarse en GitHub Actions.
- La ejecución debe finalizar con estado `Success`.

## Archivo relacionado

```txt
.github/workflows/ci.yml
```

## Validaciones realizadas

- Build de `api-gateway`.
- Build de `users-service`.
- Build de `turnos-service`.
- Build de `notifications-service`.
- Build de `audit-service`.
- Build del frontend Angular.
- Validación de `docker-compose.develop.yml`.
- Validación de `docker-compose.qa.yml`.
- Validación de `docker-compose.main.yml`.

## Resultado esperado

GitHub Actions debe ejecutar el workflow correctamente y mostrar estado `Success`.

## Evidencias

Las evidencias se encuentran en: `docs/evidencias/semana-4`

- Captura de GitHub Actions con estado `Success`.
- Captura de jobs ejecutados correctamente.
- Captura de validación de Docker Compose.
- Captura de compilación del frontend.
- Captura de compilación de microservicios.

## Estado

Completada y probada.

---

# Evidencias técnicas de la Semana 4

## Servicios dockerizados

| Componente             | Tecnología |
|------------------------|------------|
| frontend               | Angular + Nginx |
| api-gateway            | Spring Cloud Gateway |
| users-service          | Spring Boot |
| turnos-service         | Spring Boot |
| notifications-service  | Spring Boot |
| audit-service          | Spring Boot + MongoDB |
| users-db               | PostgreSQL |
| turnos-db              | PostgreSQL |
| notifications-db       | PostgreSQL |
| audit-db               | MongoDB |

## Ambientes

| Ambiente | Frontend | API Gateway |
|----------|----------|-------------|
| develop  | 4200     | 8080        |
| qa       | 4210     | 8180        |
| main     | 4220     | 8280        |

## Tecnologías utilizadas

- Docker
- Docker Compose
- Java 17
- Spring Boot
- Angular
- PostgreSQL
- MongoDB
- Liquibase
- GitHub Actions
- GitHub

## Observación técnica

Se validó que el sistema completo puede ejecutarse mediante Docker Compose en los tres ambientes definidos. Además, GitHub Actions permite detectar errores de compilación y configuración antes de integrar cambios a las ramas principales.
