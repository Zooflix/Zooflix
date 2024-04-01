FROM openjdk:17-jdk
EXPOSE 8089
COPY build/libs/*.jar zooflix.jar
ENTRYPOINT ["java","-Dspring.config.location=/config/application-prod.yml","-jar","/zooflix.jar"]