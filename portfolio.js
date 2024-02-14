// Get the modal element
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Arrays to store image URLs for each game
var game1Images = ["https://i.ibb.co/svQTR02/New-Project.png", "https://i.imgur.com/SwFWmYT.png", "https://i.ibb.co/3phbymd/retry-screen.png"];
var game2Images = ["https://i.ibb.co/V346X2L/image.png","https://i.ibb.co/88pgttG/image.png","https://i.ibb.co/XSC6YqY/image.png"];
var game3Images = ["https://i.ibb.co/0tht9FJ/New-Project-1.png"];

// Function to open modal and display game details and images
function openModal(button) {
  var gameDetails = button.parentNode;
  var title = gameDetails.querySelector(".game-info h2").innerText;
  var description = gameDetails.querySelector(".game-info p").innerText;
  var imageUrl = gameDetails.querySelector("img").src;
  
  // Set modal content with game details
  document.getElementById("gameTitle").innerText = title;
  document.getElementById("gameDescription").innerText = description;
  document.getElementById("gameImage").src = imageUrl;

  // Show the modal
  modal.style.display = "block";
}

// Function to close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Function to change image
var currentImageIndex = 0;
var currentGameImages = game1Images; // Set initial images to game 1 images

function changeImage(n) {
  currentImageIndex += n;
  if (currentImageIndex >= currentGameImages.length) {
    currentImageIndex = 0;
  } else if (currentImageIndex < 0) {
    currentImageIndex = currentGameImages.length - 1;
  }
  document.getElementById("gameImage").src = currentGameImages[currentImageIndex];
}

// Function to switch to game 1 images
function switchToGame1() {
  currentGameImages = game1Images;
  currentImageIndex = 0;
  document.getElementById("gameImage").src = currentGameImages[currentImageIndex];
}

// Function to switch to game 2 images
function switchToGame2() {
  currentGameImages = game2Images;
  currentImageIndex = 0;
  document.getElementById("gameImage").src = currentGameImages[currentImageIndex];
}
function switchToGame3() {
  currentGameImages = game3Images;
  currentImageIndex = 0;
  document.getElementById("gameImage").src = currentGameImages[currentImageIndex];
}
// Define constants for the game
    const ROWS = 6;
    const COLS = 7;
    const EMPTY = " ";
    const PLAYER1 = "red"; // Player 1 color: red
    const PLAYER2 = "yellow"; // Player 2 color: yellow

    let currentPlayer = PLAYER1; // Track the current player
    let board = []; // Initialize the game board

    // Initialize the game board and render it
    function initBoard() {
        for (let row = 0; row < ROWS; row++) {
            board[row] = [];
            for (let col = 0; col < COLS; col++) {
                board[row][col] = EMPTY;
            }
        }
        renderBoard();
    }

    // Render the game board
    function renderBoard() {
        const connectFourBoard = document.getElementById('connectFourBoard');
        connectFourBoard.innerHTML = '';
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                connectFourBoard.appendChild(cell);
            }
        }
        updateBoardUI();
    }

    // Update the UI based on the current state of the board
    function updateBoardUI() {
        const connectFourBoard = document.getElementById('connectFourBoard');
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const cell = connectFourBoard.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                cell.style.backgroundColor = board[row][col];
            }
        }
    }

    // Handle a player's move
    function handleMove(event) {
        if (currentPlayer === PLAYER1) {
            const clickedCell = event.target;
            const clickedCol = parseInt(clickedCell.dataset.col);

            // Human move
            makeMove(clickedCol);

            // Switch to the next player
            currentPlayer = PLAYER2;

            // Check for a winner
            checkGameStatus();
        }
    }

    // Make a move for the AI
    function makeAIMove() {
        // AI move
        const aiMove = getAIMove();
        makeMove(aiMove);

        // Switch to the next player
        currentPlayer = PLAYER1;

        // Check for a winner
        checkGameStatus();
    }

    // Make a move
    function makeMove(col) {
        // Find the lowest empty row in the column
        let row = ROWS - 1;
        while (row >= 0 && board[row][col] !== EMPTY) {
            row--;
        }

        // Check if the column is full
        if (row < 0) {
            alert('Column is full!');
            return;
        }

        // Update the board and render
        board[row][col] = currentPlayer;
        updateBoardUI();
    }

    // Check if the board is full
    function isBoardFull() {
        for (let col = 0; col < COLS; col++) {
            if (board[0][col] === EMPTY) {
                return false;
            }
        }
        return true;
    }

    // Reset the game
    function resetGame() {
        initBoard();
        currentPlayer = PLAYER1;
    }

    // Check the game status (winner, draw, or continue playing)
    function checkGameStatus() {
        if (checkWinner()) {
            alert('Player ' + currentPlayer + ' wins!');
            resetGame();
        } else if (isBoardFull()) {
            alert('It\'s a draw!');
            resetGame();
        }
    }

    // Get a random valid move for the AI
    function getAIMove() {
        const validMoves = getValidMoves();
        const randomIndex = Math.floor(Math.random() * validMoves.length);
        return validMoves[randomIndex];
    }

    // Get valid moves (columns where a piece can be placed)
    function getValidMoves() {
        let validMoves = [];
        for (let col = 0; col < COLS; col++) {
            if (board[0][col] === EMPTY) {
                validMoves.push(col);
            }
        }
        return validMoves;
    }

    // Check if there's a winner
    function checkWinner(row, col, player) {
    // Check horizontally
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c <= COLS - 4; c++) {
            if (
                board[r][c] === currentPlayer &&
                board[r][c + 1] === currentPlayer &&
                board[r][c + 2] === currentPlayer &&
                board[r][c + 3] === currentPlayer
            ) {
                return true;
            }
        }
    }

    // Check vertically
    for (let r = 0; r <= ROWS - 4; r++) {
        for (let c = 0; c < COLS; c++) {
            if (
                board[r][c] === currentPlayer &&
                board[r + 1][c] === currentPlayer &&
                board[r + 2][c] === currentPlayer &&
                board[r + 3][c] === currentPlayer
            ) {
                return true;
            }
        }
    }

    // Check diagonally (from top-left to bottom-right)
    for (let r = 0; r <= ROWS - 4; r++) {
        for (let c = 0; c <= COLS - 4; c++) {
            if (
                board[r][c] === currentPlayer &&
                board[r + 1][c + 1] === currentPlayer &&
                board[r + 2][c + 2] === currentPlayer &&
                board[r + 3][c + 3] === currentPlayer
            ) {
                return true;
            }
        }
    }

    // Check diagonally (from top-right to bottom-left)
    for (let r = 0; r <= ROWS - 4; r++) {
        for (let c = 3; c < COLS; c++) {
            if (
                board[r][c] === currentPlayer &&
                board[r + 1][c - 1] === currentPlayer &&
                board[r + 2][c - 2] === currentPlayer &&
                board[r + 3][c - 3] === currentPlayer
            ) {
                return true;
            }
        }
    }

    return false;
}

    // Initialize the game
    initBoard();

    // Add event listener for column clicks
    const connectFourBoard = document.getElementById('connectFourBoard');
    connectFourBoard.addEventListener('click', function (event) {
        if (event.target.classList.contains('cell')) {
            handleMove(event);
            makeAIMove();
        }
    });

    // Add event listener for reset button
    const resetConnectFourBtn = document.getElementById('resetConnectFourBtn');
    resetConnectFourBtn.addEventListener('click', resetGame);
