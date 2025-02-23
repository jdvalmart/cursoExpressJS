const express = require ('express')


const CategoryService = require('./../services/category.service')
const validatorHandler = require('./../middlewares/validator.handler')
const {createProductSchema, updateProductSchema, getProductSchema}= require('./../schemas/product.schema')

const router = express.Router()
const service = new CategoryService()


router.get('/', (req, res) =>{
  const categories = service.find()
  res.json(categories)
})

router.get('/:id',
validatorHandler(getProductSchema,'params'),
async(req, res,next)=>{
  try {
    const {id}=req.params
    const category = service.findOne(id)
    res.json(category)
  } catch (error) {
    next(error)
  }
})

router.post('/',
validatorHandler(createProductSchema,'body'),
async(req, res) =>{
  const body = req.body
  const newCategory = service.create(body)
  res.status(201).json(newCategory)
})

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema,'body'),
async (req, res, next) => {
  const {id} = req.params
  const body = req.body
  const category= service.update(id, body)
  res.json(category)
})

router.delete('/:id', (req, res) =>{
  const {id} = req.params
  const rta = service.delete(id)
  res.json(rta)
})

module.exports = router
