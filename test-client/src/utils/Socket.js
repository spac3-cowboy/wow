import { io } from 'socket.io-client'

let local = 'http://localhost:8001'
let server = "wss://albi-backend.cyclic.app:3000"

let socket = io(local, {
  path: '/socket.io',
  transports: ['websocket'],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttemps: 10,
})

export default socket;