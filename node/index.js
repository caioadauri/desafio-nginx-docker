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

const sql = `INSERT INTO people(name) values('Caio')`;
const select = 'SELECT * FROM people where id = 1';
connection.query(sql)
connection.query(select)

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write('<h1>Full Cycle Rocks!</h1>')
  res.write('<h2>Retorno DB</h2>')
  res.write(`<div style="background-color: #e3e3e3; font-size: 1.5em;">${JSON.stringify([{ id: 01 }])}</div>`)
  res.write('<ul style="background-color: #369369; font-size: 1.5em;">')

  connection.query(select, function (error, results, fields) {
    if(error) {
      console.log(error);
      return
    }
    console.log(results)
    results.forEach(function(row) {
      console.log(row);
      res.write(`<li>${row.name}</li`);
    })
  })
  res.write('</ul>')
  res.end()
})


app.listen(port, ()=> {
  console.log('Rodando na porta '+port)
  console.log('testando se roda')
})
