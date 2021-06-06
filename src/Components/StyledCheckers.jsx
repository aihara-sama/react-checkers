import styled from 'styled-components'

const StyledCheckers = styled.div`
  max-width: 521px;
  margin: 50px auto;

  .inner-checkers {
    padding: 0.8rem;
    border-radius: 25px;
    position: relative;
    box-shadow: 0 0 20px 20px #6e6e6e;
    background: #00000057;

    .row {
      display: flex;

      &:first-child {
        .cell:first-child {
          border-top-left-radius: 15px;
        }
        .cell:nth-child(8) {
          border-top-right-radius: 15px;
        }
      }
      &:last-child {
        .cell:first-child {
          border-bottom-left-radius: 15px;
        }
        .cell:nth-child(8) {
          border-bottom-right-radius: 15px;
        }
      }

      &:nth-child(odd) {
        .cell:nth-child(odd) {
          background-color: #785006;
        }
        .cell:nth-child(even) {
          background-color: #032d3c;
        }
      }
      &:nth-child(even) {
        .cell:nth-child(even) {
          background-color: #785006;
        }
        .cell:nth-child(odd) {
          background-color: #032d3c;
        }
      }

      .cell {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        .can-move {
          width: 8% !important;
          height: 8% !important;
          box-shadow: 0 0 9px 6px #707070;
        }

        .checker {
          border-radius: 50%;
          width: calc(8% + 4px);
          height: calc(8% + 4px);
          position: absolute;
          z-index: 1;

          &-allied {
            background: ${({ youMoveFirst }) =>
              youMoveFirst ? '#0f0b0beb' : '#8d1010'};

            &-king {
              &::before {
                content: '♚';
                color: ${({ youMoveFirst }) => youMoveFirst && '#908c82'};

                font-size: 1.9rem;
                top: calc(50% - 0.1rem);
                left: calc(50% + 0.05rem);
                position: absolute;
                transform: translate(-50%, -50%);
              }
            }

            &-active {
              box-shadow: 0 0 9px 6px #c7b9b9 !important;
            }
          }
          &-enemy {
            background: ${({ youMoveFirst }) =>
              youMoveFirst ? '#8d1010' : '#0f0b0beb'};

            &-king {
              &::before {
                content: '♚';
                color: ${({ youMoveFirst }) => youMoveFirst || '#908c82'};
                font-size: 1.9rem;
                top: calc(50% - 0.1rem);
                left: calc(50% + 0.05rem);
                position: absolute;
                transform: translate(-50%, -50%);
              }
            }
          }
          &-shadow {
            box-shadow: inset 0 0 17px 0px #fafeff;
            cursor: pointer;
            z-index: 0;
            visibility: hidden;

            &-active {
              visibility: visible;
            }
          }
        }
      }
    }
  }
`
export default StyledCheckers
