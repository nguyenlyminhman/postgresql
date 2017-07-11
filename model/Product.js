const queryDB = require('../db');
class Product {
    constructor(id, title, image, video, descr) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.video = video;
        this.descr = descr;
    }

    // static getAllProduct(cb) {
    //     const sql = 'Select * from "Product"';
    //     queryDB(sql, (err, result) => {
    //         if (err) return cb(err);
    //         cb(undefined, result.rows);
    //     });
    // }

    static getAllProduct() {
        return new Promise((resolve, reject)=>{
            ``
        });
    }

    addProduct(cb) {
        const sql = `INSERT INTO public."Product"(title, image, video, descr) 
        VALUES ( '${this.title}', '${this.image}', '${this.video}', '${this.descr}')`;
        queryDB(sql, (err, result) => {
            if (err) return cb(err, undefined);
            cb(undefined);
        });
    }

    removeProduct(cb) {
        const sql = `DELETE FROM public."Product" WHERE id = '${this.id}'`;
        queryDB(sql, (err, result) => {
            if (err) return cb(err, undefined);
            cb(undefined);
        });
    }

    updateProduct(cb) {
        const sql = `UPDATE public."Product" SET  
        title= '${this.title}', image='${this.image}', video='${this.video}', descr = '${this.descr}'
        WHERE id= '${this.id}';`;
        queryDB(sql, (err, result) => {
            if (err) return cb(err, undefined);
            cb(undefined);
        });
    }
}

module.exports = Product;

Product.getAllProduct((err, rows) => {
    if (err) return res.send('Error');
    console.log(rows);
});