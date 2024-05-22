-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 13.124.215.149    Database: zooflix
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user_subscribe`
--

DROP TABLE IF EXISTS `user_subscribe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_subscribe` (
  `subscribe_no` int NOT NULL AUTO_INCREMENT,
  `subscribe_create` date DEFAULT NULL,
  `subscribe_user_no` int NOT NULL,
  `user_no` int NOT NULL,
  PRIMARY KEY (`subscribe_no`),
  KEY `FKc5e4cw6uwb1cehqhcx8t6431n` (`user_no`),
  CONSTRAINT `FKc5e4cw6uwb1cehqhcx8t6431n` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_subscribe`
--

LOCK TABLES `user_subscribe` WRITE;
/*!40000 ALTER TABLE `user_subscribe` DISABLE KEYS */;
INSERT INTO `user_subscribe` VALUES (11,'2024-04-03',2,8),(12,'2024-04-03',3,8),(13,'2024-04-03',4,8),(14,'2024-04-03',5,8),(15,'2024-04-03',3,5),(16,'2024-04-03',4,5),(17,'2024-04-03',2,5),(18,'2024-04-03',13,5),(19,'2024-04-03',1,3),(20,'2024-04-03',14,3),(21,'2024-04-03',3,3),(22,'2024-04-03',2,3),(24,'2024-04-03',7,3),(25,'2024-04-03',6,3),(26,'2024-04-03',3,2),(27,'2024-04-03',4,2),(28,'2024-04-03',7,2),(29,'2024-04-03',5,2),(30,'2024-04-03',3,4),(31,'2024-04-03',2,4),(32,'2024-04-03',5,4),(33,'2024-04-03',8,4),(35,'2024-04-03',6,2),(36,'2024-04-03',2,12),(37,'2024-04-03',5,12),(38,'2024-04-03',7,12),(39,'2024-04-03',8,12),(42,'2024-04-03',3,13),(44,'2024-04-03',4,3),(45,'2024-04-03',4,13),(53,'2024-04-03',1,13),(55,'2024-04-03',1,13),(56,'2024-04-03',1,13),(64,'2024-04-03',14,2),(73,'2024-04-04',4,1);
/*!40000 ALTER TABLE `user_subscribe` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-04  4:03:55