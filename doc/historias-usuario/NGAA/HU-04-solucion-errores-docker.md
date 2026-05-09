# HU-04: Guia de solucion de errores comunes en Docker

## Historia de usuario

Como integrante del equipo de desarrollo, quiero tener una guia de solucion de errores comunes en Docker, para identificar rapidamente problemas de contenedores, puertos ocupados o servicios que no inician antes de una entrega.

## Objetivo

Documentar comandos basicos para diagnosticar errores frecuentes al ejecutar el backend del proyecto Gestion de Citas Inteligente con Docker.

## Criterios de aceptacion

- Se documenta como ver contenedores activos y detenidos.
- Se documenta como revisar logs de un contenedor.
- Se documenta como identificar puertos ocupados.
- Se documenta como detener un proceso que ocupa un puerto.
- Se documenta como reiniciar un servicio especifico.
- No se modifica codigo fuente del proyecto.

## Ver contenedores activos

docker ps

## Ver todos los contenedores, incluyendo detenidos

docker ps -a

## Ver logs de un contenedor

docker logs nombre-del-contenedor

Ejemplo:

docker logs notifications-service-develop

## Revisar si un puerto esta ocupado

Ejemplo con el puerto del API Gateway develop:

netstat -ano | findstr :8080

## Finalizar un proceso que ocupa un puerto

taskkill /PID NUMERO /F

## Reiniciar un servicio especifico

Develop:

docker compose -f .\docker-compose.develop.yml up -d notifications-service-develop

QA:

docker compose -f .\docker-compose.qa.yml up -d notifications-service-qa

Main:

docker compose -f .\docker-compose.main.yml up -d notifications-service-main

## Apagar un ambiente sin borrar volumenes

Develop:

docker compose -f .\docker-compose.develop.yml down

QA:

docker compose -f .\docker-compose.qa.yml down

Main:

docker compose -f .\docker-compose.main.yml down

## Advertencia

No se recomienda usar `down -v` durante pruebas normales, porque elimina los volumenes y puede borrar la informacion almacenada en las bases de datos.

## Resultado esperado

El equipo debe poder identificar errores basicos de Docker y aplicar soluciones rapidas sin afectar el codigo fuente del proyecto.

## Evidencias sugeridas

- Captura de `docker ps`.
- Captura de `docker ps -a`.
- Captura de logs de un contenedor.
- Captura de revision de puerto con `netstat`.
- Captura de reinicio de un servicio especifico.

## Conclusion

Esta historia ayuda a reducir el tiempo de solucion de problemas durante pruebas y exposiciones, dejando comandos claros para diagnosticar contenedores, logs y puertos ocupados.
