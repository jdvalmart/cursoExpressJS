const express = require ('express')
const {faker} = require('@faker-js/faker')


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
    return this.categories
  }

  findOne(id){
    return this.categories.find(item => item.id === id)
  }

  update(id, changes) {
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

  delete(id){
    const index = this.categories.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('categoria no encontrada')
    }
    this.categories.splice(index,1)
    return {id}
  }
}

module.exports = CategoryService
