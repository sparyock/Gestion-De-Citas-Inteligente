# ADR-005: Uso de Liquibase para migraciones de base de datos

## Estado
Aceptado

## Fecha
2026-05-18

## Contexto
Los microservicios que usan PostgreSQL necesitan crear y mantener sus tablas de forma controlada. Si las tablas se crean manualmente en pgAdmin o por comandos SQL sueltos, pueden aparecer diferencias entre los ambientes develop, QA y main.

También se necesitaba que las bases de datos se prepararan automáticamente al levantar los contenedores.

## Decisión
Se decidió usar Liquibase para administrar las migraciones de base de datos en los servicios que usan PostgreSQL.

Liquibase permite definir cambios de base de datos mediante archivos de changelog y ejecutarlos automáticamente al iniciar el microservicio.

## Alternativas consideradas
- Crear tablas manualmente en pgAdmin.
- Usar scripts SQL manuales.
- Permitir que Hibernate cree las tablas automáticamente.
- No versionar cambios de base de datos.

## Consecuencias positivas
- Las tablas se crean de manera controlada.
- Los cambios de base de datos quedan versionados.
- Se reducen errores entre ambientes.
- Facilita verificar qué migraciones se aplicaron.
- Ayuda a reproducir el sistema en otro equipo.

## Consecuencias negativas o riesgos
- Si un changelog está mal escrito, el servicio puede no iniciar.
- Puede haber conflictos si una tabla ya existe y Liquibase intenta crearla otra vez.
- Se debe tener cuidado al modificar migraciones ya aplicadas.
- Requiere entender la tabla databasechangelog.

## Relación con el proyecto
Esta decisión se evidencia en:

- backend/users-service/src/main/resources/db/changelog/
- backend/turnos-service/src/main/resources/db/changelog/
- backend/notifications-service/src/main/resources/db/changelog/
- pom.xml de los servicios con dependencia liquibase-core