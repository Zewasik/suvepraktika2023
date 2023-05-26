FROM maven:3.9.2-eclipse-temurin-11-alpine AS builder

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline -B

COPY src ./src

RUN mvn package -DskipTests

FROM eclipse-temurin:11.0.19_7-jre-alpine

WORKDIR /app

COPY --from=builder /app/target/library-0.0.1-SNAPSHOT.jar .

CMD ["java", "-jar", "library-0.0.1-SNAPSHOT.jar"]

EXPOSE 8080