const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users).end()
})

usersRouter.post('/', async (request, response) => {
    const body = request.body


    // perform validation
    if (body.username === undefined || body.password === undefined) {
        return response
            .status(400)
            .json({ error: 'username and password fields are required' })
    }

    if (body.username.length < 3 || body.password.length < 3) {
        return response
            .status(400)
            .json({ error: 'username and password must contain at least 3 characters' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    // try {

    const savedUser = await user.save()
    response.json(savedUser)
    // } catch (exception) {
    //     if (exception.name === 'ValidationError') {
    //         return response
    //             .status(400)
    //             .json({ error: exception.message })
    //     }
    //     console.error(exception)
    // }
})


module.exports = usersRouter