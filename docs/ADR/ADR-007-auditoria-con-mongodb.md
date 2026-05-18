# ADR-007: Servicio de auditoría usando MongoDB

## Estado
Aceptado

## Fecha
2026-05-18

## Contexto
El sistema necesita registrar eventos importantes como acciones de usuarios, operaciones realizadas y eventos generados por los servicios. Esta información de auditoría puede crecer con el tiempo y no siempre requiere una estructura relacional tan estricta como usuarios o turnos.

Por esta razón, se evaluó usar una base de datos documental para almacenar registros de auditoría.

## Decisión
Se decidió implementar un audit-service usando MongoDB como base de datos documental.

El servicio de auditoría se encarga de registrar logs de acciones y permitir consultas por usuario, acción o servicio origen.

## Alternativas consideradas
- Guardar auditoría en PostgreSQL.
- Guardar logs solo en consola.
- No implementar auditoría.
- Guardar auditoría dentro de cada microservicio.

## Consecuencias positivas
- Se separa la auditoría de la lógica principal del sistema.
- MongoDB permite guardar documentos de auditoría de forma flexible.
- El servicio puede crecer de manera independiente.
- Facilita consultar eventos por usuario, acción o servicio.

## Consecuencias negativas o riesgos
- Se agrega una tecnología adicional al proyecto.
- Requiere levantar MongoDB junto con el servicio.
- En QA y main debe revisarse si audit-service está completamente integrado.
- Si no se configura el gateway, el frontend no podrá registrar auditorías.

## Relación con el proyecto
Esta decisión se evidencia en:

- backend/audit-service/
- AuditLogController.java
- AuditLogService.java
- AuditLogRepository.java
- AuditLog.java
- docker-compose.develop.yml
- audit-db-develop