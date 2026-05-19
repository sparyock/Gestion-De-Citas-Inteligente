# ADR-001: Arquitectura basada en microservicios con API Gateway

## Estado
Aceptado

## Fecha
2026-05-18

## Contexto
El proyecto Gestión de Citas Inteligente necesita manejar diferentes responsabilidades del sistema, como usuarios, turnos, notificaciones y auditoría. Si todo se desarrollaba en una sola aplicación, el sistema podía volverse difícil de mantener, probar y escalar.

Además, el proyecto corresponde a la materia de Sistemas Distribuidos, por lo que se requería evidenciar separación de componentes, comunicación entre servicios y despliegue independiente mediante contenedores.

## Decisión
Se decidió implementar una arquitectura basada en microservicios, separando el sistema en varios servicios independientes:

- api-gateway
- users-service
- turnos-service
- notifications-service
- audit-service

El API Gateway será el punto central de entrada para las peticiones del frontend y se encargará de redirigirlas al microservicio correspondiente.

## Alternativas consideradas
- Crear una sola aplicación monolítica con todos los módulos juntos.
- Crear frontend y backend en una sola aplicación.
- Crear varios microservicios pero sin API Gateway.

## Consecuencias positivas
- Cada servicio tiene una responsabilidad clara.
- El sistema es más fácil de mantener y probar por partes.
- Se puede levantar cada componente en contenedores separados.
- El frontend no necesita conocer directamente la ubicación de cada microservicio.
- Se evidencia una arquitectura distribuida para el proyecto académico.

## Consecuencias negativas o riesgos
- La configuración inicial es más compleja que en un monolito.
- Se deben manejar varios puertos, contenedores y bases de datos.
- Si el API Gateway falla, el frontend puede perder acceso a los servicios.
- Se requiere mayor cuidado en la configuración de Docker y redes.

## Relación con el proyecto
Esta decisión se evidencia en:

- backend/api-gateway/
- backend/users-service/
- backend/turnos-service/
- backend/notifications-service/
- backend/audit-service/
- docker-compose.develop.yml
- docker-compose.qa.yml
- docker-compose.main.yml
