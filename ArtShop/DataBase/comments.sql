CREATE TABLE comments (
	id INT PRIMARY KEY AUTO_INCREMENT,
    father INT DEFAULT -1,
    artid INT, 
	username VARCHAR(64),
	content VARCHAR(128),
	likes INT DEFAULT 0,
	deleted INT DEFAULT 0
);