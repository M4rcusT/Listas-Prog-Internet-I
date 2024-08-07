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
        return Math.floor(Math.random() * 50) + 1; // Gera um número entre 1 e 50
    }

    function moveAirplane() {
        if (currentMarker < markers.length) { // Ajuste para mover até a última marcação
            const marker = markers[currentMarker];
            const markerRect = marker.getBoundingClientRect();
            const gameContainerRect = document.getElementById('game-container').getBoundingClientRect();
            airplane.style.left = `${markerRect.left - gameContainerRect.left}px`; // Ajuste da posição horizontal

            // Atualiza a caixa de marcação atual
            updateCurrentMarker();

            // Se chegamos na última marcação, não avançar mais
            if (currentMarker === markers.length - 1) {
                setTimeout(() => {
                    feedback.textContent = "Parabéns! Você completou o jogo.";
                    submitButton.disabled = true;
                    guessInput.disabled = true;
                }, 500); // Pequeno atraso para o avião alcançar a última marcação
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
            volume += 10; // Aumenta o volume em 10
            updateVolume(); // Atualiza o slider e o texto
            currentMarker++;
            if (currentMarker < markers.length) { // Continua até a última marcação
                randomNumber = generateRandomNumber();
                attempts = 7; // Resetando tentativas para 7
                updateAttempts();
                updateCurrentMarker();
                moveAirplane();
            } else {
                moveAirplane(); // Move o avião até a última marcação
            }
        } else {
            attempts--;
            updateAttempts();
            if (attempts > 0) {
                feedback.textContent = guess > randomNumber ? "Muito alto!" : "Muito baixo!";
            } else {
                feedback.textContent = "Você perdeu! O jogo acabou.";
                submitButton.disabled = true;
                guessInput.disabled = true;
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
            event.preventDefault(); // Impede o comportamento padrão do Enter
            handleGuess(); // Chama a função de envio
        }
    });

    resetButton.addEventListener('click', resetGame);

    rulesButton.addEventListener('click', showRules);
    closeRulesButton.addEventListener('click', closeRules);

    // Inicializa o slider e o valor exibido
    updateVolume(); // Define o volume inicial
    updateAttempts(); // Define as tentativas restantes iniciais
    moveAirplane();
});
