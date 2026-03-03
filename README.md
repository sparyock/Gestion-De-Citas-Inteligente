## Este es el Repositorio Principal:
### Enlace Portal web: [ir](https://github.com/sparyock/Gestion-De-Citas-Inteligente-portal)
### Enlace app: [ir](https://github.com/sparyock/Gestion-De-Citas-Inteligente-app)
### Enlace api: [ir](https://github.com/sparyock/Gestion-De-Citas-Inteligente-api)
### Enlace db: [ir](https://github.com/sparyock/Gestion-De-Citas-Inteligente-db)

---

# Gestion De Citas Inteligente

> Plataforma de gestión de citas para negocios de servicios (salones, barberías, clínicas, veterinarias). Arquitectura basada en microservicios con Spring Boot, Angular y Docker.

## Descripcion del Proyecto

Sistema modular que permite a clientes agendar citas, a empleados gestionar su disponibilidad y a administradores controlar servicios y personal. Release 1 entrega el microservicio de usuarios funcional con CRUD completo y API Gateway configurado.

## Stack Tecnologico

| Tecnologia    | Uso                                    |
|---------------|----------------------------------------|
| Java 17       | Lenguaje principal de los microservicios |
| Spring Boot 3 | Framework para los microservicios      |
| Spring Cloud  | API Gateway                            |
| PostgreSQL 16 | Base de datos relacional               |
| Docker        | Contenedores y orquestacion            |
| Angular       | Microfrontend (en desarrollo)          |
| GitHub        | Control de versiones y colaboracion    |

## Arquitectura del Sistema — Release 1
```
Cliente (Postman / Navegador)
        |
  API Gateway (:8080)
        |
  user-service (:8081)
        |
   PostgreSQL (:5432)
```

## Microservicios

### MS1 - Usuarios y Autenticacion (puerto 8081)
- CRUD completo de usuarios
- Roles: CLIENTE / ADMINISTRADOR
- Base de datos: PostgreSQL

### API Gateway (puerto 8080)
- Enruta peticiones hacia user-service
- Punto de entrada unico del sistema

## Estructura del Monorepo
```
Gestion-De-Citas-Inteligente/
├── backend/
│   ├── api-gateway/        # Spring Cloud Gateway (:8080)
│   └── user-service/       # Microservicio usuarios (:8081)
├── frontend/               # Angular (microfrontend - Release 2)
├── docker/                 # docker-compose.yml
└── README.md
```

## Requisitos Previos

- Java 17+
- Maven 3.9+
- Docker Desktop

## Como Ejecutar el Proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/sparyock/Gestion-De-Citas-Inteligente.git
cd Gestion-De-Citas-Inteligente
```

### 2. Levantar la base de datos con Docker
```bash
cd docker
docker-compose up -d
```

### 3. Ejecutar user-service (primera terminal)
```bash
cd backend/user-service
mvn clean install
mvn spring-boot:run
```

### 4. Ejecutar api-gateway (segunda terminal, con user-service corriendo)
```bash
cd backend/api-gateway
mvn clean install
mvn spring-boot:run
```

## Endpoints Disponibles

| Metodo | URL |                           Descripcion                        |
|--------|-----|--------------------------------------------------------------|
| GET | http://localhost:8080/users/test | Verificar que el sistema funciona  |
| GET | http://localhost:8080/users | Listar todos los usuarios (via Gateway) |
| GET | http://localhost:8080/users/{id} | Buscar usuario por ID (via Gateway)|
| GET | http://localhost:8081/users | Listar usuarios (directo al servicio)   |
| GET | http://localhost:8081/users/{id} | Buscar por ID (directo al servicio)|

## Acceso

| Servicio    | URL                      |
|-------------|--------------------------|
| API Gateway | http://localhost:8080     |
| MS Usuarios | http://localhost:8081     |
| pgAdmin     | http://localhost:5050     |

## Equipo

| Integrante | Rol                    | Responsabilidad        |
|------------|------------------------|------------------------|
| YS         | Lider tecnico / DevOps | Git, ramas, integracion |
| AC         | Backend developer      | user-service           |
| NG         | Documentacion          | Documentacion tecnica  |
| DS         | Administrador Docker   | Docker y despliegue    |



## Gestión del Proyecto
Puedes seguir el avance de las tareas, el backlog y los sprints actuales en nuestro tablero oficial:

Tablero Trello:https://trello.com/b/YRJ1lK8I/gestion-de-citas-inteligente



