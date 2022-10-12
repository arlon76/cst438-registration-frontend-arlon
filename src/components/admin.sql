




DROP TABLE IF EXISTS `admin`; 
CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `status_code` int(11) NOT NULL,
  PRIMARY KEY (`admin_id`)
)  ;

INSERT INTO `admin` VALUES 
(1,'admin','admin@csumb.edu',NULL,0),
(2,'arlon','larriola@csumb.edu',NULL,0);
