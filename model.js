const db = require('./db-connect');

class User {
    constructor(){}
    findAll(args){        
        return new Promise((resolve,reject)=>{
            db('User').select("*")
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }
    addUser(user){
        return new Promise((resolve,reject)=>{
            db('User').insert(user)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }
    updateUser(user){
        return new Promise((resolve,reject)=>{
            db('User').update(user).where({id:user.id})
                .then(res=>resolve(res))
                .catch(err=>reject(err))
        })
    }
    deleteUser(id){
        return new Promise((resolve,reject)=>{
            db('User').delete({id:id})
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }

    getById(userId){
        return new Promise((resolve,reject)=>{
            db('mydb.User').select("*").where('id',userId)
                .then(res=>resolve(res[0]))
                .catch(err=>reject(err))
        })
    }

    getStoryByUser(id){
        return new Promise((resolve,reject)=>{
            db('Story').select("*").where('author',id)
                .then(res=>resolve(res))
                .catch(err => reject(err))
        })
    }
}

module.exports = User;