
function fetchSongs() {
        fetch("fetch_song.php").then(fetchResponse).then(fetchSongsJson);
}

function fetchResponse(response) {
    if (!response.ok) {return null};
    return response.json();
}

function fetchArtists() {
    fetch("fetch_artist.php").then(fetchResponse).then(fetchArtistsJson);
}

function fetchArtistsJson(json) {
    const resultsDiv = document.getElementById("results3");
    resultsDiv.innerHTML = ""; // Svuota il contenuto dell'elemento <div> se necessario
  
  
    for (let i = 0; i < json.length; i++) {
      const artist = json[i];
  
      const card = document.createElement("div");
      card.classList.add('card');
  
      const id = document.createElement("div");
      id.classList.add('hidden');
      id.textContent = artist.artista_id;
      card.appendChild(id);
  
      const titolo = document.createElement("h3");
      titolo.textContent = artist.nome;
      card.appendChild(titolo);
  

      const saveForm = document.createElement('div');
      saveForm.classList.add("saveForm");
      titolo.appendChild(saveForm);
  
      saveForm.addEventListener('click', removeArtist);
  
      const image = document.createElement("img");
      image.src = artist.immagine;
      card.appendChild(image);
  
      const genre = document.createElement("span");
      genre.textContent = artist.genere;
      card.appendChild(genre);
   
      resultsDiv.appendChild(card);
    }
  }
  
  function removeArtist(event){
    const card = event.currentTarget.parentNode.parentNode; // Ottieni la scheda corrente
    const formData = new FormData(); // Crea un nuovo oggetto FormData
    // Aggiungi gli elementi della card all'oggetto FormData
    formData.append('artista_id', card.querySelector('div').textContent);
    formData.append('nome', card.querySelector('h3').textContent);
    formData.append('genere', card.querySelector('span').textContent);
    formData.append('immagine',card.querySelector('img').src);
    fetch("delete_artist.php", {method: 'post', body: formData}).then(dispatchResponse, dispatchError);
    console.log("Cancellazione");
     event.stopPropagation();
     if(fetch){card.remove()};
     
}
function fetchSongsJson(json) {
    const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // Svuota il contenuto dell'elemento <div> se necessario

  // Itera sui dati ricevuti e crea le card
  for (let i = 0; i < json.length; i++) {
    const song = json[i];

    const card = document.createElement("div");
    card.classList.add('card');

    const id=document.createElement("div");
    id.classList.add('hidden');
    id.textContent=song.song_id;
    card.appendChild(id);

    const title = document.createElement("h3");
    title.textContent = song.titolo;
    card.appendChild(title);

    //like container
    const saveForm = document.createElement('div');
    saveForm.classList.add("saveForm");
    title.appendChild(saveForm);

    saveForm.addEventListener('click',removeSong);

    const image = document.createElement("img");
    image.src = song.immagine; // Imposta l'URL dell'immagine
    card.appendChild(image);

    const artist = document.createElement("p");
    artist.textContent = "Artista : "+ song.artist;
    card.appendChild(artist);

    const duration = document.createElement("span");
    duration.textContent = "Durata : "+song.duration;
    card.appendChild(duration);

    resultsDiv.appendChild(card);
  }
}

function fetchAlbums(){
    fetch("fetch_album.php").then(fetchResponse).then(fetchAlbumsJson);
}
//album
function fetchAlbumsJson(json) {
    const resultsDiv = document.getElementById("results2");
    resultsDiv.innerHTML = ""; // Svuota il contenuto dell'elemento <div> se necessario

  // Itera sui dati ricevuti e crea le card
  for (let i = 0; i < json.length; i++) {
    const album = json[i];

    const card = document.createElement("div");
    card.classList.add('card');

    const id=document.createElement("div");
    id.classList.add('hidden');
    id.textContent=album.album_id;
    card.appendChild(id);

    const titolo = document.createElement("h3");
    titolo.textContent = album.title;
    card.appendChild(titolo);

    const artist = document.createElement("p");
    artist.textContent = "Artista : "+ album.artist;
    card.appendChild(artist);

    //like container
    const saveForm = document.createElement('div');
    saveForm.classList.add("saveForm");
    titolo.appendChild(saveForm);

    saveForm.addEventListener('click',removeAlbum);

    const image = document.createElement("img");
    image.src = album.immagine; // Imposta l'URL dell'immagine
    card.appendChild(image);

    const release = document.createElement("span");
    release.textContent = album.releaseDate;
    card.appendChild(release);

    resultsDiv.appendChild(card);
  }
}

//artist
function fetchSongsJson(json) {
    const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // Svuota il contenuto dell'elemento <div> se necessario

  // Itera sui dati ricevuti e crea le card
  for (let i = 0; i < json.length; i++) {
    const song = json[i];

    const card = document.createElement("div");
    card.classList.add('card');

    const id=document.createElement("div");
    id.classList.add('hidden');
    id.textContent=song.song_id;
    card.appendChild(id);

    const title = document.createElement("h3");
    title.textContent = song.titolo;
    card.appendChild(title);

    //like container
    const saveForm = document.createElement('div');
    saveForm.classList.add("saveForm");
    title.appendChild(saveForm);

    saveForm.addEventListener('click',removeSong);

    const image = document.createElement("img");
    image.src = song.immagine; // Imposta l'URL dell'immagine
    card.appendChild(image);

    const artist = document.createElement("p");
    artist.textContent = "Artista : "+ song.artist;
    card.appendChild(artist);

    const duration = document.createElement("span");
    duration.textContent = "Durata : "+song.duration;
    card.appendChild(duration);

    resultsDiv.appendChild(card);
  }
}

function removeSong(event){
    const card = event.currentTarget.parentNode.parentNode; // Ottieni la scheda corrente
        const formData = new FormData(); // Crea un nuovo oggetto FormData
      // Aggiungi gli elementi della card all'oggetto FormData
        formData.append('id', card.querySelector('div').textContent);
        formData.append('artist', card.querySelector('p').textContent);
        formData.append('titolo', card.querySelector('h3').textContent);
        formData.append('duration', card.querySelector('span').textContent);
        formData.append('image', card.querySelector('img').src);
    fetch("delete_song.php", {method: 'post', body: formData}).then(dispatchResponse, dispatchError);
    console.log("Cancellazione");
     event.stopPropagation();
     if(fetch){card.remove()};
     
}

function removeAlbum(event){
    const card = event.currentTarget.parentNode.parentNode; // Ottieni la scheda corrente
        const formData = new FormData(); // Crea un nuovo oggetto FormData
      // Aggiungi gli elementi della card all'oggetto FormData
      formData.append('album_id', card.querySelector('div').textContent);
      formData.append('artist', card.querySelector('p').textContent);
      formData.append('title', card.querySelector('h3').textContent); 
      formData.append('immagine',card.querySelector('img').src);
      formData.append('uscita',card.querySelector('span').textContent);
    fetch("delete_album.php", {method: 'post', body: formData}).then(dispatchResponse, dispatchError);
    console.log("Cancellazione");
     event.stopPropagation();
     if(fetch){card.remove()};
     
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

function noResults() {
    // Definisce il comportamento nel caso in cui non ci siano contenuti da mostrare
    const container = document.getElementById('results');
    container.innerHTML = '';
    const nores = document.createElement('div');
    nores.classList.add('nores');
    nores.textContent = "Nessun risultato.";
    container.appendChild(nores);
  }



fetchSongs();
fetchAlbums();
fetchArtists();