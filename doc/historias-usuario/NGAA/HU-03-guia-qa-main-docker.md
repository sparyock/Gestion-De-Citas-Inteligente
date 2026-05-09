# HU-03: Guia para ejecutar los ambientes QA y Main con Docker

## Historia de usuario

Como integrante del equipo de desarrollo, quiero tener una guia para ejecutar los ambientes QA y Main con Docker, para comprobar que el sistema puede trabajar en diferentes entornos sin modificar manualmente la configuracion.

## Objetivo

Documentar los comandos necesarios para levantar y verificar los ambientes QA y Main del proyecto Gestion de Citas Inteligente usando Docker Compose.

## Criterios de aceptacion

- Se documenta el comando para validar el archivo docker-compose.qa.yml.
- Se documenta el comando para levantar el ambiente QA.
- Se documenta el comando para validar el archivo docker-compose.main.yml.
- Se documenta el comando para levantar el ambiente Main.
- Se indican los puertos usados por cada ambiente.
- No se modifica codigo fuente del proyecto.

## Ambiente QA

Validar configuracion:

docker compose -f .\docker-compose.qa.yml config

Levantar ambiente QA:

docker compose -f .\docker-compose.qa.yml up -d --build

Verificar contenedores:

docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

## Puertos QA

| Servicio | Puerto |
|---|---|
| API Gateway | 8180 |
| Users Service | 8181 |
| Turnos Service | 8182 |
| Notifications Service | 8183 |
| Users DB | 5443 |
| Turnos DB | 5444 |
| Notifications DB | 5445 |

## Ambiente Main

Validar configuracion:

docker compose -f .\docker-compose.main.yml config

Levantar ambiente Main:

docker compose -f .\docker-compose.main.yml up -d --build

Verificar contenedores:

docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

## Puertos Main

| Servicio | Puerto |
|---|---|
| API Gateway | 8280 |
| Users Service | 8281 |
| Turnos Service | 8282 |
| Notifications Service | 8283 |
| Users DB | 5453 |
| Turnos DB | 5454 |
| Notifications DB | 5455 |

## Resultado esperado

Los ambientes QA y Main deben quedar activos con sus servicios y bases de datos funcionando en puertos diferentes, evitando conflictos con el ambiente develop.

## Evidencias sugeridas

- Captura de validacion del docker-compose.qa.yml.
- Captura de ambiente QA levantado.
- Captura de validacion del docker-compose.main.yml.
- Captura de ambiente Main levantado.
- Captura de docker ps mostrando puertos QA y Main.

## Conclusion

Esta historia aporta una guia practica para demostrar que el proyecto puede ejecutarse en varios ambientes mediante Docker Compose, manteniendo separados los puertos y servicios de QA y Main.
