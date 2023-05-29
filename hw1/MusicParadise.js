const bottone = document.querySelector('form').addEventListener('submit',search);

function search(event){
    event.preventDefault();
    const selectedOption = document.querySelector('input[name="opzione"]:checked').value;
    const input= document.querySelector('#content').value;
    
    if (selectedOption === 'brano') {
        console.log('Ricerca Brani:');
        // Mando le specifiche della richiesta alla pagina PHP, che prepara la richiesta e la inoltra
        fetch("ricercabrani.php?q=" + encodeURIComponent(input)).then(searchResponse).then(jsonSpotify)
        // Evito che la pagina venga ricaricata
        event.preventDefault();
      } else if (selectedOption === 'album') {
        console.log('Ricerca Album:');
        fetch("ricercalbum.php?q=" + encodeURIComponent(input)).then(searchResponse).then(jsonSpotify2)
        // Evito che la pagina venga ricaricata
        event.preventDefault();
      } else if (selectedOption === 'artista') {
        console.log('Ricerca Artista:');
        fetch("ricercartista.php?q=" + encodeURIComponent(input)).then(searchResponse).then(jsonSpotify3)
        // Evito che la pagina venga ricaricata
        event.preventDefault();
      } 
} 
function searchResponse(response){
    console.log(response);
    return response.json();
}

    function jsonSpotify(json) {
      console.log(json);
      const tracks = json.tracks.items; // Ottieni l'array degli elementi dei brani dal JSON
      if (!json.tracks.items.length) {noResults(); return;}
      
    
      // Svuota i risultati precedenti
      const resultsContainer = document.querySelector('#results');
      resultsContainer.innerHTML = '';
    
      // Crea le schede per i brani
      for (let i = 0; i < 15; i++) {
        const track = tracks[i];
        const card = createCard(track.album, track.name, track.artists[0].name, track.duration_ms,track.album.name,track.id);
        resultsContainer.appendChild(card);
      }
    }
    
    function createCard(album, title, artist,duration_ms,albumname,id_track) {
      // Crea un elemento div per la scheda
      const card = document.createElement('div');
      card.classList.add('card');
      
      const id=document.createElement('h1');
      id.textContent=id_track;
      id.classList.add('hidden');
      card.appendChild(id);

      // Aggiungi l'immagine dell'album
      const image = document.createElement('img');
      image.src = album.images[0].url; // Aggiungi l'URL dell'immagine dell'album
      card.appendChild(image);
    
      // Aggiungi il titolo del brano
      const titleElement = document.createElement('h3');
      titleElement.textContent = title; // Aggiungi il titolo del brano
      card.appendChild(titleElement);

      //aggiungo la durata
      const durata=document.createElement('span');
      const minuti = Math.floor(duration_ms / 60000);
      const secondi = Math.floor((duration_ms % 60000) / 1000);
      const sec = secondi.toString().padStart(2, '0');
      durata.textContent= minuti+":"+sec;
      card.appendChild(durata);

      // Aggiungi l'artista
      const artistElement = document.createElement('p');
      artistElement.textContent = artist; // Aggiungi il nome dell'artista
      card.appendChild(artistElement);

      //like container
      const saveForm = document.createElement('div');
        saveForm.classList.add("saveForm");
        artistElement.appendChild(saveForm);
        
        const formData = new FormData(); // Crea un nuovo oggetto FormData
        // Aggiungi gli elementi della card all'oggetto FormData
        formData.append('id', card.querySelector('h1').textContent);
        formData.append('artist', card.querySelector('p').textContent);
        formData.append('duration', card.querySelector('span').textContent); 
        fetch("check_song.php", { method: 'post', body: formData })
         .then(response => response.json())
         .then(data => {
               if (data.exists) {
                  console.log('Esiste');
                  saveForm.classList.remove('saveForm');
                  saveForm.classList.add('selected');
                } else {
                // Esegui azioni alternative se data.exists è false
                console.log('Non Esiste');
                saveForm.classList.remove('selected');
                saveForm.classList.add('saveForm');
               }})     

        saveForm.addEventListener('click',saveSong );
      
       card.addEventListener('click', function () {
          openModal(album, title, artist, duration_ms,albumname);
        });
  
      return card;
      }

      function saveSong(event){
        // Preparo i dati da mandare al server e invio la richiesta con POST
        const card = event.currentTarget.parentNode.parentNode; // Ottieni la scheda corrente
        const formData = new FormData(); // Crea un nuovo oggetto FormData
    
  
         // Aggiungi gli elementi della card all'oggetto FormData
        formData.append('id', card.querySelector('h1').textContent);
        formData.append('artist', card.querySelector('p').textContent);
        formData.append('titolo', card.querySelector('h3').textContent);
        formData.append('duration', card.querySelector('span').textContent);
        formData.append('image', card.querySelector('img').src);
        
        const tasto=event.currentTarget;
        if(!tasto.classList.contains('selected')){
        tasto.classList.remove('saveForm');
        tasto.classList.add('selected');
        fetch("save_song.php", {method: 'post', body: formData}).then(dispatchResponse, dispatchError);
        console.log("Salvataggio")
        event.stopPropagation();
      }
        
        else{
          tasto.classList.remove('selected');
          tasto.classList.add('saveForm');
          // Aggiungi gli elementi della card all'oggetto FormData
          
          fetch("delete_song.php", {method: 'post', body: formData}).then(dispatchResponse, dispatchError);
          console.log("Cancellazione");
           event.stopPropagation();
        }
      }
      
      function saveAlbum(event){
        // Preparo i dati da mandare al server e invio la richiesta con POST
        const card = event.currentTarget.parentNode.parentNode; // Ottieni la scheda corrente
        const formData = new FormData(); // Crea un nuovo oggetto FormData
        // Aggiungi gli elementi della card all'oggetto FormData
        formData.append('album_id', card.querySelector('div').textContent);
        formData.append('artist', card.querySelector('p').textContent);
        formData.append('title', card.querySelector('h3').textContent); 
        formData.append('immagine',card.querySelector('img').src);
        formData.append('uscita',card.querySelector('span').textContent);
        
        const tasto=event.currentTarget;
        if(!tasto.classList.contains('selected')){
        tasto.classList.remove('saveForm');
        tasto.classList.add('selected');
        fetch("save_album.php", {method: 'post', body: formData}).then(dispatchResponse, dispatchError);
        console.log("Salvataggio")
        event.stopPropagation();
      }
        
        else{
          tasto.classList.remove('selected');
          tasto.classList.add('saveForm');
          // Aggiungi gli elementi della card all'oggetto FormData
          
          fetch("delete_album.php", {method: 'post', body: formData}).then(dispatchResponse, dispatchError);
          console.log("Cancellazione");
           event.stopPropagation();
        }
      }
      

      function saveArtist(event){
        // Preparo i dati da mandare al server e invio la richiesta con POST
        const card = event.currentTarget.parentNode.parentNode; // Ottieni la scheda corrente
        const formData = new FormData(); // Crea un nuovo oggetto FormData
        // Aggiungi gli elementi della card all'oggetto FormData
        formData.append('artista_id', card.querySelector('div').textContent);
        formData.append('nome', card.querySelector('p').textContent);
        formData.append('genere', card.querySelector('span').textContent);
        formData.append('immagine',card.querySelector('img').src);
        
        const tasto=event.currentTarget;
        if(!tasto.classList.contains('selected')){
        tasto.classList.remove('saveForm');
        tasto.classList.add('selected');
        fetch("save_artist.php", {method: 'post', body: formData}).then(dispatchResponse, dispatchError);
        console.log("Salvataggio")
        event.stopPropagation();
      }
        
        else{
          tasto.classList.remove('selected');
          tasto.classList.add('saveForm');
          // Aggiungi gli elementi della card all'oggetto FormData
          
          fetch("delete_artist.php", {method: 'post', body: formData}).then(dispatchResponse, dispatchError);
          console.log("Cancellazione");
           event.stopPropagation();
        }
      }
      function dispatchResponse(response) {

        console.log(response);
        return response.json().then(databaseResponse); 
      }
      
      function dispatchError(error) { 
        console.log("Errore");
      }
      
      function databaseResponse(json) {
        if (!json.ok) {
            dispatchError();
            return null;
        }
      }
      
    
          
    function openModal(album, title, artist, duration,albumname) {
      // Creazione dell'elemento modale
      const modal = document.createElement('div');
      modal.classList.add('modal');
    
      // Contenuto della modale
      const modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');

     // Aggiungi l'icona di chiusura
      const closeIcon = document.createElement('div');
      closeIcon.classList.add('close-icon');
      modalContent.appendChild(closeIcon);
      closeIcon.addEventListener('click', closeModal);
    
      // Aggiungi i dettagli ingranditi della card alla modale
      // Puoi utilizzare lo stesso codice utilizzato per creare la card
      // Personalizza il contenuto della modale
      const trackTitle = document.createElement('h1');
      trackTitle.textContent = title; 
      modalContent.appendChild(trackTitle);
      
      const contenuto=document.createElement('div');
      contenuto.classList.add('contenuto');
      modalContent.appendChild(contenuto);

      const trackImage = document.createElement('img');
      trackImage.src = album.images[0].url; 
      trackImage.classList.add('trackimage');
      contenuto.appendChild(trackImage);
      
      const infoContainer = document.createElement('div');
      infoContainer.classList.add('info-container');
      contenuto.appendChild(infoContainer);

      const info=document.createElement('h3');
      info.textContent= "Artista = "+artist;
      infoContainer.appendChild(info);
      
      const nomealbum=document.createElement('div');
      nomealbum.textContent="Album = "+albumname;
      infoContainer.appendChild(nomealbum);

      const durataBrano = document.createElement('span');
      const minuti = Math.floor(duration / 60000);
      const secondi = Math.floor((duration % 60000) / 1000);
      const sec = secondi.toString().padStart(2, '0');
      durataBrano.textContent = "Durata brano = "+minuti + ':' + sec;
      infoContainer.appendChild(durataBrano);

  
      // Aggiungi il contenuto della modale alla modale stessa
      modal.appendChild(modalContent);
    
      // Aggiungi la modale al body del documento
      document.body.appendChild(modal);
    
      // Rendi più scuro il resto della pagina
      document.body.classList.add('modal-open');
    }
 
    function closeModal() {
      // Rimuovi la modale dal DOM
      const modal = document.querySelector('.modal');
      modal.parentNode.removeChild(modal);
      
      // Ripristina lo sfondo originale
      document.body.classList.remove('modal-open');
    }

    
