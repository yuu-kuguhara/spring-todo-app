# syntax=docker/dockerfile:1

# ===== 1段目: JDK でビルド =====
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app
COPY mvnw ./
COPY .mvn .mvn
COPY pom.xml .
RUN chmod +x mvnw && ./mvnw -q -DskipTests dependency:go-offline
COPY src src
RUN ./mvnw -q -DskipTests package

# ===== 2段目: JRE で実行 =====
FROM eclipse-temurin:17-jre
WORKDIR /app
ENV TZ=Asia/Tokyo
COPY --from=build /app/target/*SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
