# Gestion-De-Citas-Inteligente
Descripción del proyecto

Plataforma de gestión de citas basada en arquitectura de microservicios.
Permite administrar reservas, usuarios, servicios y disponibilidad de empleados.
El sistema puede adaptarse a distintos contextos como barberías, salones de belleza, talleres, consultorios médicos o veterinarias.

Arquitectura

El sistema está compuesto por tres microservicios independientes.

1. Microservicio de Usuarios y Autenticación

Tecnología: Spring Boot + PostgreSQL

Responsabilidades:

Registro e inicio de sesión

Manejo de roles (cliente / administrador)

Generación y validación de tokens JWT

Persistencia de usuarios en PostgreSQL

2. Microservicio de Gestión de Citas

Tecnología: Spring Boot + MongoDB

Responsabilidades:

Crear citas

Cancelar citas

Reprogramar citas

Gestión de calendario

Notificaciones (opcional)

MongoDB se utiliza debido a la flexibilidad del modelo de datos para el manejo de agendas.

3. Microservicio de Servicios y Empleados

Tecnología: Spring Boot + PostgreSQL o MongoDB

Responsabilidades:

Catálogo de servicios

Horarios de empleados

Precios

Disponibilidad dinámica

Frontend

Tecnología: Angular (microfrontend)

Módulos principales:

Login y registro

Panel principal

Calendario de citas

Visualización de servicios

Perfil de usuario

Administración (empleados, horarios y servicios)

Contenedorización

Se utiliza Docker para ejecutar todos los componentes del sistema:

Un contenedor por cada microservicio

Contenedor de PostgreSQL

Contenedor de MongoDB

Contenedor del frontend Angular (opcional)

Comunicación entre servicios

La comunicación entre microservicios se realiza mediante:

API REST

OpenFeign (opcional)

API Gateway / Eureka (opcional)

Organización del equipo

Integrante 1: Microservicio de usuarios (Spring Boot + PostgreSQL)

Integrante 2: Microservicio de citas (Spring Boot + MongoDB)

Integrante 3: Microservicio de servicios y empleados
