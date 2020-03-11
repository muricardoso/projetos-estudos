class UserController {
    constructor(formIdCreate,formIdUpdate, tableId) {
        this.formEl = document.getElementById(formIdCreate);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);
        this.onSubmit();
        this.onEdit();
        this.selectAll();
    }
    onEdit() {//Faz os eventos de editar.
        document.querySelector('#box-user-update .btn-cancel').addEventListener('click',e=>{
            this.showPanelCreate();
        })
        this.formUpdateEl.addEventListener('submit', e=>{
            event.preventDefault();
            let btn = this.formUpdateEl.querySelector('[type=submit]');
            btn.disabled = true;
            let values = this.getValues(this.formUpdateEl);
            let index = this.formUpdateEl.dataset.trIndex;
            let tr = this.tableEl.rows[index];
            let userOld = JSON.parse(tr.dataset.user)
            let result = Object.assign({},userOld, values);
            this.getPhoto(this.formUpdateEl).then(
                (content) => {
                    if (!values.photo){
                        result._photo = userOld._photo;
                    }else{
                        result._photo = content;
                    }
                    let user = new User();
                    user.loadFromJSON(result);
                    user.save();
                    this.getTr(user, tr);
                    this.updateCount();
                    this.formUpdateEl.reset();
                    btn.disabled = false;
                
                },(e) => {
                    console.error(e)
                });
                this.showPanelCreate();
        });
    }
    onSubmit() { //Evia dos dados preenchidos para cadastro de usuários.
        this.formEl.addEventListener('submit', event =>{
            event.preventDefault();
            let btn = this.formEl.querySelector('[type=submit]');
            btn.disabled = true;
            let values = this.getValues(this.formEl);
            if(!values) return false
            this.getPhoto(this.formEl).then(
                 (content) => {
                    values.photo = content;
                    values.save();
                    this.addLine(values);
                    this.formEl.reset();
                    btn.disabled = false;
                },(e) => {
                    console.error(e);
                });
            // btn.disabled = false;
        });
    }//Close OnSubmit
    getPhoto(formEl) { // Seleciona a foto, e atribuiu a tr da lista
        return new Promise((resolve, reject)=>{
            let fileReader = new FileReader();
            let elements = [...formEl.elements].filter(item =>{
                if (item.name === "photo") {
                    return item
                }
            });
            let file = elements[0].files[0]
            fileReader.onload = () =>{
               resolve(fileReader.result);
            };
            fileReader.onerror = () =>{
                reject(e);
            }
            if (file) {
                fileReader.readAsDataURL(file)
            }else{
                resolve('dist/img/boxed-bg.jpg');
            }
        })
    }//Close getPhoto
    getValues(formEl) { //Pega os valores do campos dos formulários.
        let user = {};
        let isValid = true;
        [...formEl.elements].forEach((field, index)=>{
            if(['name', 'password', 'email'].indexOf(field.name) > -1 && !field.value ) {
                field.parentElement.classList.add('has-error');
                isValid = false;
            }
            if(field.name == "gender") {
                if (field.checked) {
                    user[field.name] = field.value;
                }     
            } else if(field.name == "admin") {
                user[field.name] = field.checked
            } else{
                user[field.name] = field.value;
            }
        })
        if(!isValid) {
            return false;
        }
        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );
        addLine(objectUser);
    }//Close getValues
    selectAll() { // Seleciona usuários do localStorage para inclusão de um novo user.
        let users =  User.getUsersStorage();
        users.forEach(dataUser=>{
            let user = new User();
            user.loadFromJSON(dataUser);
            this.addLine(user);
        })
    }

    addLine(dataUser) {
        let tr = this.getTr(dataUser)  
        this.titleEditPanel(tr.dataset.user)
        this.tableEl.appendChild(tr);
        this.updateCount();  
    }//Close addLine
    getTr(dataUser, tr = null){ //cria a table para inserção de linhas.
        if(tr ===null) tr = document.createElement('tr');
        tr.dataset.user = JSON.stringify(dataUser);
        tr.innerHTML = 
        `<td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin ?"sim" :"não" }</td>
        <td>${Utils.dataFormat(dataUser.register)}</td>
        <td>
            <button type="button" class="btn btn-primary btn-xs btn-edit btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-delete btn-flat">Excluir</button>
        </td>`
        this.addEventsTR(tr);
        return tr
    }
    addEventsTR(tr) {//evento da tr para exclusão 
        tr.querySelector('.btn-delete').addEventListener('click',e=>{
            if (confirm("Deseja realmente excluir?")) {
                let user = new User();
                user.loadFromJSON(JSON.parse(tr.dataset.user));
                user.remove();
                tr.remove();
                this.updateCount();
        }
    });
        tr.querySelector('.btn-edit').addEventListener('click',e=>{
            let json = JSON.parse(tr.dataset.user);
            //let form = document.querySelector('#form-user-update');
            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;
            for(let name in json){
              let field =  this.formUpdateEl.querySelector('[name=' + name.replace('_', '') + ']');
     
              if(field) {
                switch (field.type) {
                    case 'file':
                        continue
                    break;
                    case 'radio':
                        field =  this.formUpdateEl.querySelector('[name=' + name.replace('_', '') + '][value='+json[name]+'');
                        field.checked = true;
                    break;
                    case 'checkbox':
                        field.checked = json[name]
                        // field.checked = true;
                    break;
                    default:
                        field.value = json[name];
                    break;
                }     
              }
              
            }
            this.formUpdateEl.querySelector('.photo').src = json._photo;
            this.showPanelUpdate();             
        })
    }//Close EventeTR
    showPanelCreate() {
        document.querySelector('#box-user-create').classList.remove('show-panels')
        document.querySelector('#box-user-update').classList.add('show-panels')
    }// Close Show panel Create
    showPanelUpdate() {
        document.querySelector('#box-user-create').classList.add('show-panels')
        document.querySelector('#box-user-update').classList.remove('show-panels')
        // this.titleEditPanel(tr); 
    }// Close Show panel Update
    titleEditPanel(tr) {
        let userName = JSON.parse(tr)
        document.querySelector('#edit-title').innerHTML= `Editar Usuário: ${userName._name}`
    }
    updateCount() {      
        let numberUsers = 0;
        let numberAdmin = 0;    
        [...this.tableEl.children].forEach(tr=>{   
            let user = JSON.parse(tr.dataset.user)
            numberUsers++;
            if (user._admin == true)console.log(numberAdmin++);   
        })
        document.querySelector('#number-users').innerHTML = numberUsers
        document.querySelector('#number-users-admin').innerHTML = numberAdmin
    }
    
}