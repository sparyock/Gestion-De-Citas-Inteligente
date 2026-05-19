# HU-05 - Gestión de notificaciones

## Historia de usuario

Como cliente, quiero recibir notificaciones relacionadas con mis turnos, para estar informado sobre la creación, reprogramación o cancelación de mis citas.

## Descripción

Esta historia permite que el sistema cree y consulte notificaciones asociadas a un usuario. Las notificaciones se generan cuando ocurre una acción importante, como crear un turno, reprogramarlo o cancelarlo.

Las notificaciones se almacenan en PostgreSQL mediante el microservicio `notifications-service`.

## Criterios de aceptación

- El sistema debe permitir crear notificaciones.
- Cada notificación debe estar asociada a un usuario.
- La notificación debe tener título, mensaje, tipo, estado de lectura y fecha de creación.
- El usuario debe poder consultar sus notificaciones.
- El usuario debe poder marcar notificaciones como leídas.
- El usuario debe poder eliminar notificaciones.
- El endpoint debe funcionar desde el microservicio `notifications-service`.
- El endpoint debe funcionar desde el `api-gateway`.

## Endpoints probados

### Crear notificación

```http
POST http://localhost:8080/notifications
```

### Consultar notificaciones

```http
GET http://localhost:8080/notifications
```

### Marcar como leída

```http
PUT http://localhost:8080/notifications/{id}/read
```

### Eliminar notificación

```http
DELETE http://localhost:8080/notifications/{id}
```

### Body de ejemplo

```json
{
  "idUsuario": 1,
  "titulo": "Turno confirmado",
  "mensaje": "Tu turno fue creado correctamente",
  "tipo": "confirmado"
}
```

## Resultado esperado

El sistema registra la notificación correctamente, permite consultarla desde el frontend, marcarla como leída y eliminarla si el usuario lo requiere.

## Evidencias

Las evidencias se encuentran en: `docs/evidencias/semana-3`

- Captura de notificación creada.
- Captura de la vista `Notificaciones`.
- Captura de notificación marcada como leída.
- Captura de tabla `notifications` en PostgreSQL.
- Captura de consumo vía API Gateway.

## Estado

Completada y probada.

---

# HU-06 - Registro de auditoría de acciones

## Historia de usuario

Como administrador o equipo técnico, quiero registrar las acciones importantes realizadas por los usuarios, para tener trazabilidad del uso del sistema.

## Descripción

Esta historia permite almacenar registros de auditoría cuando se realizan acciones relevantes en el sistema, como registro de usuario, creación de turno, reprogramación y cancelación.

El microservicio `audit-service` utiliza MongoDB para guardar los registros de auditoría en la colección `audit_logs`.

## Criterios de aceptación

- El sistema debe registrar acciones importantes del usuario.
- Cada auditoría debe incluir usuario, acción, descripción, origen, recurso y fecha de creación.
- La información debe almacenarse en MongoDB.
- El historial debe poder consultarse desde el frontend.
- El endpoint debe funcionar desde el microservicio `audit-service`.
- El endpoint debe funcionar desde el `api-gateway`.
- Las acciones deben quedar registradas después de crear, reprogramar o cancelar un turno.

## Endpoints probados

### Registrar auditoría

```http
POST http://localhost:8080/audit
```

### Consultar historial

```http
GET http://localhost:8080/audit
```

### Health del servicio

```http
GET http://localhost:8080/audit/health
```

### Body de ejemplo

```json
{
  "idUsuario": 1,
  "accion": "CREAR_TURNO",
  "descripcion": "Turno creado con Dr. Andres Muñoz",
  "servicioOrigen": "frontend",
  "recurso": "turnos",
  "idRecurso": "1"
}
```

## Resultado esperado

El sistema registra la auditoría correctamente en MongoDB y permite visualizarla desde la pantalla de historial.

## Evidencias

Las evidencias se encuentran en: `docs/evidencias/semana-3`

- Captura de auditoría registrada.
- Captura de la pantalla `Historial de Auditoría`.
- Captura de MongoDB con la colección `audit_logs`.
- Captura de consulta por API Gateway.
- Captura de acciones registradas al crear, reprogramar y cancelar turno.

## Estado

Completada y probada.

---

# Evidencias técnicas de la Semana 3

## Servicios relacionados

| Servicio              | Puerto directo | Ruta por Gateway                    |
|-----------------------|----------------|-------------------------------------|
| notifications-service | 8083           | http://localhost:8080/notifications |
| audit-service         | 8084           | http://localhost:8080/audit         |
| api-gateway           | 8080           | Punto de entrada central            |

## Bases de datos

| Servicio              | Motor      | Base develop              |
|-----------------------|------------|---------------------------|
| notifications-service | PostgreSQL | notificationsdb_develop   |
| audit-service         | MongoDB    | auditdb_develop           |

## Tecnologías utilizadas

- Java 17
- Spring Boot
- Maven
- PostgreSQL
- MongoDB
- Liquibase
- Docker
- API Gateway
- Angular
- Postman

## Observación técnica

Se integró PostgreSQL para las notificaciones y MongoDB para auditoría, cumpliendo con la separación de bases de datos por microservicio. La auditoría permite validar la trazabilidad de las acciones del usuario dentro del sistema.