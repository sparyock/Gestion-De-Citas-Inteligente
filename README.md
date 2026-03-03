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
| PostgreSQL 15  | BD relacional (Usuarios y Servicios)     |
| Docker         | Contenedores y orquestacion              |
| GitHub         | Control de versiones y colaboracion      |

## Arquitectura del Sistema
```
Cliente Web 
        |
  API Gateway 
        |             
 MS-Usuarios    
 (:8081)       
 PostgreSQL      
```

## Microservicios

### MS1 - Usuarios y Autenticacion (puerto 8080)
- Registro e inicio de sesion con JWT
- Roles: CLIENTE 
- Base de datos: PostgreSQL



## Estructura del Monorepo
```
Gestion-De-Citas-Inteligente/
├── backend/
│   ├── api-gateway         # MS1: Spring Boot + PostgreSQL
│   ├── turnos-service      # MS2: Spring Boot + PostgreSQL
│   ├── user-service        # MS3: Spring Boot + PostgreSQL
│          
├── frontend/               # Angular (microfrontend)
├── docker/                 # docker-compose.yml
└── README.md
```

## Requisitos Previos

- Java 17+
- Node.js 18+ 
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

```


## Acceso

| Servicio         | URL                        |
|------------------|----------------------------|
| API Gateway      | http://localhost:8080       |
| MS Usuarios      | http://localhost:8081       |
| pgAdmin          | http://localhost:5050       |

## Equipo

| Integrante | Rol                   | Microservicio          |
|------------|-----------------------|------------------------|
| YS         | Lider tecnico / DevOps | Git Ramas             |
| AC         | Backend developer      | MS Usuarios           |
| NG         | Documentación          | Documentacion         |
| DS         | Administrador Docker   | DOCKER                |







