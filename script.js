const mario = document.querySelector(".mario");
const cano = document.querySelector(".cano");
const nuvem = document.querySelector(".nuvem");
const fimDeJogo = document.querySelector(".fim-de-jogo");
const botaoReiniciar = document.querySelector(".reiniciar");
const pontos = document.querySelector(".pontos");

let pontuacao = 0;

function atualizaPontuacao() {
  const pontuacaoElement = document.querySelector(".pontos");
  pontuacaoElement.textContent = "Pontuação: " + pontuacao;
}

let loopJogo = setInterval(verificarColisoes, 10);

function pararJogo() {
  clearInterval(loopJogo);
  console.log("Jogo Parado");
}

function fazerMarioPular() {
  mario.classList.add("pular");
  setTimeout(function () {
    mario.classList.remove("pular");
    pontuacao++;
    atualizaPontuacao();
  }, 500);
}

function verificarColisoes() {
    const posicaoCano = cano.offsetLeft;
    const posicaoMario = parseFloat(getComputedStyle(mario).bottom);
    const posicaoNuvem = parseFloat(getComputedStyle(nuvem).bottom);

    if (detectarColisao(posicaoCano, posicaoMario)) {
        processarColisao();
    }
}

function detectarColisao(posicaoCano, posicaoMario) {
    return posicaoCano <= 100 && posicaoCano > 0 && posicaoMario < 60;
}

function processarColisao() {
    console.log("Você morreu, sua pontuação foi de: ", pontuacao);
    pontuacao = 0;
    pararJogo();

    cano.style.animation = "none";
    cano.style.left = `${cano.offsetLeft}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${parseFloat(getComputedStyle(mario).bottom)}px`;
    mario.src = "assets/imgs/fim-de-jogo.png";
    mario.style.width = "70px";
    mario.style.marginLeft = "35px";

    nuvem.style.animation = "nuvem 20s infinite linear";
    nuvem.style.left = `${parseFloat(getComputedStyle(nuvem).bottom)}px`;

    fimDeJogo.style.visibility = "visible";
}

function reiniciarJogo() {
  location.reload();
  atualizaPontuacao();
}

document.addEventListener("keyup", fazerMarioPular);
document.addEventListener("click", reiniciarJogo);

