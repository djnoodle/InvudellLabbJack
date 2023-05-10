const express = require('express')
const http = require('http')
const app = express()
const cors = require('cors')
const server = http.createServer(app)
const { Server } = require('socket.io')

const io = new Server({
    cors: {
        origin: '*'
    }
})

const room = 'main room'
const responses = ['I am a bot', 'I am a bot too', 'I am a bot as well']
let peopleInRoom = 0

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

io.on('connection', (socket) => {
    peopleInRoom++

    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })

    // if (peopleInRoom <= 2) {
    //     socket.join(room)

    //     socket.emit('server message', 'Welcome to the ' + room)
    // }

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)

        // respond with a random message
        const random = Math.floor(Math.random() * responses.length)
        io.emit('chat message', {
            id: new Date().getTime(),
            text: responses[random]
        })
    })
})

const bookRouter = require('./routes/book')
const authorRouter = require('./routes/author')
app.use('/book', bookRouter)
app.use('/author', authorRouter)

app.listen(3000)
io.listen(3001)
