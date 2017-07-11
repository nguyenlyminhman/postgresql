const pg = require('pg');

var config = {
    user: 'postgres', //env var: PGUSER
    database: 'leeshop', //env var: PGDATABASE
    password: 'sa', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 3, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);

function queryDB(sqlString, arrData) {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) return reject(err);
            client.query(sqlString, arrData, (errQuery, result) => {
                done(errQuery);
                if (errQuery) return reject(errQuery);
                resolve(result);
            });
        });
    });
}

function queryCategory(sql, arrData) {
    return queryDB(sql, arrData)
        .then(result => result.rows)
        .catch(err => console.log(err));
}

queryCategory('select * from "category" where cateid=1', [])
    .then(result => console.log(result));
