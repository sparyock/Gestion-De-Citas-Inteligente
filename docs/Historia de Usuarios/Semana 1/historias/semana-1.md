# Semana 1 - Historias de Usuario

## Proyecto: Gestión de Citas Inteligente
## Repositorio: YASD-back-1-api
## Responsable: YASD
## Área trabajada: Backend de usuarios y API Gateway

---

# HU-01 - Registro de usuario

## Historia de usuario

Como cliente, quiero registrarme en el sistema, para poder acceder a la plataforma de gestión de citas.

## Descripción

Esta historia permite que una persona pueda crear una cuenta dentro del sistema de Gestión de Citas Inteligente. El registro es necesario para que posteriormente el usuario pueda iniciar sesión, solicitar turnos y consultar su información.

## Criterios de aceptación

- El sistema debe permitir registrar un usuario con nombre, correo, contraseña y rol.
- El correo del usuario debe ser único.
- El rol debe ser válido dentro del sistema.
- Los roles permitidos son `CLIENTE` y `ADMIN`.
- El usuario debe quedar almacenado en la base de datos correspondiente.
- El endpoint debe funcionar desde el microservicio `users-service`.
- El endpoint debe funcionar desde el `api-gateway`.

## Endpoints probados

### Directo del microservicio

```http
POST http://localhost:8081/users
```

### Vía API Gateway

```http
POST http://localhost:8080/users
```

### Body de ejemplo

```json
{
  "nombre": "Usuario Semana 1",
  "email": "usuariosemana1@test.com",
  "password": "123456",
  "rol": "CLIENTE"
}
```

## Resultado esperado

El sistema registra el usuario correctamente y devuelve la información creada.

## Evidencias

Las evidencias se encuentran en: `docs/evidencias/semana-1`

- Captura de Postman usando `POST /users`.
- Captura donde se observa que el usuario fue creado.
- Captura de la tabla `users` en PostgreSQL.

## Estado

 Completada y probada.

---

# HU-02 - Inicio de sesión

## Historia de usuario

Como cliente, quiero iniciar sesión con mi correo y contraseña, para acceder a mis turnos y funcionalidades del sistema.

## Descripción

Esta historia permite que un usuario previamente registrado pueda autenticarse en el sistema utilizando su correo y contraseña. El inicio de sesión es importante porque permite identificar al usuario dentro del sistema y acceder a funcionalidades como consultar turnos, solicitar citas y revisar notificaciones.

## Criterios de aceptación

- El sistema debe recibir correo y contraseña.
- El usuario debe existir previamente en la base de datos.
- Si las credenciales son correctas, el sistema debe permitir el acceso.
- Si las credenciales son incorrectas, el sistema debe responder con error.
- El endpoint debe funcionar desde el microservicio `users-service`.
- El endpoint debe funcionar desde el `api-gateway`.
- La prueba debe realizarse usando Postman.

## Endpoints probados

### Directo del microservicio

```http
POST http://localhost:8081/users/login
```

### Vía API Gateway

```http
POST http://localhost:8080/users/login
```

### Body de prueba — credenciales correctas

```json
{
  "email": "usuariosemana1@test.com",
  "password": "123456"
}
```

### Body de prueba — credenciales incorrectas

```json
{
  "email": "usuariosemana1@test.com",
  "password": "claveincorrecta"
}
```

## Resultado esperado

**Credenciales correctas:** el sistema valida el correo y la contraseña, y responde con la información del usuario autenticado.

**Credenciales incorrectas:** el sistema rechaza el inicio de sesión y responde con un error indicando que las credenciales no son válidas.

## Evidencias

Las evidencias se encuentran en: `docs/evidencias/semana-1`

- Captura de Postman usando `POST /users/login` por API Gateway.
- Captura de Postman usando `POST /users/login` directo al microservicio.
- Captura de login con contraseña incorrecta.

## Estado

Completada y probada.

---

# Evidencias técnicas de la Semana 1

## Servicios relacionados

| Servicio      | Puerto directo | Ruta por Gateway            |
|---------------|----------------|-----------------------------|
| users-service | 8081           | http://localhost:8080/users |
| api-gateway   | 8080           | Punto de entrada central    |

## Base de datos

| Ambiente | Base de datos   |
|----------|-----------------|
| develop  | usersdb_develop |
| qa       | usersdb_qa      |
| main     | usersdb_main    |

## Tecnologías utilizadas

- Java 17
- Spring Boot 3.2.5
- Maven
- PostgreSQL
- Liquibase
- Docker
- API Gateway
- Postman

## Observación técnica

El microservicio de usuarios fue probado de forma directa y también mediante el API Gateway. Además, se verificó que la estructura de base de datos se maneja mediante Liquibase.
