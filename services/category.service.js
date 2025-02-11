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

  create(){}

  find(){
    return this.categories
  }

  findOne(id){
    return this.categories.find(item => item.id === id)
  }

  update() {}

  delete(){}
}

module.exports = CategoryService
