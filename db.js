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
    select 
    possibleMovement1,possibleMovement2,possibleMovement3,possibleMovement4,possibleMovement5,possibleMovement6,possibleMovement7,possibleMovement8,possibleMovement9,possibleMovement10  
    from tbl_possible_movement 
    where functionId = ? 
    and 
    departmentId = ? 
    and 
    uniqueRoleId >= ?;
    `, [fnid, depid, unqid]);

    // Initialize an object to store the converted data
    const convertedData = {};

    // Iterate over each property (possibleMovement1, possibleMovement2, etc.)
    for (let i = 1; i <= 10; i++) {
        const key = `possibleMovement${i}`;

        // Use map to extract values from each object in the array
        convertedData[key] = row.map(item => item[key]).filter(Boolean);
    }
    return convertedData;
}
