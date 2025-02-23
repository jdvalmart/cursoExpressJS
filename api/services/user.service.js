const express = require ('express')
const {faker} = require('@faker-js/faker')
const boom = require('@hapi/boom')

class UserService {
  constructor() {
    this.users = []
    this.generate()
  }

  generate(){
    const limit = 100
    for (let index=0; index<limit; index++){
           this.users.push({
            id: faker.string.uuid(),
            nombre: faker.person.firstName(),
            apellido: faker.person.lastName(),
            telefono: faker.phone.number(),
         })
      }
  }

  async create(data){
    const newUser = {
      id: faker.string.uuid(),
      ...data
    }
    this.users.push(newUser)
    return newUser
  }

  find(){
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve(this.users)
      },2000)
    })
    return this.users
  }

  async findOne(id){
    const user = this.users.find(item => item.id === id)
    if (!user){
      throw boom.notFound('Usuario no encontrado')
    }
    if (user.isBlock){
      throw boom.conflict('Usuario bloqueado')
    }
    return user
  }

  async update(id, changes) {
    const index = this.users.findIndex( item => item.id === id)
    if (index === -1) {
      throw new Error ('Usuario no encontrdo')
  }
  const user = this.users[index]
  this.users[index]={
    ...user,
    ...changes
  }
  return this.users[index]
}

  async delete(id){
    const index = this.users.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error ('usuario no encontrado')
    }
    this.users.splice(index, 1)
    return {id}
  }
}

module.exports = UserService
