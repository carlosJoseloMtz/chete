import cors from 'cors'

app.use(bodyParser())

module.exports = app => {
  // enable CORS :V
  app.use(cors())

  const port = app.get('port')
  app.listen(port, _ => {
    console.log(`Server's running on http://localhost:${port}`)
  })
}
