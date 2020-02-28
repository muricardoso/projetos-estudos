//=========Dimensão do placo do jogo=======//
var altura = 0
var largura = 0
var vidas = 1
var tempo = 15
var criaMosquitoTempo
var nivel = window.location.search//query string que nos tretorna oq esta deps do ponto de interrogação
nivel = nivel.replace('?', '')//replace para tirar o ?
if(nivel==='normal'){
    //1500
    criaMosquitoTempo= 1500
}else if(nivel==='dificil'){
    //1000
    criaMosquitoTempo = 1000
}else if(nivel === 'chucknorris'){
    //750
    criaMosquitoTempo=750
}
function ajustaTamanhoPalcoJogo(){
    altura = window.innerHeight
     largura = window.innerWidth
     console.log(altura,largura)
    
}
ajustaTamanhoPalcoJogo()

//======Cronometro=======//
var cronometro = setInterval(function() {

	tempo -= 1

	if(tempo < 0) {
		clearInterval(cronometro)
		clearInterval(criaMosca)
		window.location.href = 'vitoria.html'
	} else {
		document.getElementById('cronometro').innerHTML = tempo
	}
	
}, 1000)
 //===Criação de posição randomica
function posicaoRandomica() {
    //Remover mosquito anterior (caso exista)
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()

        if(vidas > 3){
            window.location.href ='fim_de_jogo.html'
        }else{
        document.getElementById('v'+ vidas).src="img/coracao_vazio.png"
        vidas++
        }
    }
   

    var posicaoX = Math.floor(Math.random() * largura) -90
    var posicaoy = Math.floor(Math.random() * altura) -90
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoy = posicaoy < 0 ? 0 : posicaoy
    console.log(posicaoX, posicaoy)

    //======criar elemenbto html de forma programatica=====//
    var mosquito = document.createElement('img')
    mosquito.src = 'img/mosca.png'
    mosquito.className = tamanhoAleatorio() +' ' + ladoAleatorio()
    mosquito.style.left = posicaoX +'px'
    mosquito.style.top = posicaoy +'px'
    mosquito.style.position='absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick= function(){
        this.remove()
    }

    document.body.appendChild(mosquito)
    tamanhoAleatorio()
    ladoAleatorio()
}

//===========MUDAR TAMANHHO DO MOSQUITO=======//
function tamanhoAleatorio(){
    var classe = Math.floor(Math.random() * 3)//retorna número aleatório entre 0 e 1 vezes trés nos retorna alhgo emtre 0 e mt proximo a 3
    switch(classe){
        case 0:
            return 'mosquito1'

        case 1:
             return 'mosquito2'

        case 2:
            return 'mosquito3'
    }

}

//======Mudar lado em que o mosquito esta olhando======//
function ladoAleatorio(){
    var classe = Math.floor(Math.random() * 2)//retorna número aleatório >0<2
    
    switch(classe){
        case 0:
            return 'ladoaA'

        case 1:
             return 'ladoB'
}
}

//============Click Sobre o elemento=========//
