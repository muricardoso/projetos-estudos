/*Variaveis*/
var idFadeModalLimpaCampo = document.getElementById('modal-confirm').attributes.id.value
var idFadeModalImg = document.getElementById('modal-alert').attributes.id.value
/*Retorno dos ids check */
var checkBtn = document.getElementById('button')
var checkLinkBtn = document.getElementById('linkBotao')
var checkAltBtn = document.getElementById('altBotao')
var checkImg = document.getElementById('input-image-drop')
var checkAltImg = document.getElementById('altImage')
var checkUrlImg = document.getElementById('urlImage')
var checkEncode = document.getElementById('encodes')
// var expandMores = document.getElementById('input-drop-image')

/*Funçoes genericas de apareição de modal,blur no form e limpar campos */
function fadeOutInModal(idFade){let ModalFade = idFade; $(`#${ModalFade}`).fadeToggle(1,()=>{}); removeAddBlur()}
function removeAddBlur(){let element = document.getElementById("checklist");element.classList.toggle("modal");/* $('#checklist').toggleClass('modal')*/}
function removeCheck(){$(".checkbox").prop("checked", false);}
function removeValueInput(){$('.input-dados').val("")}
function expandMores(idExpand){$(`.${idExpand}`).toggleClass('input-drop')}
function hoverItemMenu(idBarraHover){document.getElementById(`logo-${idBarraHover}`).classList.add('barra-bottom-select-s')}
function outItemMenu(idOutMenu){document.getElementById(`logo-${idOutMenu}`).classList.remove('barra-bottom-select-s')}
/*Eventos de click nos botões Validar, Limpar, Confirmar, cancelar*/
function validarCampo(){
    mascaraUrl()
}
/*Modais*/
function limparCampo(){
  let idFade = idFadeModalLimpaCampo
    fadeOutInModal(idFade)  
}

function confirmar(){
    let idFade = idFadeModalLimpaCampo
    fadeOutInModal(idFade)
    removeCheck()
    removeValueInput()
}
function cancelar(){
    let idFade = idFadeModalLimpaCampo
    fadeOutInModal(idFade)
}
/*Mascáras de input*/
 function mascaraUrl() {   
    let idFade = idFadeModalImg
    let mascaraUrl = document.getElementById('input-img').value
    let incrementoHttps = mascaraUrl.indexOf('https://' )
    let incrementoHttp = mascaraUrl.indexOf('http://' )
    let inputimg = document.getElementById('input-img')
    if(mascaraUrl > ""){ 
             
        if(incrementoHttps < 0 && incrementoHttp < 0){
            let analiseComDot = mascaraUrl.indexOf('.com')
            // alert('O link do input de imagens não possui "http://" ou "https://"')
            if(analiseComDot < 0 ){   
               
            }else{
                fadeOutInModal(idFade)         
                inputimg.classList.add('erro-img')
                // $('#input-img').addClass('erro-img')
                $('#urlImage').prop("checked", false);  

            document.getElementById('validar').classList.remove('validarbtn')
            document.getElementById('validar').disabled = true;   
            }     
            // document.getElementById('input-img').value =`http://${mascaraUrl}`
        }else{   
            inputimg.classList.remove('erro-img')
            document.getElementById('validar').classList.add('validarbtn')
            document.getElementById('validar').disabled = false;
        }
        
    }

}


function okCaminhoImg(){
    let idFade = idFadeModalImg
    fadeOutInModal(idFade)
}
/*Gerar json e fazer o dowload */
function addChecklist() { 
    let urlImage = document.getElementById('input-img').value
    let encode = document.querySelector('input[name="encode"]:checked').value
    let validazip = document.querySelector('input[name="zip"]:checked').value
    encode == 'sim' ? encode = true : encode = false;
    validazip == 'sim' ? validazip = true : validazip = false

    let oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
    let newItem = {
        'key': "uniqueProjectKey",
    	'fileIn': "index.html",
	    'fileOut': "index-local.html",    
        'entities': encode,
        'zip' : validazip,
        "assetsIn": "./images/",
        'assetsOut': urlImage,
    };
    
    if (oldItems.length > 0) {
        oldItems.length = 0;
      }
    oldItems.push(newItem);
    localStorage.setItem('itemsArray', JSON.stringify(oldItems));
    let downloadNow = localStorage.getItem('itemsArray',JSON.stringify(oldItems)).replace('[','').replace(']','')
     download(downloadNow, "config.json", 'json')

};
/*Doenload do arquivoo json */
function download(content, filename, contentType){
    if(!contentType){
        contentType = 'json';
    }
    var a = document.createElement('a');
    var blob = new Blob([content], {'type':contentType});
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}
/*Validação dos campos check */
function validarCampo(){  
    let validaBtn = checkBtn
    let validaLinkBtn = checkLinkBtn
    let validaAltBtn = checkAltBtn
    let validaImg = checkImg
    let validaAltImg = checkAltImg
    let validaUrlImg = checkUrlImg
    let validaEncode = document.querySelector('input[name="encode"]:checked')
    let validazip = document.querySelector('input[name="zip"]:checked')
    // let validaRadioEncode = radioEncode.value
    $('.exm').removeClass('input-drop')
    //  console.log(document.querySelector('input[name="encode"]:checked'))
    
/*Aqui o valor é o value do input*/
    if(validaBtn.checked == true && validaLinkBtn.checked == true && validaAltBtn.checked == true && validaImg.checked == true && validaAltImg.checked == true && validaUrlImg.checked == true && validaEncode.checked == true && validaEncode.value != "" &&  validazip != ""){
         addChecklist()
        // alert('aqui')
    }else{
        
    

    }
//     

    
    
    
    // alert(document.getElementById('input-img').value)
    // if(validarUrl === true && checkboxChecked.checked === true){
        
    // }
}
