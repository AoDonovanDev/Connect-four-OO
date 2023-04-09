class Game {
    constructor(height, width){
        this.WIDTH = width;
        this.HEIGHT = height;
        this.currPlayer = player1;
        this.board = [];
        this.gameIsOver = false;
        document.querySelector('#resetBtn').addEventListener('click', this.reset);
        this.makeBoard();
        this.makeHtmlBoard();
    }
    makeBoard() {
        for (let y = 0; y < this.HEIGHT; y++) {
          this.board.push(Array.from({ length: this.WIDTH }));
          console.log(board);
        }
    }
    makeHtmlBoard() {
        const board = document.getElementById('board');
      
        // make column tops (clickable area for adding a piece to that column)
        const top = document.createElement('tr');
        top.setAttribute('id', 'column-top');
        top.addEventListener('click', this.handleClick.bind(this));
      
        for (let x = 0; x < this.WIDTH; x++) {
          const headCell = document.createElement('td');
          headCell.setAttribute('id', x);
          top.append(headCell);
        }
      
        board.append(top);
      
        // make main part of board
        for (let y = 0; y < this.HEIGHT; y++) {
          const row = document.createElement('tr');
      
          for (let x = 0; x < this.WIDTH; x++) {
            const cell = document.createElement('td');
            cell.setAttribute('id', `${y}-${x}`);
            row.append(cell);
          }
      
          board.append(row);
        }
      }
      findSpotForCol(x) {
        for (let y = this.HEIGHT - 1; y >= 0; y--) {
          if (!this.board[y][x]) {
            return y;
          }
        }
        return null;
      }
      handleClick(evt) {
        // get x from ID of clicked cell
        if(this.gameIsOver){
            return;
        }
        const x = +evt.target.id;
        // get next spot in column (if none, ignore click)
        const y = this.findSpotForCol(x);
        if (y === null) {
          return;
        }
        // place piece in board and add to HTML table
        this.board[y][x] = this.currPlayer.color;
        this.placeInTable(y, x);
        
        // check for win
        if (this.checkForWin()){
          return this.endGame(`The ${this.currPlayer.color} player won!`);
        }
        
        // check for tie
        if (this.board.every(row => row.every(cell => cell))) {
          return this.endGame('Tie!');
        }
          
        // switch players
        this.currPlayer = this.currPlayer === player1 ? player2 : player1;
      }
      placeInTable(y, x) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.style.backgroundColor = this.currPlayer.color;
        piece.style.top = -50 * (y + 2);
      
        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
      }
      checkForWin() {
        const bound_win = _win.bind(this);
        function _win(cells) {
          // Check four cells to see if they're all color of current player
          //  - cells: list of four (y, x) cells
          //  - returns true if all are legal coordinates & all match currPlayer
      
          return cells.every(
            ([y, x]) =>
              y >= 0 &&
              y < this.HEIGHT &&
              x >= 0 &&
              x < this.WIDTH &&
              this.board[y][x] === this.currPlayer.color
          );
        }
        for (let y = 0; y < this.HEIGHT; y++) {
          for (let x = 0; x < this.WIDTH; x++) {
            // get "check list" of 4 cells (starting here) for each of the different
            // ways to win
            const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
            // find winner (only checking each win-possibility as needed)
            if (bound_win(horiz) || bound_win(vert) || bound_win(diagDR) || bound_win(diagDL)) {
                this.gameIsOver = true;
                return true;
            }
          }
        }
      }
      endGame(msg) {
      alert(msg);
      }
      reset(){
        document.querySelector('#board').remove();
        const newBoard = document.createElement('table');
        newBoard.id = 'board';
        document.querySelector('#game').append(newBoard);
        this.gameIsOver = false;
        new Game(6, 7);
        player1.color = document.querySelector('#player1').value;
        player2.color = document.querySelector('#player2').value;
        if(player1.color === ''){
          player1.color = 'red';
        }
        if(player2.color === ''){
          player2.color = 'blue';
        }
      }
    
}
class Player{
    constructor(color){
        this.color = color;
    }
}
const player1 = new Player('red');
const player2 = new Player('blue')
const theGame = new Game(6, 7);
