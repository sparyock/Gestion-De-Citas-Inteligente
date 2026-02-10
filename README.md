# Gestión de Citas Inteligente

## Descripción
Plataforma de gestión de citas basada en arquitectura de microservicios.  
Permite administrar reservas, usuarios, servicios y disponibilidad de empleados.  
El sistema puede adaptarse a distintos contextos como barberías, salones, talleres, consultorios médicos o veterinarias.

---

## Arquitectura

El sistema está compuesto por tres microservicios independientes.

### Microservicio 1: Usuarios y Autenticación
**Tecnologías:** Spring Boot, PostgreSQL

Funciones:
- Registro de usuarios
- Inicio de sesión
- Manejo de roles (cliente / administrador)
- Autenticación mediante JWT
- Persistencia de datos en PostgreSQL

---

### Microservicio 2: Gestión de Citas
**Tecnologías:** Spring Boot, MongoDB

Funciones:
- Crear citas
- Cancelar citas
- Reprogramar citas

---

### Microservicio 3: Servicios y Empleados
**Tecnologías:** Spring Boot, PostgreSQL 

Funciones:
- Catálogo de servicios
- Horarios de empleados
- Precios
- Disponibilidad dinámica

---

## Frontend
**Tecnología:** Angular

Módulos:
- Login y registro
- Panel principal
- Visualización de servicios
- Perfil de usuario
- Administración (empleados, horarios y servicios)

---

## Contenedores (Docker)

El sistema se ejecuta mediante contenedores:

- Un contenedor por cada microservicio
- Contenedor para PostgreSQL
- Contenedor para MongoDB
- Contenedor para el frontend 
---

## Comunicación entre Microservicios

- API REST

---

## Organización del equipo

- Integrante 1: Microservicio de usuarios
- Integrante 2: Microservicio de citas
- Integrante 3: Microservicio de servicios y empleados
- Integrante 4: Frontend, Docker e integración
