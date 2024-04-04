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
-- Table structure for table `alarm`
--

DROP TABLE IF EXISTS `alarm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alarm` (
  `alarm_no` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `alarm_type` enum('SUBSCRIBE','WRITE','TRADING','RESULT','TOMORROW','USER') NOT NULL,
  `alarm_content` varchar(255) DEFAULT NULL,
  `is_read` bit(1) NOT NULL,
  `user_no` int NOT NULL,
  `subscribe_no` int DEFAULT NULL,
  PRIMARY KEY (`alarm_no`),
  KEY `FKjkfijjux8uf1c3ix3ab5iq2tf` (`user_no`),
  KEY `FKtg7lx5fhhkvv4dtu05it5lahp` (`subscribe_no`),
  CONSTRAINT `FKjkfijjux8uf1c3ix3ab5iq2tf` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`),
  CONSTRAINT `FKtg7lx5fhhkvv4dtu05it5lahp` FOREIGN KEY (`subscribe_no`) REFERENCES `user` (`user_no`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alarm`
--

LOCK TABLES `alarm` WRITE;
/*!40000 ALTER TABLE `alarm` DISABLE KEYS */;
INSERT INTO `alarm` VALUES (78,'2024-04-03 11:46:25.576922',NULL,'WRITE','말랑님의 새로운 예측 글이 작성되었습니다.',_binary '\0',8,NULL),(79,'2024-04-03 11:46:25.579720',NULL,'WRITE','말랑님의 새로운 예측 글이 작성되었습니다.',_binary '\0',5,NULL),(80,'2024-04-03 11:46:25.581510',NULL,'WRITE','말랑님의 새로운 예측 글이 작성되었습니다.',_binary '\0',2,NULL),(81,'2024-04-03 11:46:25.583169',NULL,'WRITE','말랑님의 새로운 예측 글이 작성되었습니다.',_binary '\0',3,NULL),(82,'2024-04-03 11:46:25.584756',NULL,'WRITE','말랑님의 새로운 예측 글이 작성되었습니다.',_binary '\0',13,NULL),(83,'2024-04-03 11:57:37.003894',NULL,'WRITE','말랑님의 새로운 예측 글이 작성되었습니다.',_binary '\0',8,NULL),(84,'2024-04-03 11:57:37.005867',NULL,'WRITE','말랑님의 새로운 예측 글이 작성되었습니다.',_binary '\0',5,NULL),(85,'2024-04-03 11:57:37.007388',NULL,'WRITE','말랑님의 새로운 예측 글이 작성되었습니다.',_binary '\0',2,NULL),(86,'2024-04-03 11:57:37.008940',NULL,'WRITE','말랑님의 새로운 예측 글이 작성되었습니다.',_binary '\0',3,NULL),(87,'2024-04-03 11:57:37.010635',NULL,'WRITE','말랑님의 새로운 예측 글이 작성되었습니다.',_binary '\0',13,NULL),(88,'2024-04-03 12:01:45.113908',NULL,'USER','또현님이 회원님을 구독했습니다.',_binary '\0',14,NULL),(89,'2024-04-03 12:02:15.159024',NULL,'USER','또현님이 회원님을 구독했습니다.',_binary '\0',14,NULL),(90,'2024-04-03 12:02:30.586100',NULL,'USER','또현님이 회원님을 구독했습니다.',_binary '\0',14,NULL),(91,'2024-04-03 12:43:31.488176',NULL,'USER','이번엔오른다님이 회원님을 구독했습니다.',_binary '\0',4,NULL),(92,'2024-04-03 12:44:20.391200',NULL,'USER','이번엔오른다님이 회원님을 구독했습니다.',_binary '\0',4,NULL),(93,'2024-04-03 12:45:53.360232',NULL,'USER','이번엔오른다님이 회원님을 구독했습니다.',_binary '\0',4,NULL),(94,'2024-04-03 12:46:43.406020',NULL,'USER','이번엔오른다님이 회원님을 구독했습니다.',_binary '\0',4,NULL),(95,'2024-04-03 14:28:57.345994',NULL,'USER','이번엔오른다님이 회원님을 구독했습니다.',_binary '\0',3,NULL),(96,'2024-04-03 14:37:22.112031',NULL,'USER','이번엔오른다님이 회원님을 구독했습니다.',_binary '\0',3,NULL),(97,'2024-04-03 14:37:28.862803',NULL,'USER','이번엔오른다님이 회원님을 구독했습니다.',_binary '\0',4,NULL),(98,'2024-04-03 16:23:25.242880',NULL,'USER','이번엔오른다님이 회원님을 구독했습니다.',_binary '\0',4,NULL),(99,'2024-04-03 16:25:38.940426',NULL,'USER','이번엔오른다님이 회원님을 구독했습니다.',_binary '\0',4,NULL);
/*!40000 ALTER TABLE `alarm` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-04  4:03:54
