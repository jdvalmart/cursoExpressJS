const express = require ('express')
const {faker} = require('@faker-js/faker')
const boom = require('@hapi/boom')


class CategoryService {

  constructor() {
    this.categories = []
    this.generate()
  }

  generate(){
    const limit = 100
    for (let index=0; index<limit; index++){
           this.categories.push({
            id: faker.string.uuid(),
            nombre: faker.commerce.department(),
            descripcion: faker.lorem.sentence(),
            imagen: faker.image.urlLoremFlickr({ category: 'business' })
         })
      }
  }

  create(data){
    const newCategory = {
      id: faker.string.uuid(),
      ...data
    }
    this.categories.push(newCategory)
    return newCategory
  }

  find(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
          resolve(this.categories)
        },2000)
    })
    return this.categories
  }

  async findOne(id){
    const category = this.categories.find(item => item.id === id)
    if(!category){
      throw boom.notFound('caegoria no encontrada')
    }
    if (category.isBlock){
      throw boom.conflict('categoria bloqueada')
    }
    return category
  }

  async update(id, changes) {
    const index = this.categories.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('categoria no encontrada')
    }
    const category = this.categories[index]
    this.categories[index]={
      ...category,
      ...changes
    }
    return this.categories[index]
  }

  async delete(id){
    const index = this.categories.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('categoria no encontrada')
    }
    this.categories.splice(index,1)
    return {id}
  }
}

module.exports = CategoryService
