# Etapa de build con Maven
FROM maven:3.9.2-eclipse-temurin-17 AS build

WORKDIR /app

# Copiar pom.xml y el código fuente
COPY pom.xml .
COPY src ./src

# Construir el proyecto y saltar tests para agilizar
RUN mvn clean package -DskipTests

# Etapa de runtime con JDK
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copiar el JAR construido de la etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Puerto de tu backend
EXPOSE 8081

# Comando para ejecutar la aplicación
ENTRYPOINT ["java","-jar","app.jar"]