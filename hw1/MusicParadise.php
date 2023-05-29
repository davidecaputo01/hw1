<?php
    require_once 'autenticazione.php';
    if (!isset($_SESSION['_agora_username'])) {
      echo "Non dovresti essere qui";
      exit;
  }
  ?>
<!DOCTYPE html>
<html>
    <head>
        <title> MusicParadise</title>
        <meta charset="'utf-8">
        <link rel="stylesheet" href="musicparadise.css" />
        <script src="MusicParadise.js" defer></script>
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300&display=swap" rel="stylesheet">
        <link rel="icon" type="image/png" href="./images/favicon.png">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>

    <nav>
        <img src="./images/logo.jpg" id="logo">
        <div id="links"><a href="hw1.php">Home</a>
        <a href="#">Chi sono?</a>
        <a href="profilo.php">Profilo</a>
        <a href="logout.php">Logout</a>
        </div>
      </nav>
  <body>
    <article id="sito">
    <div id="benvenuto" >Lieti di vederti<em><?php echo $_SESSION['_agora_username']?></em></div>
    <div id="container"><div id="Avviso">Seleziona una Categoria</div>
          <form id="search-form">
        <div id="opzioni">
            <div class="option">
            <img src="./images/canzone.jpg">
            <div class="buttons"><input type="radio" name="opzione" value="brano">Brani</div>
            </div>
            <div class="option">
            <img src="./images/album.jpg">
            <div class="buttons"><input type="radio" name="opzione" value="album">Album</div>
            </div>
            <div class="option">
            <img src="./images/artisti.jpg">
            <div class="buttons"><input type="radio" name="opzione" value="artista">Artista</div>
            </div>
        </div>
            <div id="text-input">
            <input type="text" name="testo" id="content" placeholder="Inserisci la tua ricerca...">
            <input type="submit" value="Cerca" id="submit"></button>
            </div>
          </form>
</div>
    </article>
    <section id="results"></section>
  </body>
  <footer><p id=identificativo>Davide Caputo<address>Cittadella Universitaria - Catania</address><div id="matricola">1000016550</div></p></footer>
    </html>
