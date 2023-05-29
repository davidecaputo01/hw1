function validazione(event){
  const avviso=document.querySelector('section');
  avviso.innerHTML='';
  
  if(form.nome.value.length==0||
     form.cognome.value.length==0||
     form.email.value.length==0 ||
     form.username.value.lenght==0||
     form.password.value.length==0||
     form.confpassword.value.length==0||
     form.nome.parentNode.classList.contains('errorj')||
     form.cognome.parentNode.classList.contains('errorj')||
     form.email.parentNode.classList.contains('errorj')||
     form.username.parentNode.classList.contains('errorj')||
     form.password.parentNode.classList.contains('errorj')||
     form.confpassword.parentNode.classList.contains('errorj')
     )
     {
      window.scrollTo({top: 0, behavior: 'smooth'});
      const div=document.createElement('div');
      const testo=document.createElement('span');
      testo.textContent="Compilare tutti i campi e controllare eventuali errori."
      div.classList.add('div');
      avviso.appendChild(div);
      div.appendChild(testo);
      event.preventDefault();
     }
  }

  function fetchResponse(response) {
    if (!response.ok) return null;
    return response.json();
}

  function checkName(event) {
    const input = event.currentTarget;
    if (input.value.length > 0) {
        input.parentNode.classList.remove('errorj');
    } else {
        input.parentNode.classList.add('errorj');
        input.value="Inserisci il tuo nome";
    }
  }

  function checkSurname(event) {
    const input = event.currentTarget;
    if (input.value.length > 0) {
        input.parentNode.classList.remove('errorj');
    } else {
        input.parentNode.classList.add('errorj');
        input.value="Inserisci il tuo cognome";
    }
  }

  function checkUsername(){
    const input = document.querySelector('#username input');

    if(!/^[a-zA-Z0-9_]{1,15}$/.test(input.value)) {
        input.value = "Max:15 (lettere,numeri e _ )";
        input.parentNode.classList.add('errorj');
    }else {
      fetch("check_username.php?q="+encodeURIComponent(input.value)).then(fetchResponse).then(jsonCheckUsername);
  }    
 }
 function jsonCheckUsername(json) {
  // Controllo il campo exists ritornato dal JSON
  if (!json.exists) {
      document.querySelector('#username').classList.remove('errorj');
  } else {
      document.querySelector('#username span').textContent = "Nome utente già utilizzato";
      document.querySelector('#username').classList.add('errorj');
  }

}
  
 function checkEmail() {
  const emailInput = document.querySelector('#email input');
  if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(emailInput.value).toLowerCase())) {
      emailInput.value = "Email non valida";
      emailInput.parentNode.classList.add('errorj');
  } else {
    fetch("check_email.php?q="+encodeURIComponent(String(emailInput.value).toLowerCase())).then(fetchResponse).then(jsonCheckEmail);
}
  } 

  function jsonCheckEmail(json) {
    // Controllo il campo exists ritornato dal JSON
    if (!json.exists) {
        document.querySelector('#email').classList.remove('errorj');
    } else {
        document.querySelector('#email span').textContent = "Email già utilizzata";
        document.querySelector('#email').classList.add('errorj');
    }

}


  function checkPassword() {
    const passwordInput = document.querySelector('#password input');
    if (passwordInput.value.length >= 8) {
        passwordInput.classList.remove('errorj');
        const messaggio=document.querySelector('#password');

        if(messaggio.hasChildNodes()){
          const childDaRimuovere = document.getElementById("idelemento");
          if (childDaRimuovere) {
          childDaRimuovere.parentNode.removeChild(childDaRimuovere);
       }};
        
    } else {
        passwordInput.parentNode.classList.add('errorj');
        passwordInput.value="";
        const messaggio=document.querySelector('#password');
        if(messaggio.hasChildNodes()){
           const childDaRimuovere = document.getElementById("idelemento");
           if (childDaRimuovere) {
           childDaRimuovere.parentNode.removeChild(childDaRimuovere);
        }};
        const div=document.createElement('div'); 
        div.id= "idelemento";
        const testo=document.createElement('span');
         testo.textContent="Password troppo breve (min:8 caratteri)";
         div.appendChild(testo);
         messaggio.appendChild(div);
        
    }
  
  }
  
  function checkConfirmPassword() {
    const confirmPasswordInput = document.querySelector('#conf_password input');
    if (confirmPasswordInput.value === document.querySelector('#password input').value) {
        confirmPasswordInput.classList.remove('errorj');
        const messaggio=document.querySelector('#conf_password');
          if(messaggio.hasChildNodes()){
          const childDaRimuovere = document.getElementById("idelemento2");
          if (childDaRimuovere) {
          childDaRimuovere.parentNode.removeChild(childDaRimuovere);
       }};
    } else {
        confirmPasswordInput.parentNode.classList.add('errorj');
        confirmPasswordInput.value="";
        const messaggio=document.querySelector('#conf_password');
          if(messaggio.hasChildNodes()){
          const childDaRimuovere = document.getElementById("idelemento2");
          if (childDaRimuovere) {
          childDaRimuovere.parentNode.removeChild(childDaRimuovere);
       }};
        const div=document.createElement('div'); 
        div.id= "idelemento2";
        const testo=document.createElement('span');
         testo.textContent="Le password non corrispondono";
         div.appendChild(testo);
         messaggio.appendChild(div);
    }
  }

 function seleziona(event){
    const selezionato=event.currentTarget;
    selezionato.parentNode.classList.remove('errorj');
    selezionato.value="";
 }
 
