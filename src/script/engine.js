const state = {
    view: {
      squares: document.querySelectorAll(".square"),
      enemy: document.querySelector(".enemy"),
      timeLeft: document.querySelector("#time-left"),
      score: document.querySelector("#score"),
    },
    values: {
      gameVelocity: 1000,
      hitPosition: 0,
      result: 0,
      curretTime: 30,
    },
    actions: {
      timerId: setInterval(randomSquare, 1000),
      countDownTimerId: setInterval(countDown, 1000),
    },
  };
  
  function countDown() {
    state.values.curretTime--;
  
    // Atualiza o tempo restante
    state.view.timeLeft.textContent = state.values.curretTime;
  
    // Ajusta a velocidade com base no tempo restante
    state.values.gameVelocity = 1000 - (30 - state.values.curretTime) * 90; // Ajuste o fator multiplicador a seu gosto
  
    if (state.values.curretTime <= 0) {
      clearInterval(state.actions.countDownTimerId);
      clearInterval(state.actions.timerId);
      gameOver();
    }
  }
  
  
  function gameOver() {
    const livesElement = document.querySelector(".menu-lives h2");
    let lives = parseInt(livesElement.textContent);
  
    if (lives > 1) {
      lives--;
      livesElement.textContent = lives; // Atualiza o número de vidas
    } else {
      livesElement.textContent = "0"; // Define o número de vidas como 0
  
      alert("Game Over! Seu resultado foi: " + state.values.result);
      restartGame();
    }
  }
  
  function gameOver() {
    alert("Game Over! O seu resultado foi: " + state.values.result);
  }
  
  
  function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
  }
  
  function randomSquare() {
    state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
    });
  
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
  }
  
  function addListenerHitBox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        if (square.classList.contains("enemy")) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound("hit");
        } else {
          // Clicou fora do inimigo, reduza as vidas
          decreaseLives();
        }
      });
    });
  }
  
  function decreaseLives() {
    const livesElement = document.querySelector(".menu-lives h2");
    let lives = parseInt(livesElement.textContent);
  
    if (lives > 0) {
      lives--;
      livesElement.textContent = lives; // Atualiza o número de vidas
    }
  
    if (lives === 0) {
      alert("Game Over! Seu resultado foi: " + state.values.result);
      restartGame();
    }
  }
  
  function restartGame() {
    // Zera o "Your Score"
    state.values.result = 0;
    state.view.score.textContent = state.values.result;
  
    // Reinicia o "Time Left" para 30 segundos
    state.values.curretTime = 30;
    state.view.timeLeft.textContent = state.values.curretTime;
  
    // Reinicia o "Menu Lives" para 3
    const livesElement = document.querySelector(".menu-lives h2");
    livesElement.textContent = "3";
  
    // Limpa as classes "enemy" dos quadrados
    state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
    });
    
  
    // Reinicia os timers
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    state.actions.timerId = setInterval(randomSquare, 1000);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
  }
  
  
  
  function initialize() {
    addListenerHitBox();
  }
  
  initialize();


