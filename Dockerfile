FROM openjdk:21-jdk AS build
WORKDIR /app
RUN mvn clean package -DskipTests
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080

CMD ["java", "-jar", "/app/app.jar"]