# ADR-006: Frontend Angular consumiendo el API Gateway

## Estado
Aceptado

## Fecha
2026-05-18

## Contexto
El proyecto Gestión de Citas Inteligente requiere una interfaz web que permita a los usuarios interactuar con las funcionalidades principales del sistema, como iniciar sesión, registrarse, solicitar turnos, consultar sus citas, revisar notificaciones, ver historial y editar su perfil.

El sistema está construido bajo una arquitectura de microservicios, donde cada componente tiene una responsabilidad específica. Dentro del backend existen servicios como users-service, turnos-service, notifications-service, audit-service y api-gateway. Debido a esta separación, el frontend necesita una forma ordenada de comunicarse con el backend sin depender directamente de la ubicación interna de cada microservicio.

Si el frontend se conectara directamente a cada servicio, tendría que conocer varios puertos, rutas y nombres de contenedores. Esto aumentaría el acoplamiento entre la interfaz y los microservicios, haciendo más difícil modificar la arquitectura, cambiar puertos, mover servicios o ajustar rutas internas.

Además, el proyecto utiliza Docker Compose para levantar varios servicios al mismo tiempo. En este escenario, tener un único punto de entrada para el frontend permite que la comunicación sea más clara y más fácil de mantener.

## Decisión
Se decidió implementar el frontend utilizando Angular y hacer que todas las peticiones hacia el backend pasen por el API Gateway.

El API Gateway funciona como punto central de entrada para las solicitudes del frontend. Desde Angular se consume una URL principal del gateway, por ejemplo:

- http://localhost:8080

A partir de esa URL se accede a las rutas correspondientes de cada módulo del sistema:

- /users
- /turnos
- /notifications
- /audit

Con esta decisión, el frontend no necesita conocer directamente los puertos internos de cada microservicio. En lugar de conectarse a users-service, turnos-service o notifications-service por separado, Angular envía las peticiones al API Gateway y este se encarga de redirigirlas al servicio correspondiente.

También se decidió mantener la lógica de consumo de servicios en archivos separados dentro del frontend, usando servicios de Angular para organizar las peticiones HTTP y evitar repetir código en los componentes visuales.

## Alternativas consideradas
- Crear el frontend con React en lugar de Angular.
- Crear páginas HTML estáticas sin framework.
- Conectar Angular directamente a cada microservicio.
- Consumir cada microservicio desde el navegador usando puertos diferentes.
- No desarrollar frontend y probar únicamente los servicios con Postman.
- Crear una aplicación monolítica donde frontend y backend estuvieran unidos.

## Justificación de la decisión
Angular fue elegido porque permite organizar el proyecto en componentes, servicios, rutas y módulos de manera clara. Esto facilita separar la parte visual de la lógica de comunicación con el backend.

El uso del API Gateway permite mantener una arquitectura más limpia, ya que el frontend solo conoce una dirección principal. Esto es importante en un sistema distribuido porque los microservicios pueden cambiar internamente sin obligar a modificar todas las pantallas del frontend.

También ayuda a que el sistema sea más fácil de probar en Docker, porque el frontend se conecta a un punto central y no depende de múltiples direcciones o puertos.

## Consecuencias positivas
- El usuario final puede interactuar con el sistema mediante una interfaz visual.
- El frontend solo necesita conocer una URL principal del backend.
- Se reduce el acoplamiento entre Angular y los microservicios.
- El API Gateway centraliza el acceso a los servicios.
- Se facilita el mantenimiento de rutas y endpoints.
- Se puede cambiar la ubicación interna de los microservicios sin afectar directamente todas las pantallas.
- Permite probar el flujo completo del sistema desde el navegador.
- Mejora la organización del frontend mediante componentes y servicios.
- Facilita futuras mejoras visuales o funcionales.

## Consecuencias negativas o riesgos
- Si el API Gateway no está activo, el frontend no puede comunicarse con los microservicios.
- Se debe configurar correctamente CORS para permitir las peticiones desde Angular.
- Si una ruta del gateway cambia, también debe actualizarse el servicio correspondiente en Angular.
- Los modelos del frontend deben mantenerse sincronizados con los DTO del backend.
- Puede ser más difícil identificar errores si una petición falla entre frontend, gateway y microservicio.
- El frontend depende de que el API Gateway esté correctamente configurado en Docker Compose.

## Relación con el proyecto
Esta decisión se evidencia en las siguientes carpetas y archivos del proyecto:

- frontend/gestion-citas-frontend/
- frontend/gestion-citas-frontend/src/app/
- frontend/gestion-citas-frontend/src/app/pages/
- frontend/gestion-citas-frontend/src/app/services/
- frontend/gestion-citas-frontend/src/app/app.routes.ts
- backend/api-gateway/
- backend/users-service/
- backend/turnos-service/
- backend/notifications-service/
- backend/audit-service/
- docker-compose.develop.yml
- docker-compose.qa.yml
- docker-compose.main.yml

En el frontend se encuentran las páginas y servicios encargados de manejar la interacción del usuario. En el backend, el API Gateway se encarga de recibir las peticiones y redirigirlas hacia los microservicios correspondientes.

## Impacto en el desarrollo
Esta decisión permite que cada integrante del equipo trabaje en una parte diferente del sistema sin afectar directamente a los demás. Por ejemplo, una persona puede trabajar en el frontend, otra en users-service y otra en turnos-service, manteniendo como punto común la comunicación mediante el API Gateway.

También ayuda a demostrar en el proyecto académico una arquitectura distribuida real, donde existe separación entre presentación, gateway, microservicios y bases de datos.