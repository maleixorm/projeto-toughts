const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }
    
    static register(req, res) {
        res.render('auth/register')
    }
    
    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body

        // password match validation
        if (password != confirmpassword) {
            req.flash('message', 'As senhas não conferem! Tente novamente!')
            res.render('auth/register')
            return
        }

        // check if user exists
        const checkIfUserExists = await User.findOne({ where: {email: email} })
        if (checkIfUserExists) {
            req.flash('message', 'O email já está em uso! Tente novamente!')
            res.render('auth/register')
            return
        }
    }
}