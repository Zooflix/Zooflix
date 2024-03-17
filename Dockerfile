FROM openjdk:17-jdk
EXPOSE 8080
COPY build/libs/*.jar zooflix.jar
ENTRYPOINT ["java","-jar","/zooflix.jar"]