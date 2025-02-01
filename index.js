const express = require ('express')
const routerApi = require ('./routes')



const app = express()
const port= 3000
app.use(express.json())

routerApi(app)



app.get('/',(req, res)=>{
  res.send('hola mi servidor  en express')
})

app.get('/nueva-ruta',(req, res)=>{
  res.send('hola soy una nueva ruta')
})



app.listen(port, ()=> {
  console.log('corriendo en el puerto', port)
})




