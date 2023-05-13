import mysql from "mysql";
const dbConfig = require("../config/db.config");

export const db = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

db.connect((error) => {
  if (error) throw error;
  console.log("Succcesfully Connected");
});
