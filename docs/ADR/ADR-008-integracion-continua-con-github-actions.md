# ADR-008: Integración continua con GitHub Actions

## Estado
Aceptado

## Fecha
2026-05-18

## Contexto
El proyecto Gestión de Citas Inteligente está compuesto por varios elementos: frontend en Angular, API Gateway, microservicios, bases de datos, archivos Docker Compose y documentación técnica.

Al ser un trabajo desarrollado en equipo, cada integrante puede subir cambios en diferentes partes del sistema. Algunos cambios pueden afectar la compilación del frontend, el funcionamiento de los microservicios, la estructura de carpetas, la configuración de Docker o la documentación del proyecto.

Si las validaciones se hacen únicamente de forma manual en el computador de cada integrante, pueden aparecer errores al integrar los cambios en ramas compartidas como develop, QA o main. Además, no todos los integrantes pueden tener el mismo entorno configurado, lo que puede generar diferencias entre lo que funciona en un computador y lo que funciona en el repositorio.

Por esta razón, el proyecto necesita una forma automática de validar los cambios antes de integrarlos a las ramas principales.

## Decisión
Se decidió utilizar GitHub Actions como herramienta de integración continua del proyecto.

GitHub Actions permite ejecutar flujos de trabajo automáticos cuando se realizan acciones en el repositorio, como push o pull request. Estos flujos pueden validar que el proyecto conserve una estructura correcta y que los cambios no rompan la base del sistema.

La integración continua puede incluir validaciones como:

- Descargar el repositorio.
- Validar la existencia de carpetas principales.
- Revisar que existan los archivos Docker Compose.
- Configurar Java para los microservicios Spring Boot.
- Configurar Node.js para el frontend Angular.
- Ejecutar comandos básicos de compilación o validación.
- Apoyar el flujo de ramas develop, QA y main.
- Detectar errores antes de aceptar cambios importantes.

Con esta decisión, el equipo puede tener mayor control sobre los cambios que se integran al proyecto.

## Alternativas consideradas
- Revisar manualmente cada cambio antes de subirlo.
- Probar el proyecto solamente en el computador de cada integrante.
- No usar integración continua.
- Hacer validaciones únicamente al final de la entrega.
- Usar otra herramienta externa de CI/CD.
- Depender únicamente de Docker Desktop para saber si el proyecto funciona.

## Justificación de la decisión
GitHub Actions fue elegido porque está integrado directamente con GitHub, que es la plataforma donde se encuentra el repositorio del proyecto. Esto permite que las validaciones se ejecuten sin instalar herramientas externas adicionales.

Además, GitHub Actions facilita el trabajo con ramas y Pull Requests. Cuando un integrante sube cambios, el equipo puede revisar si el flujo automático pasa correctamente antes de integrar esos cambios a una rama principal.

Esta práctica también ayuda a evidenciar buenas prácticas de DevOps dentro del proyecto, lo cual es importante porque el sistema utiliza microservicios, Docker y trabajo colaborativo.

## Consecuencias positivas
- Ayuda a detectar errores antes de integrar cambios a ramas importantes.
- Mejora el trabajo colaborativo del equipo.
- Permite tener mayor confianza al hacer Pull Requests.
- Facilita mantener estable la rama de desarrollo.
- Reduce el riesgo de subir cambios que dañen la compilación.
- Permite validar la estructura del proyecto automáticamente.
- Deja evidencia de buenas prácticas de integración continua.
- Ayuda a identificar errores de configuración antes de la entrega.
- Permite que el repositorio tenga un proceso de revisión más ordenado.

## Consecuencias negativas o riesgos
- Requiere configurar correctamente el archivo del workflow.
- Si el workflow está mal configurado, puede fallar aunque el código esté bien.
- Puede aumentar el tiempo de validación antes de aceptar cambios.
- El equipo debe aprender a interpretar los errores mostrados por GitHub Actions.
- Si cambian las carpetas o los nombres de archivos, el workflow debe actualizarse.
- Algunas validaciones pueden requerir más tiempo si se compilan todos los microservicios.
- Si no se actualiza el workflow, puede quedar desalineado con la estructura real del proyecto.

## Relación con el proyecto
Esta decisión se evidencia en las siguientes rutas y componentes:

- .github/workflows/
- .github/workflows/ci.yml
- backend/api-gateway/
- backend/users-service/
- backend/turnos-service/
- backend/notifications-service/
- backend/audit-service/
- frontend/gestion-citas-frontend/
- docker-compose.develop.yml
- docker-compose.qa.yml
- docker-compose.main.yml
- docs/ADR/

El workflow de GitHub Actions permite validar partes importantes del proyecto y acompañar el flujo de trabajo del equipo.

## Impacto en el desarrollo
Con esta decisión, el equipo puede trabajar de manera más organizada. Antes de integrar cambios a una rama importante, se pueden ejecutar validaciones automáticas que ayudan a detectar errores de estructura, compilación o configuración.

Esto también facilita la revisión de Pull Requests, porque el equipo puede apoyarse en los resultados del workflow para saber si un cambio está listo para integrarse o si debe corregirse primero.

Para el proyecto académico, esta decisión demuestra que no solo se construyó el sistema, sino que también se pensó en prácticas de mantenimiento, colaboración y despliegue.