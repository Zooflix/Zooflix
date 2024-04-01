FROM openjdk:17-jdk
EXPOSE 8089
COPY build/libs/*.jar zooflix.jar
ENTRYPOINT ["java","-jar","-Dspring.config.location=classpath:/application.yml","/zooflix.jar"]