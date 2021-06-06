const alliedCheckerBoardCellIdsToEnemy_sMaping = {
  '8-1': '1-8',
  '8-3': '1-6',
  '8-5': '1-4',
  '8-7': '1-2',
  '7-2': '2-7',
  '7-4': '2-5',
  '7-6': '2-3',
  '7-8': '2-1',
  '6-1': '3-8',
  '6-3': '3-6',
  '6-5': '3-4',
  '6-7': '3-2',
  '5-2': '4-7',
  '5-4': '4-5',
  '5-6': '4-3',
  '5-8': '4-1',
  '4-1': '5-8',
  '4-3': '5-6',
  '4-5': '5-4',
  '4-7': '5-2',
  '3-2': '6-7',
  '3-4': '6-5',
  '3-6': '6-3',
  '3-8': '6-1',
  '2-1': '7-8',
  '2-3': '7-6',
  '2-5': '7-4',
  '2-7': '7-2',
  '1-2': '8-7',
  '1-4': '8-5',
  '1-6': '8-3',
  '1-8': '8-1',
}

const alliedCheckerIdsToEnemy_sMapping = {
  '13': '12',
  '14': '11',
  '15': '10',
  '16': '9',
  '17': '8',
  '18': '7',
  '19': '6',
  '20': '5',
  '21': '4',
  '22': '3',
  '23': '2',
  '24': '1',
}

const http = require('http')
const express = require('express')
const app = express()
const httpServer = http.createServer(app)
const io = require('socket.io')(httpServer, {
  cors: '*',
})
let roomId = 1

io.on('connection', (socket) => {
  let roomCount =
    (io.of('/').adapter['rooms'].get(roomId) &&
      io.of('/').adapter['rooms'].get(roomId).size) ||
    0

  if (roomCount === 2) {
    socket.join(++roomId)
    roomCount = io.of('/').adapter['rooms'].get(roomId).size
  } else {
    socket.join(roomId)
    roomCount = io.of('/').adapter['rooms'].get(roomId).size
  }
  if (roomCount === 2) {
    const rand = Math.round(Math.random())
    socket.broadcast.emit('found opponent', rand ? 0 : 1)
    socket.emit('found opponent', rand ? 1 : 0)
    // socket.to(roomId).emit('found opponent', roomId)
    // socket.emit('found opponent', roomId)
  }
  socket.on('turn end', (playerMove) => {
    console.log(playerMove)
    socket.to(roomId).emit('turn start', {
      extraMove: playerMove.extraMove,
      isGameOver: playerMove.isGameOver,
      capturedEnemy: playerMove.capturedEnemy,
      isKing: playerMove.isKing,
      current_cell_label:
        alliedCheckerBoardCellIdsToEnemy_sMaping[playerMove.current_cell_label],
      target_cell_label:
        alliedCheckerBoardCellIdsToEnemy_sMaping[playerMove.target_cell_label],
      checker_number:
        alliedCheckerIdsToEnemy_sMapping[playerMove.checker_number],
      capturedEnemyCheckerCellLabel:
        alliedCheckerBoardCellIdsToEnemy_sMaping[
          playerMove.capturedEnemyCheckerCellLabel
        ],
    })
  })

  socket.on('pass back move', () => {
    console.log('move again')
    socket.broadcast.emit('move again')
  })
})

app.use(express.static('./public'))

app.get('/', (req, res) => {
  res.end('expected')
})
httpServer.listen(8080)
