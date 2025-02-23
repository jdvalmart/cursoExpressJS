const joi = require('joi')


const id = joi.string().uuid()
const nombre = joi.string().min(3).max(30)
const apellido = joi.string().min(3).max(30)
const telefono = joi.string().min(10).max(10)

const createUserSchema = joi.object({
  nombre: nombre.required(),
  apellido: apellido.required(),
  telefono: telefono.required()
})

const updateUserSchema = joi.object({
  nombre: nombre,
  apellido: apellido,
  telefono: telefono
})

const getUserSchema = joi.object({
  id: id
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema }  //exportamos los schemas para
