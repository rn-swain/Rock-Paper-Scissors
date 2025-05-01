document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const choiceBtns = document.querySelectorAll('.choice-btn');
    const playerScoreEl = document.querySelector('.player .score');
    const computerScoreEl = document.querySelector('.computer .score');
    const playerChoiceEl = document.querySelector('.player-choice .choice-placeholder');
    const computerChoiceEl = document.querySelector('.computer-choice .choice-placeholder');
    const resultMessageEl = document.querySelector('.result-message p');
    const resetBtn = document.getElementById('reset-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalTitle = document.querySelector('.modal-title');
    const modalMessage = document.querySelector('.modal-message');
    const modalBtn = document.querySelector('.modal-btn');

    // Game state
    let playerScore = 0;
    let computerScore = 0;
    let gameOver = false;

    // Initialize game
    initGame();

    // Event listeners
    choiceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!gameOver) {
                const choice = btn.dataset.choice;
                playRound(choice);
            }
        });
    });

    resetBtn.addEventListener('click', resetGame);
    modalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        resetGame();
    });

    // Game functions
    function initGame() {
        playerScore = 0;
        computerScore = 0;
        gameOver = false;
        updateScores();
        resetChoices();
        resultMessageEl.textContent = 'Select your move to begin!';
        resultMessageEl.style.backgroundColor = '#fff5f5';
        resultMessageEl.style.color = '#2b2d42';
    }

    function playRound(playerChoice) {
        // Computer random choice
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        // Display choices
        displayChoices(playerChoice, computerChoice);

        // Determine winner
        const result = getRoundResult(playerChoice, computerChoice);

        // Update scores and display result
        updateGame(result, playerChoice, computerChoice);
    }

    function displayChoices(playerChoice, computerChoice) {
        // Clear previous icons and classes
        playerChoiceEl.innerHTML = '';
        computerChoiceEl.innerHTML = '';
        playerChoiceEl.classList.remove('winner-glow', 'winner-animation');
        computerChoiceEl.classList.remove('winner-glow', 'winner-animation');

        // Add player choice
        const playerIcon = document.createElement('i');
        playerIcon.className = getChoiceIcon(playerChoice);
        playerIcon.style.color = 'white';
        playerChoiceEl.appendChild(playerIcon);
        playerChoiceEl.style.background = getChoiceGradient(playerChoice);
        playerChoiceEl.style.border = 'none';

        // Add computer choice
        const computerIcon = document.createElement('i');
        computerIcon.className = getChoiceIcon(computerChoice);
        computerIcon.style.color = 'white';
        computerChoiceEl.appendChild(computerIcon);
        computerChoiceEl.style.background = getChoiceGradient(computerChoice);
        computerChoiceEl.style.border = 'none';
    }

    function getChoiceIcon(choice) {
        switch(choice) {
            case 'rock': return 'fas fa-hand-rock';
            case 'paper': return 'fas fa-hand-paper';
            case 'scissors': return 'fas fa-hand-scissors';
            default: return 'fas fa-question';
        }
    }

    function getChoiceGradient(choice) {
        switch(choice) {
            case 'rock': return 'linear-gradient(145deg, #ff6b6b, #ff4d4d)';
            case 'paper': return 'linear-gradient(145deg, #ff9e4d, #ff7b25)';
            case 'scissors': return 'linear-gradient(145deg, #ff4d6d, #e63946)';
            default: return '#adb5bd';
        }
    }

    function getRoundResult(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return 'draw';
        }

        if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return 'win';
        }

        return 'lose';
    }

    function updateGame(result, playerChoice, computerChoice) {
        // Highlight winning choice
        if (result === 'win') {
            playerChoiceEl.classList.add('winner-glow', 'winner-animation');
            playerScore++;
            showResultMessage(`You win! ${capitalize(playerChoice)} beats ${capitalize(computerChoice)}`, '#2a9d8f');
        } else if (result === 'lose') {
            computerChoiceEl.classList.add('winner-glow', 'winner-animation');
            computerScore++;
            showResultMessage(`You lose! ${capitalize(computerChoice)} beats ${capitalize(playerChoice)}`, '#e63946');
        } else {
            showResultMessage(`It's a draw! Both chose ${capitalize(playerChoice)}`, '#ff9f1c');
        }

        updateScores();
        checkGameOver();
    }

    function showResultMessage(message, color) {
        resultMessageEl.textContent = message;
        resultMessageEl.style.backgroundColor = color;
        resultMessageEl.style.color = 'white';
    }

    function updateScores() {
        playerScoreEl.textContent = playerScore;
        computerScoreEl.textContent = computerScore;
    }

    function checkGameOver() {
        if (playerScore >= 5 || computerScore >= 5) {
            gameOver = true;
            showGameOverModal();
        }
    }

    function showGameOverModal() {
        modalOverlay.classList.add('active');
        
        if (playerScore > computerScore) {
            modalTitle.textContent = 'You Won!';
            modalMessage.textContent = `Congratulations! You beat the computer ${playerScore}-${computerScore}`;
        } else {
            modalTitle.textContent = 'You Lost!';
            modalMessage.textContent = `Better luck next time! Computer won ${computerScore}-${playerScore}`;
        }
    }

    function resetChoices() {
        playerChoiceEl.innerHTML = '<i class="fas fa-question"></i>';
        computerChoiceEl.innerHTML = '<i class="fas fa-question"></i>';
        playerChoiceEl.style.background = 'var(--white)';
        computerChoiceEl.style.background = 'var(--white)';
        playerChoiceEl.style.border = '5px dashed var(--gray)';
        computerChoiceEl.style.border = '5px dashed var(--gray)';
        playerChoiceEl.classList.remove('winner-glow', 'winner-animation');
        computerChoiceEl.classList.remove('winner-glow', 'winner-animation');
    }

    function resetGame() {
        initGame();
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});