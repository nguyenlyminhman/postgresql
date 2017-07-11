const queryDB = require ('../dbpromise');

function queryCategory(sql, arrData) {
    return queryDB(sql, arrData)
        .then(result => result.rows)
        .catch(err => console.log(err));
}

queryCategory('select * from "category" where cateid=1', [])
    .then(result => console.log(result));
