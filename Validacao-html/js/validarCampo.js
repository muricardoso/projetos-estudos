function validarCampo() {
    let validaBtn = checkBtn;
    let validaLinkBtn = checkLinkBtn;
    let validaAltBtn = checkAltBtn;
    let validaImg = checkImg;
    let validaAltImg = checkAltImg;
    let validaUrlImg = checkUrlImg;
    let validaEncode = checkEncode;
    let validaRadioEncode = radioEncode.value;
    alert('ss');
    $('.exm').removeClass('input-drop');
    //  console.log(document.querySelector('input[name="encode"]:checked'))
    /*Aqui o valor é o value do input*/
    if (validaBtn.checked == true && validaLinkBtn.checked == true && validaAltBtn.checked == true && validaImg.checked == true && validaAltImg.checked == true && validaUrlImg.checked == true && validaEncode.checked == true && validaRadioEncode != "") {
        // addChecklist()
        // alert('aqui')
        /*quanddo o input check é checedk ele assume o valor de on*/
        alert('aqui validou');
    }
    else {
        alert('aqui erro');
    }
    //     
    // alert(document.getElementById('input-img').value)
    // if(validarUrl === true && checkboxChecked.checked === true){
    // }
}
