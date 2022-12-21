let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mysql = require('mysql2');

const path = require('path')

// ADD THIS
let cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("",require("./src/routes/index_routes"))

const distPath = path.join(__dirname, '/build');
app.use(express.static(distPath));



// //homepage route
// app.get('/', (req, res) => {
//     return res.send({
//         error: false,
//         message: 'Welcom To Server',
//         written_by: 'Kruamas'

//     })
// })


//connection to mysql
let dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : '',
    database: 'nodejs_api'
})
dbCon.connect((err) => {
    if (err) throw err;
    console.log('connect success');
});


// ? DB User
const db = require("./src/model/index_model");
db.sequelize.sync();
// db.sequelize.sync({ force: true, alter: true });  //สร้างตารางใหม่ตลอด     

//
// app.get('/mainadmin', (req, res) => {
//     dbCon.query('SELECT * FROM mainadmin', (error, results, fields) => {
//         if (error) throw error;

//         let message = ""
//         if (results === undefined || results.length == 0) { 
//             message = "fiscalyear table is empty";
//         } else {
//             message = "successfully retrieved all fiscalyear";
//         }
//         return res.send({ error: false, data: results, message: message});
//     })
// })

app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

app.listen(3001, () => {
    console.log('Runing on port 3001')
})



module.exports = app;