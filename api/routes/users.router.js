const express = require ('express')

const UserService = require('./../services/user.service')
const validatorHandler = require('./../middlewares/validator.handler')
const {createUserSchema, updateUserSchema, getUserSchema}= require('./../schemas/user.schema')

const router = express.Router()
const service = new UserService()


router.get('/', async (req, res) =>{
  const users = await service.find()
  res.json(users)
})

router.get('/:id',
  validatorHandler(getUserSchema,'params'),
  async (req, res, next)=>{
    try {
      const {id}=req.params
      const user = await service.findOne(id)
      res.json(user)
    } catch (error) {
      next(error)
    }
  })

router.post('/',
  validatorHandler(createUserSchema,'body'),
async(req, res) =>{
  const body = req.body
  const newUser = await service.create(body)
  res.status(201).json(newUser)
})

router.patch('/:id',
validatorHandler(getUserSchema, 'params'),
validatorHandler(updateUserSchema,'body'),
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
