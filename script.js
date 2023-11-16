const hmtl = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startOuPauseBt = document.querySelector('#start-pause')
const musicaInput = document.querySelector('#alternar-musica')
const pausarBt = document.querySelector('#start-pause span')
const imageBt = document.querySelector('.app__card-primary-butto-icon')
const timerNaTela = document.querySelector('#timer')
const audio = new Audio('/sons/luna-rise-part-one.mp3')
const pauseAudio = new Audio('/sons/pause.mp3')
const playAudio = new Audio('/sons/play.wav')
const finishTimerAudio = new Audio('/sons/beep.mp3')
audio.loop = true

let tempoDecorrido = 1500
let intervaloId = null

musicaInput.addEventListener('change' , () =>{
    if(audio.paused){
        audio.play()
    }else {
        audio.pause()
    }
})
focoBt.addEventListener('click', () => {  
    tempoDecorrido = 1500
    alterarContexto('foco')
   focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorrido = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorrido = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    hmtl.setAttribute('data-contexto', contexto),
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch(contexto){
        case "foco":
            titulo.innerHTML=  `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
        break;
        case "descanso-curto":
            titulo.innerHTML=  `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta</strong>`
        break; 
        case "descanso-longo":
            titulo.innerHTML=  `Hora de voltar à superficie,<br>
            <strong class="app__title-strong">Faça uma pausa longa</strong>`
            
        break;        
    }
}

const contagemRegressiva = () => {
    if (tempoDecorrido <= 0){
        finishTimerAudio.play()
        zerar()
        alert ('Tempo finalizado')
        return
    }
    tempoDecorrido -= 1
    mostrarTempo()
}

function iniciarOuPausar(){
    if(intervaloId){
        pauseAudio.play()
        zerar()
        return
    }
    intervaloId = setInterval(contagemRegressiva,1000)
    playAudio.play()
    pausarBt.textContent = 'Pausar'
    imageBt.setAttribute('src', `/imagens/pause.png`)
}
function zerar(){
    clearInterval(intervaloId)
    intervaloId = null
    pausarBt.textContent = 'Começar'
    imageBt.setAttribute('src', `/imagens/play_arrow.png`)
}

startOuPauseBt.addEventListener('click', iniciarOuPausar)


function mostrarTempo(){
    const tempo = new Date(tempoDecorrido * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    timerNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()