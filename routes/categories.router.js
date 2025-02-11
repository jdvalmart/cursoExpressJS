const express = require ('express')


const CategoryService = require('./../services/category.service')

const router = express.Router()
const service = new CategoryService()


router.get('/', (req, res) =>{
  const categories = service.find()
  res.json(categories)
})

router.get('/:id', (req, res)=>{
  const {id}=req.params
  const category = service.findOne(id)
  res.json(category)
})

router.post('/', (req, res) =>{
  const body = req.body
  res.status(201).json({
    message:'created',
    data:body
  })
})

router.patch('/:id', (req, res) =>{
  const {id} = req.params
  const body = req.body
  res.json({
    message:'update ',
    data:body,
    id
  })
})

router.delete('/:id', (req, res) =>{
  const {id} = req.params
  res.json({
    message:'deleted ',
    id
  })
})

module.exports = router
