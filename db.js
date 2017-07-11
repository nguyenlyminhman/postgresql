const pg = require('pg');

var config = {
    user: 'postgres', //env var: PGUSER
    database: 'DEMONODE', //env var: PGDATABASE
    password: 'sa', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 3, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);

// pool.connect((err, client) => {
//     if (err) return console.log(err);
//     client.query('select * from "Product"',(errQuery, result)=>{
//         if(errQuery) return console.log(errQuery);
//         console.log(result.rows);
//     });
// });

function queryDB(sqlString, cb) {
    pool.connect((err, client) => {
        if (err) return cb(err, undefined);
        client.query(sqlString, (errQuery, result) => {
            if (errQuery) return cb(errQuery, undefined);
            cb(undefined, result);
        });
    });
}

const getAllProduct = (cb) => {
    const sql = 'select * from "Product"';
    queryDB(sql, (err, result) => {
        if (err) return cb(err);
        cb(undefined, result.rows);
    });
}

const insertData = (title, image, video, descr, cb) => {
    const sql = `INSERT INTO public."Product"(title, image, video, descr) VALUES 
    ( '${title}', '${image}', '${video}', '${descr}')`;
    queryDB(sql, (err, result) => {
        if (err) return cb(err, undefined);
        cb(undefined);
    });
}

function getProductById() {

}

function updateData(id, title, image, video, descr, cb) {
    const sql = `UPDATE public."Product" 
    SET title= '${title}', image=${image}, video=${video}, descr = ${descr} 
    WHERE id=${id} `;
}

function deleteData(id, cb) {
    const sql = `DELETE FROM public."Product" WHERE id = '${id}'`;
    queryDB(sql, (err, result) => {
        if (err) return cb(err, undefined);
        cb(undefined);
    });
}
// module.exports = getData;
module.exports = queryDB;

