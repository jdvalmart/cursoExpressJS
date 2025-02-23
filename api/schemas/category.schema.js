const joi = require('joi')

const id = joi.string().uuid()
const nombre =joi.string().min(3).max(30)
const descripcion= joi.string().min(10).max(100)
const imagen =joi.string().uri()

const createCategorySchema = joi.object({
  nombre: nombre.required(),
  descripcion:descripcion.required(),
  imagen:imagen.required()
})

const updateCategorySchema = joi.object({
  nombre: nombre,
  descripcion:descripcion,
  imagen:imagen
})

const getCategorySchema = joi.object({
  id:id
})

module.exports = {createCategorySchema,updateCategorySchema,getCategorySchema}
