import mysql_interface from "./mysql_interface";

const create_squad = "CREATE TABLE IF NOT EXISTS squad (id INT NOT NULL AUTO_INCREMENT,name VARCHAR(45) NULL,number INT NULL,position VARCHAR(45) NULL,image LONGTEXT NULL,PRIMARY KEY (id))";
const create_games = "CREATE TABLE IF NOT EXISTS games (id INT NOT NULL AUTO_INCREMENT,opponent VARCHAR(45) NULL,date DATE NULL,time TIME NULL,tournament VARCHAR(45) NULL,PRIMARY KEY (id))";
const create_user = "CREATE TABLE IF NOT EXISTS user (id INT NOT NULL AUTO_INCREMENT,first_name VARCHAR(45) NULL,last_name VARCHAR(45) NULL,user_name VARCHAR(45) NULL,password VARCHAR(45) NULL,PRIMARY KEY (id))";

const create_tables = () => {
    mysql_interface.execute(create_squad);
    mysql_interface.execute(create_games);
    mysql_interface.execute(create_user);
}

export default create_tables;