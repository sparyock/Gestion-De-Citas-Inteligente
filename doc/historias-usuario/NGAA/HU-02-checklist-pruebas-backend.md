# HU-02: Checklist de pruebas del backend

## Historia de usuario

Como integrante del equipo de desarrollo, quiero tener un checklist de pruebas del backend, para verificar rapidamente que los microservicios, el API Gateway y las bases de datos funcionan antes de una entrega.

## Objetivo

Crear una lista de verificacion rapida para probar el proyecto Gestion de Citas Inteligente usando Docker, Postman y Liquibase.

## Criterios de aceptacion

- Se incluyen pruebas rapidas por navegador.
- Se incluyen pruebas basicas por Postman.
- Se incluyen comandos para verificar Liquibase.
- Se incluyen comandos para revisar errores comunes.
- No se modifica codigo fuente del proyecto.

## Pruebas rapidas por navegador

Con el ambiente develop levantado, se pueden probar estas rutas:

http://localhost:8080/users

http://localhost:8080/turnos

http://localhost:8080/notifications

Si alguna ruta responde con una lista vacia, por ejemplo [], significa que el servicio esta funcionando y la base de datos no tiene registros.

## Pruebas por Postman

### Crear usuario

Metodo:

POST

URL:

http://localhost:8080/users

Body JSON:

{
  "nombre": "Usuario Develop",
  "email": "develop@test.com",
  "password": "123456",
  "rol": "CLIENTE"
}

### Login

POST http://localhost:8080/users/login

Body JSON:

{
  "email": "develop@test.com",
  "password": "123456"
}

### Crear turno

POST http://localhost:8080/turnos

Body JSON:

{
  "doctor": "Dr. Carlos Ramirez",
  "especialidad": "Medicina General",
  "fechaHora": "2026-05-20T09:00:00",
  "idUsuario": 1
}

### Listar turnos

GET http://localhost:8080/turnos

### Crear notificacion

POST http://localhost:8080/notifications

Body JSON:

{
  "idUsuario": 1,
  "titulo": "Turno creado",
  "mensaje": "Tu turno fue creado correctamente",
  "tipo": "CREACION_TURNO"
}

### Listar notificaciones

GET http://localhost:8080/notifications

## Pruebas directas sin API Gateway

GET http://localhost:8081/users

GET http://localhost:8082/turnos

GET http://localhost:8083/notifications

## Verificar Liquibase

Users DB:

docker exec -it users-db-develop psql -U postgres -d usersdb_develop -c "SELECT id, author, filename, dateexecuted FROM databasechangelog;"

Turnos DB:

docker exec -it turnos-db-develop psql -U postgres -d turnosdb_develop -c "SELECT id, author, filename, dateexecuted FROM databasechangelog;"

Notifications DB:

docker exec -it notifications-db-develop psql -U postgres -d notificationsdb_develop -c "SELECT id, author, filename, dateexecuted FROM databasechangelog;"

Si aparecen registros en la tabla databasechangelog, significa que Liquibase ejecuto correctamente las migraciones.

## Errores comunes

Ver todos los contenedores:

docker ps -a

Ver logs de un contenedor:

docker logs nombre-del-contenedor

Ejemplo:

docker logs notifications-service-develop

Revisar puerto ocupado:

netstat -ano | findstr :8080

Cerrar proceso:

taskkill /PID NUMERO /F

## Resultado esperado

El equipo debe poder validar rapidamente que users-service, turnos-service, notifications-service, API Gateway y Liquibase funcionan correctamente.

## Evidencias

- Captura de pruebas en navegador.
- Captura de pruebas en Postman.
- Captura del comando docker ps.
- Captura de Liquibase consultando databasechangelog.

## Conclusion

Esta historia ayuda a preparar entregas y exposiciones porque deja una guia rapida para verificar el funcionamiento del backend.