function jsonSpotify2(json) {
    // svuoto i risultati
    console.log(json);
    const albums = json.albums.items; // Ottieni l'array degli album dal JSON
    if (!json.albums.items.length) {noResults(); return;}
  
    // Svuota i risultati precedenti
    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = '';
  
    // Crea le schede per gli album
    for (let i = 0; i < 15; i++) {
      const album = albums[i];
      const card = createCard2(album.images[0].url, album.name, album.artists[0].name, album.release_date, album.id);
      resultsContainer.appendChild(card);
    }
  }
  
  function createCard2(imageUrl, title, artist, releaseDate,id_album) {
    // Crea un elemento div per la scheda
    const card = document.createElement('div');
    card.classList.add('card');
    
    const id=document.createElement('div');
    id.classList.add('hidden');
    id.textContent=id_album;
    card.appendChild(id);

    // Aggiungi l'immagine dell'album
    const image = document.createElement('img');
    image.src = imageUrl; // Aggiungi l'URL dell'immagine dell'album
    card.appendChild(image);
  
    // Aggiungi il titolo dell'album
    const titleElement = document.createElement('h3');
    titleElement.textContent = title; // Aggiungi il titolo dell'album
    card.appendChild(titleElement);
  
    // Aggiungi l'artista
    const artistElement = document.createElement('p');
    artistElement.textContent = artist; // Aggiungi il nome dell'artista
    card.appendChild(artistElement);
  
    // Aggiungi la data di uscita
    const releaseDateElement = document.createElement('span');
    releaseDateElement.textContent = "Pubblicazione: " + releaseDate; // Aggiungi la data di uscita dell'album
    releaseDateElement.classList.add('uscita');
    card.appendChild(releaseDateElement);

    const saveForm = document.createElement('div');
    saveForm.classList.add("saveForm");
    releaseDateElement.appendChild(saveForm);

    const formData = new FormData(); // Crea un nuovo oggetto FormData
        // Aggiungi gli elementi della card all'oggetto FormData
        formData.append('album_id', card.querySelector('div').textContent);
        formData.append('artist', card.querySelector('p').textContent);
        formData.append('title', card.querySelector('h3').textContent);
       

        fetch("check_album.php", { method: 'post', body: formData })
         .then(response => response.json())
         .then(data => {
               if (data.exists) {
                  console.log('Esiste');
                  saveForm.classList.remove('saveForm');
                  saveForm.classList.add('selected');
                } else {
                // Esegui azioni alternative se data.exists è false
                console.log('Non Esiste');
                saveForm.classList.remove('selected');
                saveForm.classList.add('saveForm');
               }})    

    saveForm.addEventListener('click',saveAlbum );

    card.addEventListener('click', function () {
      openModal2(imageUrl, title, artist, releaseDate);
    });
  
    return card;
  }

  function openModal2(imageUrl, title, artist, releaseDate) {
    // Creazione dell'elemento modale
    const modal = document.createElement('div');
    modal.classList.add('modal');
  
    // Contenuto della modale
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
  
    // Aggiungi l'icona di chiusura
    const closeIcon = document.createElement('div');
    closeIcon.classList.add('close-icon');
    modalContent.appendChild(closeIcon);
    closeIcon.addEventListener('click', closeModal);
  
    // Aggiungi i dettagli ingranditi della card alla modale
    const trackTitle = document.createElement('h1');
    trackTitle.textContent = title;
    modalContent.appendChild(trackTitle);
  
    const contenuto = document.createElement('div');
    contenuto.classList.add('contenuto');
    modalContent.appendChild(contenuto);
  
    const AlbumImage = document.createElement('img');
    AlbumImage.src = imageUrl;
    AlbumImage.classList.add('trackimage');
    contenuto.appendChild(AlbumImage);
  
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('info-container');
    contenuto.appendChild(infoContainer);
  
    const info = document.createElement('h3');
    info.textContent = 'Artista = ' + artist;
    infoContainer.appendChild(info);
  
    const release = document.createElement('div');
    release.textContent = 'Data di rilascio = ' + releaseDate;
    infoContainer.appendChild(release);
  
    // Aggiungi il contenuto della modale alla modale stessa
    modal.appendChild(modalContent);
  
    // Aggiungi la modale al body del documento
    document.body.appendChild(modal);
  
    // Rendi più scuro il resto della pagina
    document.body.classList.add('modal-open');
  }



    function jsonSpotify3(json) {
      // svuoto i risultati
      console.log(json);
      const artists = json.artists.items; // Ottieni l'array degli album dal JSON
      if (!json.artists.items.length) {noResults(); return;}

      // Svuota i risultati precedenti
      const resultsContainer = document.querySelector('#results');
      resultsContainer.innerHTML = '';
    
      // Crea le schede per gli album
      for (let i = 0; i < 6; i++) {
        const artist = artists[i];
        const card = createCard3(artist.images[0].url, artist.name, artist.genres[0],artist.id);
        resultsContainer.appendChild(card);
      }
    }
    
    function createCard3(imageUrl, nome, genere,id_artist) {
      // Crea un elemento div per la scheda
      const card = document.createElement('div');
      card.classList.add('card');
    
      const id=document.createElement('div');
      id.classList.add('hidden');
      id.textContent=id_artist;
      card.appendChild(id);

      // Aggiungi l'immagine dell'album
      const image = document.createElement('img');
      image.src = imageUrl; 
      card.appendChild(image);
    
      // Aggiungi l'artista
      const artistElement = document.createElement('p');
      artistElement.textContent = nome; 
      card.appendChild(artistElement);
    
      // Aggiungi la data di uscita
      const genre = document.createElement('span');
      genre.textContent = "Genere: " + genere; 
      genre.classList.add('uscita');
      card.appendChild(genre);

      const saveForm = document.createElement('div');
      saveForm.classList.add("saveForm");
      genre.appendChild(saveForm);

      const formData = new FormData(); // Crea un nuovo oggetto FormData
        // Aggiungi gli elementi della card all'oggetto FormData
        formData.append('artista_id', card.querySelector('div').textContent);
        formData.append('nome', card.querySelector('p').textContent);
        formData.append('genere', card.querySelector('span').textContent); 
        fetch("check_artist.php", { method: 'post', body: formData })
         .then(response => response.json())
         .then(data => {
               if (data.exists) {
                  console.log('Esiste');
                  saveForm.classList.remove('saveForm');
                  saveForm.classList.add('selected');
                } else {
                // Esegui azioni alternative se data.exists è false
                console.log('Non Esiste');
                saveForm.classList.remove('selected');
                saveForm.classList.add('saveForm');
               }})    

      saveForm.addEventListener('click',saveArtist );

      card.addEventListener('click', function () {
        openModal3(imageUrl, nome, genere);
      });

    
      return card;
    }
     
    function openModal3(imageUrl, nome, genere) {
      // Creazione dell'elemento modale
      const modal = document.createElement('div');
      modal.classList.add('modal');
    
      // Contenuto della modale
      const modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');
    
      // Aggiungi l'icona di chiusura
      const closeIcon = document.createElement('div');
      closeIcon.classList.add('close-icon');
      modalContent.appendChild(closeIcon);
      closeIcon.addEventListener('click', closeModal);
    
      // Aggiungi i dettagli ingranditi della card alla modale
      // Puoi utilizzare lo stesso codice utilizzato per creare la card
      // Personalizza il contenuto della modale
      const nomeArtista = document.createElement('h1');
      nomeArtista.textContent = nome;
      modalContent.appendChild(nomeArtista);
    
      const contenuto = document.createElement('div');
      contenuto.classList.add('contenuto');
      modalContent.appendChild(contenuto);
    
      const Image = document.createElement('img');
      Image.src = imageUrl;
      Image.classList.add('artist-image');
      contenuto.appendChild(Image);
    
      const infoContainer = document.createElement('div');
      infoContainer.classList.add('info-container');
      contenuto.appendChild(infoContainer);
    
      const genereMusica = document.createElement('div');
      genereMusica.textContent = 'Genere: ' + genere;
      infoContainer.appendChild(genereMusica);
    
      // Aggiungi il contenuto della modale alla modale stessa
      modal.appendChild(modalContent);
    
      // Aggiungi la modale al body del documento
      document.body.appendChild(modal);
    
      // Rendi più scuro il resto della pagina
      document.body.classList.add('modal-open');
    }


    function noResults() {
      // Definisce il comportamento nel caso in cui non ci siano contenuti da mostrare
      const container = document.getElementById('results');
      container.innerHTML = '';
      const nores = document.createElement('div');
      nores.textContent = "Nessun risultato.";
      nores.classList.add("nores");
      container.appendChild(nores);
    }

    