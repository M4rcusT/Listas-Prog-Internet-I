document.addEventListener('DOMContentLoaded', () => {
    const airplane = document.getElementById('airplane');
    const markers = document.querySelectorAll('.marker');
    const guessInput = document.getElementById('guess-input');
    const submitButton = document.getElementById('submit-button');
    const resetButton = document.getElementById('reset-button');
    const feedback = document.getElementById('feedback');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeValue = document.getElementById('volume-value');
    const rulesButton = document.getElementById('rules-button');
    const closeRulesButton = document.getElementById('close-rules');
    const rulesPopup = document.getElementById('rules-popup');
    const overlay = document.getElementById('overlay');

    let currentMarker = 0;
    let randomNumber = generateRandomNumber();
    let attempts = 7; // Tentativas iniciais
    let volume = 10; // Volume inicial

    function generateRandomNumber() {
        return Math.floor(Math.random() * 50) + 1;
    }

    function moveAirplane() {
        if (currentMarker < markers.length) {
            const marker = markers[currentMarker];
            const markerRect = marker.getBoundingClientRect();
            const gameContainerRect = document.getElementById('game-container').getBoundingClientRect();
            airplane.style.left = `${markerRect.left - gameContainerRect.left}px`;

            updateCurrentMarker();

            if (currentMarker === markers.length - 1) {
                setTimeout(() => {
                    feedback.textContent = "Parabéns! Você completou o jogo.";
                    submitButton.disabled = true;
                    guessInput.disabled = true;
                }, 500);
            }
        }
    }

    function updateAttempts() {
        document.getElementById('attempts-box').textContent = `Tentativas Restantes: ${attempts}`;
    }

    function updateCurrentMarker() {
        document.getElementById('current-marker-box').textContent = `Marcação: ${currentMarker + 1}`;
    }

    function updateVolume() {
        volumeSlider.value = volume;
        volumeValue.textContent = volume;
    }

    function handleGuess() {
        const guess = parseInt(guessInput.value, 10);

        if (isNaN(guess)) {
            feedback.textContent = "Por favor, insira um número válido.";
            return;
        }

        if (guess > 50) {
            feedback.textContent = "O número máximo permitido é 50. Tente novamente.";
            return;
        }

        if (currentMarker === markers.length - 1) {
            feedback.textContent = "Parabéns! Você completou o jogo.";
            submitButton.disabled = true;
            guessInput.disabled = true;
            return;
        }

        if (guess === randomNumber) {
            feedback.textContent = "Você acertou!";
            volume += 10;
            updateVolume();
            currentMarker++;
            if (currentMarker < markers.length) { 
                randomNumber = generateRandomNumber();
                attempts = 7; 
                updateAttempts();
                updateCurrentMarker();
                moveAirplane();
            } else {
                moveAirplane(); 
            }
        } else {
            attempts--;
            updateAttempts();
            if (attempts > 0) {
                feedback.textContent = guess > randomNumber ? "Muito alto!" : "Muito baixo!";
            } else {
                if (currentMarker === 0) {
                    feedback.textContent = "Você perdeu! O jogo acabou.";
                    submitButton.disabled = true;
                    guessInput.disabled = true;
                } else {
                    currentMarker--; // Volta uma posição
                    volume -= 10; // Diminui o volume em 10
                    feedback.textContent = "Você errou todas as tentativas! O avião voltou uma posição e o volume diminuiu.";
                    randomNumber = generateRandomNumber();
                    attempts = 7;
                    updateAttempts();
                    updateCurrentMarker();
                    updateVolume(); // Atualiza o volume na barra de som
                    moveAirplane();
                }
            }
        }

        guessInput.value = '';
    }

    function resetGame() {
        currentMarker = 0;
        randomNumber = generateRandomNumber();
        attempts = 7;
        volume = 10;

        feedback.textContent = "Faça uma tentativa!";
        submitButton.disabled = false;
        guessInput.disabled = false;

        updateAttempts();
        updateCurrentMarker();
        updateVolume();

        moveAirplane();
    }

    function showRules() {
        overlay.style.display = 'block';
        rulesPopup.style.display = 'block';
    }

    function closeRules() {
        overlay.style.display = 'none';
        rulesPopup.style.display = 'none';
    }

    submitButton.addEventListener('click', handleGuess);

    guessInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            handleGuess(); 
        }
    });

    resetButton.addEventListener('click', resetGame);

    rulesButton.addEventListener('click', showRules);
    closeRulesButton.addEventListener('click', closeRules);

    updateVolume();
    updateAttempts(); 
    moveAirplane();
});
