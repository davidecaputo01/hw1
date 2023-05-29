const form= document.querySelector("form");
form.addEventListener('submit',validazione);

function validazione(event){
   if(form.nome.value.lenght==0 ||
      form.cognome.value.lenght==0 ||
      form.email.value.lenght==0 ||
      form.password.value.lenght==0 ||
      form.confpassword.value.lenght==0||
      form.avatar.value.lenght==0){
        alert("Compilare tutti i campi!")
        event.preventDefault();
      }
}