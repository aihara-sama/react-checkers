import Checkers from './Components/Checkers'
import React from 'react'
import { io } from 'socket.io-client'
import img from './images/infinite-loading.svg'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isCheckersBoardVisible: false,
      isFindOpponentBtnVisible: true,
      socket: null,
      youMoveFirst: null,
      isLoading: false,
      winner: '',
      playWithAI: false,
    }
    this.findOpponentClickHandler = this.findOpponentClickHandler.bind(this)
    this.setGameOver = this.setGameOver.bind(this)
    this.playWithAI = this.playWithAI.bind(this)
  }

  setGameOver(winner) {
    this.setState({
      winner,
      isFindOpponentBtnVisible: true,
      isCheckersBoardVisible: false,
    })
  }

  findOpponentClickHandler() {
    if (!this.state.isLoading) {
      const socket = io('192.168.1.6:8080')
      socket.on('found opponent', (youMoveFirst) => {
        console.log({ youMoveFirst })
        this.setState({
          isCheckersBoardVisible: true,
          isFindOpponentBtnVisible: false,
          youMoveFirst,
        })
      })
      this.setState({
        socket,
        isLoading: true,
        // isFindOpponentBtnVisible: false,
      })
    }
  }

  playWithAI() {
    this.setState({
      playWithAI: true,
      youMoveFirst: 1,
      isCheckersBoardVisible: true,
      isFindOpponentBtnVisible: false,
    })
  }

  render() {
    return (
      <>
        <div className={this.state.isCheckersBoardVisible ? '' : 'flex-center'}>
          {this.state.winner}
          {!this.state.isCheckersBoardVisible ? (
            <>
              <button
                style={{ marginTop: '1.5rem', width: '15rem' }}
                className={`find-opponent-btn`}
                onClick={this.findOpponentClickHandler}
              >
                {this.state.isLoading ? <img src={img} /> : 'Найти Соперника'}
              </button>
              <button
                style={{ marginTop: '1.5rem', width: '15rem' }}
                className={`find-opponent-btn`}
                onClick={this.playWithAI}
              >
                {this.state.isLoading ? <img src={img} /> : 'Play with AI'}
              </button>
            </>
          ) : (
            <Checkers
              playWithAI={this.state.playWithAI}
              setGameOver={this.setGameOver}
              youMoveFirst={this.state.youMoveFirst}
              io={this.state.socket}
            />
          )}
        </div>
      </>
    )
  }
}

export default App
