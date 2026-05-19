# ADR-004: Comunicación REST sobre HTTP

## Estado
Aceptado

## Fecha
2026-05-18

## Contexto
Los componentes del sistema necesitan comunicarse entre sí de forma sencilla. El frontend necesita enviar solicitudes para registrar usuarios, iniciar sesión, crear turnos, consultar notificaciones y registrar auditorías.

Para este proyecto académico era importante usar una comunicación fácil de probar con navegador, Postman y Docker.

## Decisión
Se decidió usar comunicación REST sobre HTTP.

El frontend consume el API Gateway y el API Gateway redirige las solicitudes hacia cada microservicio según la ruta:

- /users
- /turnos
- /notifications
- /audit

## Alternativas consideradas
- Usar gRPC.
- Usar WebSockets.
- Usar comunicación por eventos con Kafka o RabbitMQ.
- Conectar el frontend directamente a cada microservicio.

## Consecuencias positivas
- Es fácil de entender y probar con Postman.
- Permite usar métodos HTTP como GET, POST, PUT y DELETE.
- Es compatible con Angular y Spring Boot.
- Facilita la documentación de endpoints.
- Es suficiente para el alcance actual del proyecto.

## Consecuencias negativas o riesgos
- No es comunicación en tiempo real.
- No maneja eventos asincrónicos de forma nativa.
- Si un servicio está caído, la petición puede fallar directamente.
- Para un sistema más grande podría requerirse mensajería o colas.

## Relación con el proyecto
Esta decisión se evidencia en:

- UserController.java
- TurnoController.java
- NotificacionController.java
- AuditLogController.java
- api-gateway/application-develop.yml
- frontend/gestion-citas-frontend/src/app/services/
