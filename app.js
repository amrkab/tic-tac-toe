function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push('');
      }
    }

    const getBoard = () => board;

    const printBoard = () => {
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);
    };

    return {
        board,
        printBoard
    };

};

function gameController(
    PlayerOneName = 'Player One',
    PlayerTwoName = 'Player Two'
) {

    const board = GameBoard();

    const players = [
        {
            name: PlayerOneName,
            token: 'X'
        },
        {
            name: PlayerTwoName,
            token: 'O'
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => { // to switch current player
        activePlayer = activePlayer === players[0] ? players[1] : players[0]; 
    };

    const count = 9;
    runGame: for (let i = 1; i <= count; i++) {

        board.printBoard();
        console.log(`${activePlayer.name}'s turn`)

        let row = prompt('which row?')-1;
        let selectedRow = board.board[row];
        let column = prompt('which column?')-1;
        
        if(selectedRow[column] === 'X' || selectedRow[column] === 'O') {
            console.log('already taken')
            i -= 1;
            continue runGame;
        }
        
        selectedRow[column] = activePlayer.token;
        board.board[row] = selectedRow;

        for ( let j=0; j<=2; j++) {
            let rowSelector = board.board[j];
            if (board.board[j][0] === 'X' && board.board[j][1] === 'X' && board.board[j][2] === 'X' || 
                board.board[j][0] === 'O' && board.board[j][1] === 'O' && board.board[j][2] === 'O' ||
                board.board[0][j] === 'X' && board.board[1][j] === 'X' && board.board[2][j] === 'X' ||
                board.board[0][j] === 'O' && board.board[1][j] === 'O' && board.board[2][j] === 'O' ||
                (board.board[0][0] === 'X' || board.board[0][2] === 'X') && board.board[1][1] === 'X' && (board.board[2][2] === 'X'|| board.board[2][0] === 'X') ||
                (board.board[0][0] === 'O' || board.board[0][2] === 'O') && board.board[1][1] === 'O' && (board.board[2][2] === 'O'|| board.board[2][0] === 'O')) {
                console.log(`${activePlayer.name} is the Winner!`)
                board.printBoard();
                break runGame;
            }
        }

        if(i===count){
            console.log('ITS A TIE');
            break runGame;
        }

        switchPlayerTurn();


    }

};

gameController();