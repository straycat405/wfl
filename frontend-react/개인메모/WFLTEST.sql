
-- USER 테이블 생성 --
CREATE TABLE USER (
	userId	INT	NOT NULL AUTO_INCREMENT,
	userEmail VARCHAR(100)	NOT NULL,
	userPw	VARCHAR(30)	NOT NULL,
	userName	VARCHAR(20)	NOT NULL,
	userNickname	VARCHAR(20)	NOT NULL,
	userProfile	VARCHAR(255),
	userRegDate DATE NOT NULL	DEFAULT CURRENT_TIMESTAMP,
	userModDate	DATE,
	userPhone	VARCHAR(30)	NOT NULL,
	userPremium	INTEGER	DEFAULT 0,
	adminAuth	INTEGER	DEFAULT 0,
	userResign	INTEGER	DEFAULT 0,
	PRIMARY KEY (userId)
);

-- USER 테이블 조회 --
SELECT * FROM user;

ALTER TABLE user MODIFY userRegDate MEDIUMTEXT;

INSERT INTO user (userEmail, userPw, userName, userNickName, userPhone) VALUE ('test@gmail.com','1234','test','testNick','01012345678');

INSERT INTO user (userEmail, userPw, userName, userNickName, userPhone) VALUE ('test2@gmail.com','4321','test2','testNick2','01078945612');


DELETE FROM user WHERE userId=3;

SELECT COUNT(*) AS COUNT FROM USER WHERE userEmail LIKE 'test';