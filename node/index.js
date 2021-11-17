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

  const html = `<h1> Full Cycle Rocks! </h1> \
                <h2> Retorno DB </h2> \
                <div style="background-color: #e3e3e3; font-size: 1.5em;">${JSON.stringify([{ result }])}</div> \
                <ul style="background-color: #369369; font-size: 1.5em;"> \
                </ul>`;

  connection.query(select, function (error, results, fields) {
    if(error) {
      console.log(error.message);
    }
    const result = results
  })




  //connection.query(select, function (error, results, fields) {
  //  if(error) {
  //    console.log(error);
  //    return
  //  }
  //  console.log(results)
  //  results.forEach(function(row) {
  //    console.log(row);
  //    res.write(`<li>${row.name}</li`);
  //  })
  //})
  //res.write('</ul>')
  
  res.send(html);
})


app.listen(port, ()=> {
  console.log('Rodando na porta '+port)
  console.log('testando se roda')
})
