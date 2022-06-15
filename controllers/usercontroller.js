const db = require('../models')




// create main Model
const users= db.users


// 1. create user
const adduser = async (req, res) => {

    let info = {
        id:req.body.id,
        email: req.body.email,
        motdepasse: req.body.motdepasse
    }

    const user = await user.create(info)
    res.status(200).send(user)
    console.log(user)

}



// 2. get all users
const getAllusers = async (req, res) => {

    let users = await users.findAll({})
    res.status(200).send(users)

}

// 3. get single users
const getOneusers = async (req, res) => {

    let id = req.params.id
    let users = await users.findOne({ where: { id: id }})
    res.status(200).send(users)

}


// 4. update users
const updateusers = async (req, res) => {

    let id = req.params.id

    const users = await users.update(req.body, { where: { id: id }})

    res.status(200).send(users)
   

}

// 5. delete users by id

const deleteusers = async (req, res) => {

    let id = req.params.id
    
    await users.destroy({ where: { id: id }} )

    res.status(200).send('users is deleted !')

}







module.exports = {
    adduser,
    getAllusers,
    getOneusers,
    updateusers,
    deleteusers
    
}