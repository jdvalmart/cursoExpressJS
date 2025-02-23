const express = require ('express')

const UserService = require('./../services/user.service')
const validatorHandler = require('./../middlewares/validator.handler')
const {createProductSchema, updateProductSchema, getProductSchema}= require('./../schemas/product.schema')

const router = express.Router()
const service = new UserService()


router.get('/', (req, res) =>{
  const users = service.find()
  res.json(users)
})

router.get('/:id',
  validatorHandler(getProductSchema,'params'),
  async (req, res, next)=>{
    try {
      const {id}=req.params
      const user = service.findOne(id)
      res.json(user)
    } catch (error) {
      next(error)
    }
  })

router.post('/',
  validatorHandler(createProductSchema,'body'),
async(req, res) =>{
  const body = req.body
  const newUser = service.create(body)
  res.status(201).json(newUser)
})

router.patch('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema,'body'),
async(req, res) =>{
  const {id} = req.params
  const body = req.body
  const user = service.update(id, body)
  res.json(user)
})

router.delete('/:id', (req, res) =>{
  const {id} = req.params
  const rta = service.delete(id)
  res.json(rta)
})

module.exports = router
