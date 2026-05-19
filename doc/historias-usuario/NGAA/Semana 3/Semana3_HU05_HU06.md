# Semana 3 - Historias de Usuario

## Proyecto: Gestión de Citas Inteligente
## Responsable: NGAA
## Área trabajada: Gestión de Turnos

---

# HU-05 - Solicitar turno

## Historia de usuario
Como cliente, quiero solicitar un turno médico para agendar una cita.

## Criterios de aceptación
- Seleccionar especialidad.
- Seleccionar doctor.
- Elegir fecha y hora.
- Guardar en PostgreSQL.
- Funcionar por microservicio y API Gateway.

## Endpoint
POST http://localhost:8080/turnos

## Estado
Completada y probada.

---

# HU-06 - Cancelar turno

## Historia de usuario
Como cliente, quiero cancelar un turno agendado para liberar el horario.

## Criterios de aceptación
- Seleccionar turno existente.
- Cambiar estado a CANCELADO.
- Actualizar información en BD.

## Endpoint
PUT http://localhost:8080/turnos/{id}/cancelar

## Estado
Completada y probada.
