# ADR-002: Separación de ambientes con Docker Compose

## Estado
Aceptado

## Fecha
2026-05-18

## Contexto
El proyecto necesitaba poder ejecutarse en diferentes ambientes para pruebas y demostración. Se requería separar develop, QA y main para evitar conflictos entre contenedores, puertos, redes y bases de datos.

Si todos los ambientes usaban los mismos puertos y volúmenes, podían generarse errores al levantar los servicios o mezclarse datos entre pruebas.

## Decisión
Se decidió crear archivos Docker Compose separados para cada ambiente:

- docker-compose.develop.yml
- docker-compose.qa.yml
- docker-compose.main.yml

Cada ambiente utiliza sus propios nombres de contenedores, puertos, redes y volúmenes.

## Alternativas consideradas
- Usar un solo docker-compose.yml para todo.
- Ejecutar los servicios manualmente sin Docker.
- Usar perfiles dentro de un único docker-compose.yml.

## Consecuencias positivas
- Cada ambiente puede ejecutarse de forma independiente.
- Se reducen conflictos de puertos.
- Los datos quedan separados por ambiente.
- Facilita las pruebas y demostraciones al profesor.
- Permite validar cambios antes de pasarlos a main.

## Consecuencias negativas o riesgos
- Se deben mantener tres archivos Compose.
- Puede haber diferencias entre ambientes si no se actualizan correctamente.
- Aumenta la cantidad de contenedores y volúmenes en Docker Desktop.

## Relación con el proyecto
Esta decisión se evidencia en:

- docker-compose.develop.yml
- docker-compose.qa.yml
- docker-compose.main.yml

Puertos principales usados:

- develop: 8080, 8081, 8082, 8083, 8084
- qa: 8180, 8181, 8182, 8183
- main: 8280, 8281, 8282, 8283
