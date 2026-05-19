# HU-03 - Solicitud de turno médico

## Historia de usuario

Como cliente, quiero solicitar un turno médico seleccionando especialidad, doctor, fecha y hora, para poder agendar una cita dentro del sistema.

## Descripción

Esta historia permite que un usuario registrado pueda crear un turno médico desde el sistema. El turno queda asociado al usuario que lo solicita y se almacena en la base de datos del microservicio `turnos-service`.

El flujo permite seleccionar una especialidad, un doctor, una fecha y un horario disponible. Al crear el turno, el sistema lo registra inicialmente con estado `PENDIENTE`.

## Criterios de aceptación

- El sistema debe permitir crear un turno con usuario, especialidad, doctor, fecha y hora.
- El turno debe quedar asociado al `idUsuario`.
- El turno debe almacenarse en la base de datos correspondiente.
- El estado inicial del turno debe ser `PENDIENTE`.
- La fecha del turno no debe ser anterior a la fecha actual.
- El endpoint debe funcionar desde el microservicio `turnos-service`.
- El endpoint debe funcionar desde el `api-gateway`.
- La prueba debe realizarse usando Postman y/o frontend.

## Endpoints probados

### Directo del microservicio

```http
POST http://localhost:8082/turnos
```

### Vía API Gateway

```http
POST http://localhost:8080/turnos
```

### Body de ejemplo

```json
{
  "idUsuario": 1,
  "especialidad": "Medicina General",
  "doctor": "Dr. Andres Muñoz",
  "fechaHora": "2026-05-25T10:00:00"
}
```

## Resultado esperado

El sistema crea el turno correctamente, lo almacena en PostgreSQL y devuelve la información del turno creado con estado `PENDIENTE`.

## Evidencias

Las evidencias se encuentran en: `docs/evidencias/semana-2`

- Captura de Postman usando `POST /turnos`.
- Captura del turno creado desde el frontend.
- Captura de la tabla `turnos` en PostgreSQL.
- Captura de la respuesta obtenida desde el API Gateway.

## Estado

Completada y probada.

---

# HU-04 - Consulta de turnos por usuario

## Historia de usuario

Como cliente, quiero consultar mis turnos registrados, para conocer mis citas pendientes, canceladas o reprogramadas.

## Descripción

Esta historia permite que un usuario pueda visualizar los turnos asociados a su cuenta. La consulta se realiza desde el microservicio `turnos-service` y también puede accederse mediante el API Gateway.

El sistema debe mostrar los turnos existentes con información como especialidad, doctor, fecha, hora y estado.

## Criterios de aceptación

- El sistema debe permitir consultar todos los turnos.
- El sistema debe permitir consultar turnos asociados a un usuario.
- Cada turno debe mostrar especialidad, doctor, fecha, hora y estado.
- El endpoint debe funcionar desde el microservicio `turnos-service`.
- El endpoint debe funcionar desde el `api-gateway`.
- Si el usuario no tiene turnos, el sistema debe retornar una lista vacía.
- La información debe coincidir con los datos almacenados en PostgreSQL.

## Endpoints probados

### Consultar todos los turnos desde el microservicio

```http
GET http://localhost:8082/turnos
```

### Consultar todos los turnos vía API Gateway

```http
GET http://localhost:8080/turnos
```

### Consultar turnos por usuario

```http
GET http://localhost:8080/turnos?idUsuario=1
```

## Resultado esperado

El sistema devuelve la lista de turnos existentes. Si se filtra por usuario, debe retornar únicamente los turnos asociados a ese usuario.

## Evidencias

Las evidencias se encuentran en: `docs/evidencias/semana-2`

- Captura de Postman usando `GET /turnos`.
- Captura de la vista `Mis Turnos` en el frontend.
- Captura de la tabla `turnos` en PostgreSQL.
- Captura de la consulta filtrada por usuario.

## Estado

Completada y probada.

---

# Evidencias técnicas de la Semana 2

## Servicios relacionados

| Servicio       | Puerto directo | Ruta por Gateway             |
|----------------|----------------|------------------------------|
| turnos-service | 8082           | http://localhost:8080/turnos |
| api-gateway    | 8080           | Punto de entrada central     |

## Base de datos

| Ambiente | Base de datos     |
|----------|-------------------|
| develop  | turnosdb_develop  |
| qa       | turnosdb_qa       |
| main     | turnosdb_main     |

## Tecnologías utilizadas

- Java 17
- Spring Boot
- Maven
- PostgreSQL
- Liquibase
- Docker
- API Gateway
- Postman
- Angular

## Observación técnica

El microservicio de turnos fue probado de forma directa y mediante el API Gateway. Además, se verificó que los turnos se almacenan correctamente en PostgreSQL y que la tabla es creada mediante Liquibase.