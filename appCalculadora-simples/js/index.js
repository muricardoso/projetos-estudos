
function valores(){
    var valor = event.key;
    let tipo ;
    
    if(valor == 1 || valor == 2|| valor == 3 || valor == 4 || valor == 5 || valor == 6 || valor == 7 || valor == 8 || valor == 9|| valor == 0 ){
           tipo = "valor"
    }
    if(valor == "Enter" ){
        valor = '='
      
    }
    if(valor == 'c' || valor == '-' || valor == '+' || valor == '/' || valor == '=' || valor == '*' || valor == '.'){
        tipo = 'acao'
    }
     
    // console.log(tecla, tipo)
    calcular(tipo,valor )
}
function calcular(tipo, valor){
    console.log(tipo)
    if(tipo === 'acao'){
        if(valor === 'c'){
            //limpar o visor
            document.getElementById('resultado').value = ''
        }
        if(valor === '+'|| valor === '-' || valor === '*' || valor === '/' || valor==='.'){
            document.getElementById('resultado').value += valor
        }
        if( valor === '='){
          var valor_campo = eval(document.getElementById('resultado').value)
            document.getElementById('resultado').value = valor_campo
        }
    }else if (tipo === 'valor'){ 
        document.getElementById("resultado").value += valor 
    }
}

