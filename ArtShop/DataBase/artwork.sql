CREATE TABLE artwork (
	id INT, /*这里改成了自增长*/
	artname VARCHAR(20),
	author VARCHAR(32),
	owner VARCHAR(32),
	buyer VARCHAR(32) DEFAULT '-1',
    price INT,
    year VARCHAR(4),
	style VARCHAR(16),
	width INT,
    height INT,
	intro VARCHAR(128),
    image MEDIUMBLOB, /*16M最大*/
	status INT DEFAULT 0,
	views INT DEFAULT 0
);