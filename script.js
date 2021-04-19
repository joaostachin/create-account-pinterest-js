class Validator {

  constructor(){
    this.validations = [
      "data-min-length",
      "data-max-length",
      "data-required",
    ]
  }
  //Iniciar a validacao de todos os campos
  validate(form){

    // Resgata todas as validacoes
    let currentValidations = document.querySelectorAll("form .error-validation");

    if(currentValidations.length > 0) {
      this.cleanValidations(currentValidations);
    }

    //Pegar todos os inputs do formulario
    let inputs = form.getElementsByTagName("input");

    //Transformar HTMLCollection em um Array

    let inputsArray = [...inputs];

    //Loop nos inputs e validacao mediante ao que for encontrado
    inputsArray.forEach(function(input){
      
      //Loop em todas as validacoes existentes
      for(let i = 0; this.validations.length > i; i++){
        //Verifica se a validacao atual existe no input
        if(input.getAttribute(this.validations[i]) != null){
         
          // Transformar o data-min-length em minlength
          // Limpando a String para virar um metodo
          let method = this.validations[i].replace("data-","").replace("-", "");

          // Valor do input
          let value = input.getAttribute(this.validations[i]);
          
          // Invocar o metodo
          this[method](input, value);
        }
      }

    }, this);
  }
  // Verifica se o input tem um numero minimo de caracteres
  minlength(input, minValue){

    let inputLength = input.value.length;

    let errorMessage = `Hmm...that doesn't look like an email address`;

    if(inputLength < minValue){
      this.printMessage(input, errorMessage);
    }

  }

  // Verifica se o input passou do numero maximo de caracteres
  maxlength(input, maxValue){

    let inputLength = input.value.length;

    let errorMessage = `Your password is too short! You need 6+ characters.`;

    if(inputLength < maxValue){
      this.printMessage(input, errorMessage);
    }

  }

   // Valida Emails
   // emailvalidate(input) {

   // Emails no perfil email@email.com, email@email.com.br 
   //let re = /\S+@\S+\.\S+/;

   //  let email = input.value;

   //let errorMessage = `Hmm...that doesn't look like an email address`;

   //if(!re.test(email)) {
   //     this.printMessage(input, errorMessage);
   //   }
   // }

  printMessage(input, msg){

    let template = document.querySelector(".error-validation").cloneNode(true);

    template.textContent = msg;

    let inputParent = input.parentNode;

    template.classList.remove("template");

    inputParent.appendChild(template);

  }
  // Verifica se o input e requerido
  required(input){

    let inputValue = input.value;

    if(inputValue === ""){
      let errorMessage = ``;

      this.printMessage(input, errorMessage);
    }
  }

  // Limpa as validacoes da tela
  cleanValidations(validations){
    validations.forEach(el => el.remove());
  }
  
}

let form = document.getElementById("register-form");
let submit =document.getElementById("btn-submit");
let validator = new Validator();

//Evento que dispara as validacoes
submit.addEventListener("click", function(e){

  e.preventDefault();

  validator.validate(form);

});