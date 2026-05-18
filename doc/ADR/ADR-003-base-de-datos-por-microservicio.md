# ADR-003: Base de datos por microservicio

## Estado
Aceptado

## Fecha
2026-05-18

## Contexto
El sistema maneja información diferente en cada módulo. Los usuarios, turnos, notificaciones y auditorías tienen responsabilidades distintas y no deberían depender todos de una misma base de datos compartida.

En una arquitectura distribuida, compartir una sola base de datos puede generar acoplamiento entre servicios y hacer más difícil mantener el sistema.

## Decisión
Se decidió usar el patrón de base de datos por microservicio.

Cada servicio tiene su propia base de datos:

- users-service usa usersdb
- turnos-service usa turnosdb
- notifications-service usa notificationsdb
- audit-service usa auditdb

Los servicios principales usan PostgreSQL y el servicio de auditoría usa MongoDB.

## Alternativas consideradas
- Usar una sola base de datos para todo el sistema.
- Usar un solo esquema con varias tablas compartidas.
- Usar únicamente archivos locales para almacenar información.

## Consecuencias positivas
- Cada microservicio administra sus propios datos.
- Se reduce el acoplamiento entre servicios.
- Es más fácil reiniciar o probar un servicio sin afectar todos los datos.
- Permite usar diferentes motores de base de datos según la necesidad.

## Consecuencias negativas o riesgos
- Consultar información cruzada entre servicios puede ser más complejo.
- Se deben administrar varias conexiones y credenciales.
- Se requiere mayor cuidado con los volúmenes de Docker.
- No hay una única base central para consultar todo directamente.

## Relación con el proyecto
Esta decisión se evidencia en:

- users-db-develop
- turnos-db-develop
- notifications-db-develop
- audit-db-develop
- docker-compose.develop.yml
- application-develop.properties
- application-develop.yml
