import mysql, { PoolOptions } from "mysql2";

const access: PoolOptions = {
  user: "root",
  database: "byte",
  password: "22EC1U3Inisl#wiswAPe",
};

const conn = mysql.createPool(access).promise();

export default conn;
