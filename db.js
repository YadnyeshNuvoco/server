import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
// Create a connection pool
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

export async function getfunctions() {
    const [row] = await pool.query("SELECT * FROM tbl_function");
    return row;
}

export async function getdepartments(id) {
    const [row] = await pool.query(`
    SELECT *
    FROM tbl_department
    WHERE
    functionId = ?
    `, [id]);
    return row;
}


export async function getuniqueroles(fnid, depid) {
    const [row] = await pool.query(`
    SELECT *
    FROM tbl_uniquerole
    WHERE
    functionId = ? 
    AND
    departmentId = ?
    `, [fnid, depid]);
    return row;
}

export async function getpossiblemovements(fnid, depid, unqid) {
    const [row] = await pool.query(`
    SELECT *
    FROM tbl_possible_movement
    WHERE
    functionId = ? 
    AND
    departmentId = ?
    AND 
    uniqueRoleId = ?
    `, [fnid, depid, unqid]);
    return row;
}
