## Este es el Repositorio Principal:
### Enlace Portal web :[ir](https://github.com/sparyock/Gestion-De-Citas-Inteligente-portal)
### Enlace app : [ir](https://github.com/sparyock/Gestion-De-Citas-Inteligente-app)
### Enlace api: [ir](https://github.com/sparyock/Gestion-De-Citas-Inteligente-api)
### Enlace db: [ir](https://github.com/sparyock/Gestion-De-Citas-Inteligente-db)



# Gestion De Citas Inteligente

> Plataforma distribuida de gestión de citas para negocios de servicios (salones, barberías, clínicas, veterinarias).

## Descripcion del Proyecto

Sistema modular basado en microservicios que permite a clientes agendar citas, a empleados gestionar su disponibilidad y a administradores controlar servicios y personal. Construido con arquitectura distribuida, dos bases de datos distintas y comunicación REST entre microservicios.

## Stack Tecnologico

| Tecnologia     | Uso                                      |
|----------------|------------------------------------------|
| Java 17        | Lenguaje principal de los microservicios |
| Spring Boot 3  | Framework para los 3 microservicios      |
| Spring Cloud   | API Gateway + Eureka Service Discovery   |
| Angular 17     | Microfrontend (SPA)                      |
| PostgreSQL 15  | BD relacional (Usuarios y Servicios)     |
| MongoDB 7      | BD documental (Citas)                    |
| Docker         | Contenedores y orquestacion              |
| GitHub         | Control de versiones y colaboracion      |

## Arquitectura del Sistema
```
Cliente Web (Angular :4200)
        |
  API Gateway (Spring Cloud Gateway :8080)
        |              |              |
 MS-Usuarios    MS-Citas       MS-Servicios
 (:8081)        (:8082)        (:8083)
 PostgreSQL      MongoDB        PostgreSQL
```

## Microservicios

### MS1 - Usuarios y Autenticacion (puerto 8081)
- Registro e inicio de sesion con JWT
- Roles: CLIENTE / ADMINISTRADOR
- Base de datos: PostgreSQL

### MS2 - Gestion de Citas (puerto 8082)
- Crear, cancelar y reprogramar citas
- Calendario de disponibilidad
- Base de datos: MongoDB

### MS3 - Servicios y Empleados (puerto 8083)
- Catalogo de servicios y precios
- Horarios y disponibilidad de empleados
- Base de datos: PostgreSQL

## Estructura del Monorepo
```
Gestion-De-Citas-Inteligente/
├── backend/
│   ├── ms-usuarios/        # MS1: Spring Boot + PostgreSQL
│   ├── ms-citas/           # MS2: Spring Boot + MongoDB
│   ├── ms-servicios/       # MS3: Spring Boot + PostgreSQL
│   └── api-gateway/        # Spring Cloud Gateway
├── frontend/               # Angular (microfrontend)
├── docker/                 # docker-compose.yml
└── README.md
```

## Requisitos Previos

- Java 17+
- Node.js 18+ y Angular CLI
- Docker Desktop
- Maven 3.9+

## Como Ejecutar el Proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/sparyock/Gestion-De-Citas-Inteligente.git
cd Gestion-De-Citas-Inteligente
```

### 2. Levantar bases de datos con Docker
```bash
cd docker
docker-compose up -d
```

### 3. Ejecutar microservicios (cada uno en una terminal)
```bash
cd backend/ms-usuarios  && mvn spring-boot:run
cd backend/ms-citas     && mvn spring-boot:run
cd backend/ms-servicios && mvn spring-boot:run
cd backend/api-gateway  && mvn spring-boot:run
```

### 4. Ejecutar el frontend
```bash
cd frontend
npm install
ng serve
```

## Acceso

| Servicio         | URL                        |
|------------------|----------------------------|
| Frontend Angular | http://localhost:4200       |
| API Gateway      | http://localhost:8080       |
| MS Usuarios      | http://localhost:8081       |
| MS Citas         | http://localhost:8082       |
| MS Servicios     | http://localhost:8083       |
| pgAdmin          | http://localhost:5050       |

## Equipo

| Integrante | Rol                   | Microservicio          |
|------------|-----------------------|------------------------|
| YS         | Lider tecnico / DevOps | API Gateway + Docker  |
| AR         | Backend developer      | MS Usuarios           |
| DP         | Backend developer      | MS Citas              |
| NA         | Frontend + Backend     | MS Servicios + Angular|