function controllaFile(){
  const inputFile=document.getElementById('carica');
  const file = inputFile.files[0]; // Ottieni il file caricato
  const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png']; // Formati consentiti
  
  // Controllo delle dimensioni del file
  if (file.size > 7 * 1024 * 1024) {
    inputFile.parentNode.classList.add('errorj');
    inputFile.value = ""; // Resetta il valore dell'input file per consentire la selezione di un nuovo file
   
    while (errorDiv.firstChild) {  //se errorDiv ha un child lo rimuove
      errorDiv.removeChild(errorDiv.firstChild);
    }
    
    // Aggiungi il nuovo messaggio di errore
    const errorMessage = document.createElement('span');
    errorMessage.textContent = "Le dimensioni del file superano 7 MB";
    errorDiv.appendChild(errorMessage);
    
    errorDiv.style.display = 'block'; // Mostra il div di errore
    return;
  } 
    // Interrompi l'esecuzione della funzione
   else{
    inputFile.parentNode.classList.remove('errorj');
    errorDiv.style.display = 'none';
    
  }
  
  // Controllo del formato del file
  if (!allowedFormats.includes(file.type)) {
    inputFile.parentNode.classList.add('errorj');
    inputFile.value = ""; // Resetta il valore dell'input file per consentire la selezione di un nuovo file

    while (errorDiv.firstChild) {  //se errorDiv ha un child lo rimuove
      errorDiv.removeChild(errorDiv.firstChild);
    }
    
    // Aggiungi il nuovo messaggio di errore
    const errorMessage = document.createElement('span');
    errorMessage.textContent = "Formato non supportato [solo .jpeg e .png]";
    errorDiv.appendChild(errorMessage);
    
    errorDiv.style.display = 'block'; // Mostra il div di errore
    return;
  } 
  else{
    inputFile.parentNode.classList.remove('errorj');
    errorDiv.style.display='none';
  }
}

 
document.querySelector('#name input').addEventListener('blur', checkName);
document.querySelector('#name input').addEventListener('click',seleziona);
document.querySelector('#surname input').addEventListener('click', seleziona);
document.querySelector('#surname input').addEventListener('blur', checkSurname);
document.querySelector('#username input').addEventListener('blur',checkUsername);
document.querySelector('#username input').addEventListener('click',seleziona);
document.querySelector('#email input').addEventListener('blur', checkEmail);
document.querySelector('#email input').addEventListener('click',seleziona);
document.querySelector('#password input').addEventListener('blur', checkPassword);
document.querySelector('#password input').addEventListener('click',seleziona);
document.querySelector('#conf_password input').addEventListener('blur', checkConfirmPassword);
document.querySelector('#conf_password input').addEventListener('click',seleziona);
document.getElementById('carica').addEventListener('change',controllaFile);


const form= document.forms['sign'];
form.addEventListener('submit',validazione);

