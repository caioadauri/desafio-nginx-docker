const express = require('express')
const app = express()
app.use(express.json())
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const createTable = `create table if not exists people (id int NOT NULL AUTO_INCREMENT, name varchar(200) NOT NULL, PRIMARY KEY (id))`;
const sql = `INSERT INTO people(name) values('Caio')`;
const select = 'SELECT * FROM people where id = 1';
connection.query(createTable)
connection.query(sql)
connection.query(select)

app.get('/', (req, res) => {

  

  connection.query(select, function (error, results, fields) {
    if(error) {
      res.send(error.message);
    }
    const html = `<h1> Full Cycle Rocks! </h1> \
    <h2> Retorno DB </h2> \
    <div style="background-color: #e3e3e3; font-size: 1.5em;">${JSON.stringify([{ results }])}</div> \
    <ul style="background-color: #369369; font-size: 1.5em;"> \
    </ul>`;

    res.send(html);
  })  
})


app.listen(port, ()=> {
  console.log('Rodando na porta '+port)
  console.log('testando se roda')
})
