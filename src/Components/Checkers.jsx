// left - red
// right - dark

import React from 'react'
import StyledCheckers from './StyledCheckers'

class Checkers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // Where key = cell label and value = cell's properties. For example: Cell 1-1 is inhebited by checker number 1 and is of kind "enemy"
      checkersBoard: {
        '1-2': {
          kind: 'enemy',
          isKing: false,
          checker_number: 1,
          occupied: true,
        },
        '1-4': {
          kind: 'enemy',
          isKing: false,
          checker_number: 2,
          occupied: true,
        },
        '1-6': {
          kind: 'enemy',
          isKing: false,
          checker_number: 3,
          occupied: true,
        },
        '1-8': {
          isKing: false,
          kind: 'enemy',
          checker_number: 4,
          occupied: true,
        },
        '2-1': {
          kind: 'enemy',
          isKing: false,
          checker_number: 5,
          occupied: true,
        },
        '2-3': {
          kind: 'enemy',
          isKing: false,
          checker_number: 6,
          occupied: true,
        },
        '2-5': {
          kind: 'enemy',
          isKing: false,
          checker_number: 7,
          occupied: true,
        },
        '2-7': {
          kind: 'enemy',
          isKing: false,
          checker_number: 8,
          occupied: true,
        },
        '3-2': {
          kind: 'enemy',
          isKing: false,
          checker_number: 9,
          occupied: true,
        },
        '3-4': {
          kind: 'enemy',
          isKing: false,
          checker_number: 10,
          occupied: true,
        },
        '3-6': {
          kind: 'enemy',
          isKing: false,
          checker_number: 11,
          occupied: true,
        },
        '3-8': {
          isKing: false,
          kind: 'enemy',
          checker_number: 12,
          occupied: true,
        },
        '4-1': { occupied: false },
        '4-3': { occupied: false },
        '4-5': { occupied: false },
        '4-7': { occupied: false },
        '5-2': { occupied: false },
        '5-4': { occupied: false },
        '5-6': { occupied: false },
        '5-8': { occupied: false },
        '6-1': {
          checker_number: 13,
          canMove: true,
          isKing: false,
          kind: 'allied',
          occupied: true,
        },
        '6-3': {
          checker_number: 14,
          canMove: true,
          isKing: false,
          kind: 'allied',
          occupied: true,
        },
        '6-5': {
          checker_number: 15,
          canMove: true,
          isKing: false,
          kind: 'allied',
          occupied: true,
        },
        '6-7': {
          checker_number: 16,
          canMove: true,
          isKing: false,
          kind: 'allied',
          occupied: true,
        },
        '7-2': {
          kind: 'allied',
          canMove: false,
          isKing: false,
          checker_number: 17,
          occupied: true,
        },
        '7-4': {
          kind: 'allied',
          canMove: false,
          isKing: false,
          checker_number: 18,
          occupied: true,
        },
        '7-6': {
          kind: 'allied',
          canMove: false,
          checker_number: 19,
          isKing: false,
          occupied: true,
        },
        '7-8': {
          kind: 'allied',
          canMove: false,
          checker_number: 20,
          isKing: false,
          occupied: true,
        },
        '8-1': {
          kind: 'allied',
          canMove: false,
          isKing: false,
          checker_number: 21,
          occupied: true,
        },
        '8-3': {
          kind: 'allied',
          canMove: false,
          checker_number: 22,
          isKing: false,
          occupied: true,
        },
        '8-5': {
          kind: 'allied',
          canMove: false,
          checker_number: 23,
          isKing: false,
          occupied: true,
        },
        '8-7': {
          kind: 'allied',
          canMove: false,
          checker_number: 24,
          isKing: false,
          occupied: true,
        },
      },
      unoccupied_cells_labels: [],
      active_allied_checker_number: null,
      captured_checkers: {
        allied: [],
        enemy: [],
      },
      isGameOver: false,
      yourTurn: this.props.youMoveFirst,
    }
    this.allieCheckerClickHandler = this.alliedCheckerClickHandler.bind(this)
    // Highlighted allowed moves
    this.shadowCheckerClickHandler = this.shadowCheckerClickHandler.bind(this)
    this.getCellByCheckerNumber = this.getCellByCheckerNumber.bind(this)
  }

  turnStart() {
    const number_of_turns = this.enableAlliedCheckers()
    if (number_of_turns === 0) {
      this.props.setGameOver('enemy')
    } else {
      this.setState({
        yourTurn: true,
      })
    }
  }

  AITurn() {
    setTimeout(cb.bind(this), 1000)

    function cb() {
      let moves = []

      for (let cell_label in this.state.checkersBoard) {
        if (this.state.checkersBoard[cell_label].kind === 'enemy') {
          const cell_labels = this.getCaptureAIMoves(
            cell_label,
            this.state.checkersBoard[cell_label].checker_number,
          )

          if (cell_labels.length) {
            const move = {
              cell_labels,
              checker_number: this.state.checkersBoard[cell_label]
                .checker_number,
            }
            moves.push(move)
          }
        }
      }

      if (!moves.length) {
        for (let cell_label in this.state.checkersBoard) {
          if (this.state.checkersBoard[cell_label].kind === 'enemy') {
            const cell_labels = this.getAIMoves(
              cell_label,
              this.state.checkersBoard[cell_label].checker_number,
            )

            if (cell_labels.length) {
              const move = {
                cell_labels,
                checker_number: this.state.checkersBoard[cell_label]
                  .checker_number,
              }
              moves.push(move)
            }
          }
        }
      }

      if (!moves.length) {
        this.props.setGameOver('allied')
        return
      }

      // moves = this.removeDuplicateElements(moves)

      const random_checker = Math.floor(Math.random() * moves.length)
      const random_cell_label = Math.floor(
        Math.random() * moves[random_checker].cell_labels.length,
      )
      console.log({
        random_cell_label,
        random_checker,
        moves,
      })

      const beaten_cell = this.getCapturedEnemyCheckerCellLabel(
        moves[random_checker].cell_labels[random_cell_label],
        this.getCellLabelByCheckerNumber(moves[random_checker].checker_number),
      )

      const newState = {
        checkersBoard: {
          ...this.state.checkersBoard,
          [moves[random_checker].cell_labels[random_cell_label]]: {
            ...this.state.checkersBoard[
              this.getCellLabelByCheckerNumber(
                moves[random_checker].checker_number,
              )
            ],
          },
          [this.getCellLabelByCheckerNumber(
            moves[random_checker].checker_number,
          )]: {
            occupied: false,
          },
        },
      }

      if (moves[random_checker].cell_labels[random_cell_label][0] == '8') {
        newState.checkersBoard[
          moves[random_checker].cell_labels[random_cell_label]
        ].isKing = true
      }

      if (beaten_cell) {
        newState.checkersBoard[beaten_cell] = {
          occupied: false,
        }
      }

      this.setState(newState, () => {
        // console.log(this.state)
        // if(beaten_cell &&)
        // if(beaten_cell && )
        if (
          beaten_cell &&
          this.getCaptureAIMoves(
            moves[random_checker].cell_labels[random_cell_label],
            this.state.checkersBoard[
              moves[random_checker].cell_labels[random_cell_label]
            ].checker_number,
          ).length
        ) {
          this.AITurn()
        } else {
          this.turnStart()
        }
      })
    }

    // console.log({
    //   AIMoves: moves,
    //   random_checker,
    // })
  }

  dissableAlliedCheckers(extraMove) {
    const newState = {
      checkersBoard: {
        ...this.state.checkersBoard,
      },
    }

    for (let cell_label in newState.checkersBoard) {
      if (newState.checkersBoard[cell_label].kind === 'allied') {
        if (!extraMove) {
          newState.checkersBoard[cell_label].canMove = false
        } else {
          if (
            newState.checkersBoard[cell_label].checker_number !=
            this.state.active_allied_checker_number
          ) {
            newState.checkersBoard[cell_label].canMove = false
          }
        }
      }
    }

    this.setState(newState)
  }

  turnEnd(playerMove, extraMove, target_cell_label) {
    this.dissableAlliedCheckers(extraMove)
    this.setState({
      yourTurn: extraMove,
      unoccupied_cells_labels: extraMove
        ? this.getCaptureMoves(
            target_cell_label,
            this.state.active_allied_checker_number,
          )
        : [],
      active_allied_checker_number: extraMove
        ? this.state.active_allied_checker_number
        : null,
    })
    if (this.props.playWithAI) {
      if (!extraMove) {
        this.AITurn()
      }
    } else {
      this.props.io.emit('turn end', playerMove)
    }
  }

  removeDuplicateElements(arr) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
      if (!newArr.includes(arr[i])) {
        newArr.push(arr[i])
      }
    }
    return newArr
  }

  enableAlliedCheckers() {
    let isThereACaptureMove = false
    let number_of_moves = 0
    const newState = {
      checkersBoard: {
        ...this.state.checkersBoard,
      },
    }
    // capture checkers
    for (let cell_label in newState.checkersBoard) {
      if (newState.checkersBoard[cell_label].kind === 'allied') {
        // cell_labels
        const moves = this.getCaptureMoves(
          cell_label,
          newState.checkersBoard[cell_label].checker_number,
        )
        if (moves.length !== 0) {
          number_of_moves++
          newState.checkersBoard[cell_label].canMove = true
          isThereACaptureMove = true
        }
      }
    }

    // rest checkers
    if (!isThereACaptureMove) {
      for (let cell_label in newState.checkersBoard) {
        if (newState.checkersBoard[cell_label].kind === 'allied') {
          // cell_labels
          const moves = this.getMoves(
            cell_label,
            newState.checkersBoard[cell_label].checker_number,
          )
          if (moves.length !== 0) {
            number_of_moves++
            newState.checkersBoard[cell_label].canMove = true
          }
        }
      }
    }

    this.setState(newState)
    return number_of_moves
  }

  componentDidMount() {
    if (this.props.playWithAI) {
    } else {
      this.props.io.on('turn start', (playerMove) => {
        const newState = {
          ...this.state,
          checkersBoard: {
            ...this.state.checkersBoard,
            [playerMove.target_cell_label]: {
              ...this.state.checkersBoard[playerMove.current_cell_label],
            },
            [playerMove.current_cell_label]: {
              occupied: false,
            },
          },
        }
        if (playerMove.capturedEnemyCheckerCellLabel) {
          // if (this.state.number_of_captured_checkers.allied === 11) {
          //   this.props.setGameOver('enemy')
          //   newState.isGameOver = true
          // }

          // remove captured checker
          newState.checkersBoard[playerMove.capturedEnemyCheckerCellLabel] = {
            occupied: false,
          }
        }
        if (playerMove.isKing) {
          newState.checkersBoard[playerMove.target_cell_label].isKing =
            playerMove.isKing
        }
        if (playerMove.capturedEnemy) {
          newState.captured_checkers.allied.push({
            isKing: playerMove.isKing ? true : false,
          })
        }
        this.setState(
          (state) => newState,
          () => {
            // this.turnStart()

            if (playerMove.extraMove) {
              this.props.io.emit('pass back move')
              // this.setState({
              //   yourTurn: false,
              // })
            } else {
              this.turnStart()
            }
          },
        )
      })

      this.props.io.on('move again', () => {
        this.turnStart()
      })
    }
  }

  getCellByCheckerNumber(checker_number) {
    for (let cell_label in this.state.checkersBoard) {
      if (
        this.state.checkersBoard[cell_label].checker_number === checker_number
      ) {
        return this.state.checkersBoard[cell_label]
      }
    }
    throw "There is no cell with checker number '" + checker_number + "'"
  }

  isCellOccupied(cell_label) {
    return this.state.checkersBoard[cell_label].occupied
  }

  doesCellExist(cell_label) {
    return this.state.checkersBoard[cell_label] ? true : false
  }

  getMoves(current_cell_label, checker_number) {
    const [row, cell] = current_cell_label.split('-').map((el) => +el)

    const moves = []

    const TOP_LEFT_CELL_LABEL = `${row - 1}-${cell - 1}`
    const TOP_RIGHT_CELL_LABEL = `${row - 1}-${cell + 1}`

    if (this.doesCellExist(TOP_LEFT_CELL_LABEL)) {
      if (!this.isCellOccupied(TOP_LEFT_CELL_LABEL)) {
        moves.push(TOP_LEFT_CELL_LABEL)
      }
    }
    if (this.doesCellExist(TOP_RIGHT_CELL_LABEL)) {
      if (!this.isCellOccupied(TOP_RIGHT_CELL_LABEL)) {
        moves.push(TOP_RIGHT_CELL_LABEL)
      }
    }

    if (this.getCellByCheckerNumber(checker_number).isKing) {
      const BOTTOM_LEFT_CELL_LABEL = `${row + 1}-${cell - 1}`
      const BOTTOM_RIGHT_CELL_LABEL = `${row + 1}-${cell + 1}`

      if (this.doesCellExist(BOTTOM_LEFT_CELL_LABEL)) {
        if (!this.isCellOccupied(BOTTOM_LEFT_CELL_LABEL)) {
          moves.push(BOTTOM_LEFT_CELL_LABEL)
        }
      }
      if (this.doesCellExist(BOTTOM_RIGHT_CELL_LABEL)) {
        if (!this.isCellOccupied(BOTTOM_RIGHT_CELL_LABEL)) {
          moves.push(BOTTOM_RIGHT_CELL_LABEL)
        }
      }
    }

    return moves
  }
  getAIMoves(current_cell_label, checker_number) {
    const [row, cell] = current_cell_label.split('-').map((el) => +el)

    const moves = []

    const TOP_LEFT_CELL_LABEL = `${row + 1}-${cell - 1}`
    const TOP_RIGHT_CELL_LABEL = `${row + 1}-${cell + 1}`

    if (this.doesCellExist(TOP_LEFT_CELL_LABEL)) {
      if (!this.isCellOccupied(TOP_LEFT_CELL_LABEL)) {
        moves.push(TOP_LEFT_CELL_LABEL)
      }
    }
    if (this.doesCellExist(TOP_RIGHT_CELL_LABEL)) {
      if (!this.isCellOccupied(TOP_RIGHT_CELL_LABEL)) {
        moves.push(TOP_RIGHT_CELL_LABEL)
      }
    }

    if (this.getCellByCheckerNumber(checker_number).isKing) {
      const BOTTOM_LEFT_CELL_LABEL = `${row - 1}-${cell - 1}`
      const BOTTOM_RIGHT_CELL_LABEL = `${row - 1}-${cell + 1}`

      if (this.doesCellExist(BOTTOM_LEFT_CELL_LABEL)) {
        if (!this.isCellOccupied(BOTTOM_LEFT_CELL_LABEL)) {
          moves.push(BOTTOM_LEFT_CELL_LABEL)
        }
      }
      if (this.doesCellExist(BOTTOM_RIGHT_CELL_LABEL)) {
        if (!this.isCellOccupied(BOTTOM_RIGHT_CELL_LABEL)) {
          moves.push(BOTTOM_RIGHT_CELL_LABEL)
        }
      }
    }

    return moves
  }

  getCaptureMoves(current_cell_label, checker_number, isKing) {
    const [row, cell] = current_cell_label.split('-').map((el) => +el)

    const capture_moves = []

    const TOP_LEFT_CELL_LABEL = `${row - 1}-${cell - 1}`
    const TOP_RIGHT_CELL_LABEL = `${row - 1}-${cell + 1}`

    if (this.doesCellExist(TOP_LEFT_CELL_LABEL)) {
      if (this.isCellOccupied(TOP_LEFT_CELL_LABEL)) {
        const TOPER_LEFT_CELL_LABEL = `${row - 2}-${cell - 2}`

        if (
          this.state.checkersBoard[TOP_LEFT_CELL_LABEL].kind === 'enemy' &&
          this.doesCellExist(TOPER_LEFT_CELL_LABEL) &&
          !this.isCellOccupied(TOPER_LEFT_CELL_LABEL)
        ) {
          capture_moves.push(TOPER_LEFT_CELL_LABEL)
        }
      }
    }
    if (this.doesCellExist(TOP_RIGHT_CELL_LABEL)) {
      if (this.isCellOccupied(TOP_RIGHT_CELL_LABEL)) {
        const TOPER_RIGHT_CELL_LABEL = `${row - 2}-${cell + 2}`

        if (
          this.state.checkersBoard[TOP_RIGHT_CELL_LABEL].kind === 'enemy' &&
          this.doesCellExist(TOPER_RIGHT_CELL_LABEL) &&
          !this.isCellOccupied(TOPER_RIGHT_CELL_LABEL)
        ) {
          capture_moves.push(TOPER_RIGHT_CELL_LABEL)
        }
      }
    }

    if (this.getCellByCheckerNumber(checker_number).isKing || isKing) {
      const BOTTOM_LEFT_CELL_LABEL = `${row + 1}-${cell - 1}`
      const BOTTOM_RIGHT_CELL_LABEL = `${row + 1}-${cell + 1}`

      if (this.doesCellExist(BOTTOM_LEFT_CELL_LABEL)) {
        if (this.isCellOccupied(BOTTOM_LEFT_CELL_LABEL)) {
          const BOTTOMER_LEFT_CELL_LABEL = `${row + 2}-${cell - 2}`

          if (
            this.state.checkersBoard[BOTTOM_LEFT_CELL_LABEL].kind === 'enemy' &&
            this.doesCellExist(BOTTOMER_LEFT_CELL_LABEL) &&
            !this.isCellOccupied(BOTTOMER_LEFT_CELL_LABEL)
          ) {
            capture_moves.push(BOTTOMER_LEFT_CELL_LABEL)
          }
        }
      }

      if (this.doesCellExist(BOTTOM_RIGHT_CELL_LABEL)) {
        if (this.isCellOccupied(BOTTOM_RIGHT_CELL_LABEL)) {
          const BOTTOMER_RIGHT_CELL_LABEL = `${row + 2}-${cell + 2}`

          if (
            this.state.checkersBoard[BOTTOM_RIGHT_CELL_LABEL].kind ===
              'enemy' &&
            this.doesCellExist(BOTTOMER_RIGHT_CELL_LABEL) &&
            !this.isCellOccupied(BOTTOMER_RIGHT_CELL_LABEL)
          ) {
            capture_moves.push(BOTTOMER_RIGHT_CELL_LABEL)
          }
        }
      }
    }

    return capture_moves
  }
  getCaptureAIMoves(current_cell_label, checker_number, isKing) {
    const [row, cell] = current_cell_label.split('-').map((el) => +el)

    const capture_moves = []

    const TOP_LEFT_CELL_LABEL = `${row + 1}-${cell - 1}`
    const TOP_RIGHT_CELL_LABEL = `${row + 1}-${cell + 1}`

    if (this.doesCellExist(TOP_LEFT_CELL_LABEL)) {
      if (this.isCellOccupied(TOP_LEFT_CELL_LABEL)) {
        const TOPER_LEFT_CELL_LABEL = `${row + 2}-${cell - 2}`

        if (
          this.state.checkersBoard[TOP_LEFT_CELL_LABEL].kind === 'allied' &&
          this.doesCellExist(TOPER_LEFT_CELL_LABEL) &&
          !this.isCellOccupied(TOPER_LEFT_CELL_LABEL)
        ) {
          capture_moves.push(TOPER_LEFT_CELL_LABEL)
        }
      }
    }
    if (this.doesCellExist(TOP_RIGHT_CELL_LABEL)) {
      if (this.isCellOccupied(TOP_RIGHT_CELL_LABEL)) {
        const TOPER_RIGHT_CELL_LABEL = `${row + 2}-${cell + 2}`

        if (
          this.state.checkersBoard[TOP_RIGHT_CELL_LABEL].kind === 'allied' &&
          this.doesCellExist(TOPER_RIGHT_CELL_LABEL) &&
          !this.isCellOccupied(TOPER_RIGHT_CELL_LABEL)
        ) {
          capture_moves.push(TOPER_RIGHT_CELL_LABEL)
        }
      }
    }

    if (this.getCellByCheckerNumber(checker_number).isKing || isKing) {
      const BOTTOM_LEFT_CELL_LABEL = `${row - 1}-${cell - 1}`
      const BOTTOM_RIGHT_CELL_LABEL = `${row - 1}-${cell + 1}`

      if (this.doesCellExist(BOTTOM_LEFT_CELL_LABEL)) {
        if (this.isCellOccupied(BOTTOM_LEFT_CELL_LABEL)) {
          const BOTTOMER_LEFT_CELL_LABEL = `${row - 2}-${cell - 2}`

          if (
            this.state.checkersBoard[BOTTOM_LEFT_CELL_LABEL].kind ===
              'allied' &&
            this.doesCellExist(BOTTOMER_LEFT_CELL_LABEL) &&
            !this.isCellOccupied(BOTTOMER_LEFT_CELL_LABEL)
          ) {
            capture_moves.push(BOTTOMER_LEFT_CELL_LABEL)
          }
        }
      }

      if (this.doesCellExist(BOTTOM_RIGHT_CELL_LABEL)) {
        if (this.isCellOccupied(BOTTOM_RIGHT_CELL_LABEL)) {
          const BOTTOMER_RIGHT_CELL_LABEL = `${row - 2}-${cell + 2}`

          if (
            this.state.checkersBoard[BOTTOM_RIGHT_CELL_LABEL].kind ===
              'allied' &&
            this.doesCellExist(BOTTOMER_RIGHT_CELL_LABEL) &&
            !this.isCellOccupied(BOTTOMER_RIGHT_CELL_LABEL)
          ) {
            capture_moves.push(BOTTOMER_RIGHT_CELL_LABEL)
          }
        }
      }
    }

    return capture_moves
  }

  getCellLabelByCheckerNumber(checker_number) {
    for (let cell_label in this.state.checkersBoard) {
      if (
        this.state.checkersBoard[cell_label].checker_number === checker_number
      ) {
        return cell_label
      }
    }
    throw "There is no cell with checker number '" + checker_number + "'"
  }

  alliedCheckerClickHandler(e) {
    if (this.state.yourTurn) {
      const checker_number = +e.target.getAttribute('data-checker_number')
      const current_cell_label = this.getCellLabelByCheckerNumber(
        checker_number,
      )

      let moves = this.getCaptureMoves(current_cell_label, checker_number)

      if (moves.length === 0) {
        moves = this.getMoves(current_cell_label, checker_number)
      }

      this.setState({
        unoccupied_cells_labels: moves,
        active_allied_checker_number: checker_number,
      })
    }
  }

  getCapturedEnemyCheckerCellLabel(current_cell_label, target_cell_label) {
    // const [prevRow, prevCell] = prevCell.split('-').map(el => +el)
    const [row, cell] = target_cell_label.split('-').map((el) => +el)

    if (`${row + 2}-${cell - 2}` === current_cell_label) {
      return `${row + 1}-${cell - 1}`
    } else if (`${row + 2}-${cell + 2}` === current_cell_label) {
      return `${row + 1}-${cell + 1}`
    } else if (`${row - 2}-${cell - 2}` === current_cell_label) {
      return `${row - 1}-${cell - 1}`
    } else if (`${row - 2}-${cell + 2}` === current_cell_label) {
      return `${row - 1}-${cell + 1}`
    }
    return false
  }

  shadowCheckerClickHandler(e) {
    const target_cell_label = e.target.parentNode.getAttribute(
      'data-cell_label',
    )
    const current_cell_label = this.getCellLabelByCheckerNumber(
      this.state.active_allied_checker_number,
    )

    const capturedEnemyCheckerCellLabel = this.getCapturedEnemyCheckerCellLabel(
      current_cell_label,
      target_cell_label,
    )

    const newState = {
      ...this.state,
      checkersBoard: {
        ...this.state.checkersBoard,
        [target_cell_label]: {
          ...this.state.checkersBoard[current_cell_label],
        },
        [current_cell_label]: {
          occupied: false,
        },
      },
    }

    const playerMove = {
      checker_number: this.state.active_allied_checker_number,
      target_cell_label,
      current_cell_label,
    }

    let extraMove = false

    if (capturedEnemyCheckerCellLabel) {
      if (
        this.getCaptureMoves(
          target_cell_label,
          this.state.active_allied_checker_number,
        ).length
      ) {
        playerMove.extraMove = true
        extraMove = true
      }

      newState.checkersBoard[capturedEnemyCheckerCellLabel] = {
        occupied: false,
      }
      newState.captured_checkers.enemy.push({
        isKing: this.state.checkersBoard[capturedEnemyCheckerCellLabel].isKing,
      })
      playerMove.capturedEnemyCheckerCellLabel = capturedEnemyCheckerCellLabel
      playerMove.capturedEnemy = true
    }

    // king's row
    if (target_cell_label[0] === '1') {
      newState.checkersBoard[target_cell_label].isKing = true
      playerMove.isKing = true
      if (
        capturedEnemyCheckerCellLabel &&
        this.getCaptureMoves(
          target_cell_label,
          this.state.active_allied_checker_number,
          true,
        ).length
      ) {
        playerMove.extraMove = true
        extraMove = true
      }
    }
    this.setState(newState, () => {
      if (this.state.captured_checkers.enemy.length === 12) {
        this.props.setGameOver('allied')
      } else {
        this.turnEnd(playerMove, extraMove, target_cell_label)
      }
    })

    // check if i can capture more
  }

  render() {
    return (
      <>
        <button className="your-turn-btn">
          {this.state.yourTurn ? 'Ваш ход' : 'Ход противника'}
        </button>
        <StyledCheckers youMoveFirst={this.props.youMoveFirst}>
          <div className="inner-checkers">
            {new Array(8).fill(new Array(9).fill()).map((items, itemsIdx) => (
              <div className="row">
                {items.map((el, elIdx, elArr) => {
                  if (elIdx !== elArr.length - 1) {
                    const cell_label = `${itemsIdx + 1}-${elIdx + 1}`
                    const cell = this.state.checkersBoard[cell_label]
                    return (
                      // CELL
                      <div
                        className="cell"
                        data-cell_label={
                          (itemsIdx + elIdx) % 2 !== 0 ? cell_label : ''
                        }
                      >
                        {/* (ALLIED | ENEMY) CHECKER */}
                        {(itemsIdx + elIdx) % 2 !== 0 && cell && cell.occupied && (
                          <div
                            className={`checker checker-${cell.kind}${
                              cell.canMove && this.state.yourTurn
                                ? ' can-move'
                                : ''
                            }${
                              this.state.active_allied_checker_number ==
                              cell.checker_number
                                ? ' checker-allied-active'
                                : ''
                            }${
                              cell.isKing ? ` checker-${cell.kind}-king` : ''
                            }`}
                            data-checker_number={cell.checker_number}
                            onClick={(e) => {
                              if (
                                !e.target.classList.contains('checker-enemy') &&
                                cell.canMove
                              ) {
                                this.alliedCheckerClickHandler(e)
                              }
                            }}
                          ></div>
                        )}
                        {/* SHADOW CHECKER */}
                        {(itemsIdx + elIdx) % 2 !== 0 && (
                          <div
                            className={`checker checker-shadow${
                              this.state.unoccupied_cells_labels.includes(
                                cell_label,
                              )
                                ? ' checker-shadow-active'
                                : ''
                            }`}
                            onClick={this.shadowCheckerClickHandler}
                          ></div>
                        )}
                      </div>
                    )
                  }
                  return <div style={{ paddingTop: '12.5%' }}></div>
                })}
              </div>
            ))}
          </div>
        </StyledCheckers>
      </>
    )
  }
}

export default Checkers
