const express = require ('express')
const cors = require('cors')
const routerApi = require ('./routes')

const {logErrors,errorHandler,boomErrorHandler} = require('./middlewares/error.handler')


const app = express()
const port= process.env.PORT || 3000

app.use(express.json())

const whitelist = ['http://localhost:5500','http://127.0.0.1:5500']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin){
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options))

app.get('/api', (req, res) =>{
  res.send('corriendo en mi servidor')
})

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)



app.listen(port, ()=> {
  console.log('corriendo en el puerto' + ' ' + port)
})




module.exports = app
