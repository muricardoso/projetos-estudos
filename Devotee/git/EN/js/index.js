
    function initialize(){
        modal();
        modalTerms();
        modalPolicy();
        openTabsClick();
        execClickTabs();
        verifyLanguage();
    }
    initialize()
    function verifyLanguage(){
        let dataTraduction = data;
        // var userLang = navigator.language;
        let location = window.location.href
        
        console.log( location.toString().indexOf('.com.br'))
        var userLang = 'en'
        switch (userLang) {
            case 'pt':
                traductionLanguage(dataTraduction[0].pt);
                copyright(dataTraduction[0].pt.copyright);
                break;
            case 'en':
                traductionLanguage(dataTraduction[1].us);
                copyright(dataTraduction[1].us.copyright);
            break;
        
            default:
                traductionLanguage(dataTraduction[1].us);
                copyright(dataTraduction[1].us.copyright);
                break;
        }
    }
    function traductionLanguage(data){
        for (let i = 0; i < Object.values(data).length; i++) {
            let objectKeys = Object.keys(data)[i],
            objectValue = Object.values(data)[i],
            elementIds =  document.getElementById(objectKeys);
            
            if(objectKeys.indexOf('alt') == -1){
                elementIds.innerHTML = objectValue;
            }
            if(objectKeys.indexOf('src') != -1){
                elementIds.src = objectValue
            } 
        }
    }
    function copyright(text){
        let copyright = document.querySelector('#copyright');
        copyright.innerHTML=` Copyright © ${new Date().getFullYear()} ${text}`
    }
    function modalPolicy(){
        let modalId = document.querySelector("#my-modal-policy");
        let btn = "my-btn-policy";
        let close = "close-policy";
        modal(modalId, btn, close)
    }
    function modalTerms(){
        let modalId = document.querySelector("#my-modal-terms");
        let btn = "my-btn-terms";
        let close = "close-terms";
        modal(modalId, btn, close)
    }
    function modal(modalId, btn, close) {  
        document.addEventListener('click', (e) =>{
            let targetClass = e.target.classList.contains(btn);
            let targetClassClose = e.target.classList.contains(close);
            if(targetClass){
                modalId.style.display = "none";
            }
            if(targetClassClose){
                modalId.style.display = "none";
            }
		});
    }
    function execClickTabs(){
        let btnClass = [];
        document.addEventListener('click', (e) =>{
            let targetClass = e.target.getAttribute('data-click');
            switch (targetClass) {
                case 'click-terms':
                    btnClass[0] = 'click-terms'
                    break
                case 'click-policy-privacy':
                    btnClass[0] = 'click-policy-privacy'
                        break
                case 'click-policy-cookies':
                    btnClass[0] = 'click-policy-cookies'
                        break
                case 'click-procedures':
                    btnClass[0] = 'click-procedures'
                        break
                case 'click-security':
                    btnClass[0] = 'click-security'
                        break
                default:
                    break;
            }
        });  
        openTabsClick(btnClass)
    }
    
    function openTabsClick(btnClass){
        document.addEventListener('click', (e) =>{     
            let targetClass = e.target.classList.contains(btnClass);
            if(targetClass){
                hideTabs()
                openTabs(e, btnClass)
            }     
		});
    }
    function hideTabs(){
        let i, tabcontent
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
    }
    function openTabs(evt, cityName) {  
        let i, tabcontent,tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        styleTextTabs(evt)
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
      }
    function styleTextTabs(evt){
        let tabContent,tabs;
        let elementClicked = evt.composedPath()[1];
        tabContent = document.getElementsByClassName("content-terms");
        tabs = document.getElementsByClassName("tab");
        for (let i = 0; i < tabContent.length; i++) {
            tabContent[i].classList.remove('modal-terms'); 
        }
        for (let e = 0; e < tabContent.length-6; e++) {
            if(elementClicked.classList.value == tabs[0].children[e].classList.value){
                tabs[0].children[e].classList.add('modal-terms');
            }
         
        }
    }