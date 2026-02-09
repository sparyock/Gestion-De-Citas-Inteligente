# Gestion-De-Citas-Inteligente
PROYECTO PROPUESTO: Plataforma de Gestión de Citas Inteligente (con 3 microservicios)

Ideal para salones, barberías, talleres, doctores, veterinarias, lo que quieran.

⸻

🧱 Arquitectura con 3 microservicios (como te piden)

🔸 Microservicio 1: Usuarios y Autenticación (Spring Boot + PostgreSQL)
	•	Maneja registro e inicio de sesión
	•	Roles (cliente / administrador)
	•	Token JWT
	•	Guarda usuarios en PostgreSQL

🔸 Microservicio 2: Gestión de Citas (Spring Boot + MongoDB)
	•	Crear cita
	•	Cancelar cita
	•	Reprogramar
	•	Calendario
	•	Notificaciones (opcional)
	•	MongoDB es perfecto para datos flexibles como citas

🔸 Microservicio 3: Servicios y Empleados (Spring Boot + PostgreSQL o MongoDB, tú eliges)
	•	Servicios ofrecidos (corte, uñas, revisión, consulta)
	•	Horarios de empleados
	•	Precios
	•	Disponibilidad dinámica

⸻

🖥️ Frontend: Angular (Microfrontend obligatorio)

Pantallas:
	•	Login / Registro
	•	Dashboard
	•	Calendario de citas
	•	Vista de servicios
	•	Perfil
	•	Administración (empleados, horarios, servicios)

⸻

🐳 Docker (Obligatorio)

Corren todo con contenedores:
	•	Un contenedor por microservicio
	•	Un contenedor para PostgreSQL
	•	Uno para MongoDB
	•	Un contenedor para Angular (opcional)

⸻

🔗 Comunicación entre microservicios

Usa:
✔ REST
✔ OpenFeign (si quieren simplificar)
✔ Eureka / API Gateway (opcional, pero luciría mucho)

⸻

🧪 ¿Por qué este proyecto es perfecto?
	•	✔ Cumple TODOS los requisitos del stack
	•	✔ Tiene 3 microservicios (como te piden)
	•	✔ Se ve profesional para presentación
	•	✔ No es tan complejo de programar
	•	✔ Modular, escalable y fácil de dockerizar
	•	✔ El frontend queda muy bonito y funcional
	•	✔ Usan dos bases de datos diferentes, lo cual IMPRESIONA a los profes
	•	✔ Puedes mostrar tolerancia a fallos desactivando un microservicio
	•	✔ Es útil como proyecto real

⸻

👥 División en grupo de 4

🧑‍💻 Integrante 1: Microservicio Usuarios (Spring Boot + PostgreSQL)

🧑‍💻 Integrante 2: Microservicio Citas (Spring Boot + MongoDB)

🧑‍💻 Integrante 3: Microservicio Servicios/Empleados (Spring Boot + PostgreSQL o MongoDB)

🧑‍🎨 Integrante 4: Angular + Docker + Integración
