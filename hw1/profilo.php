<?php 
    require_once 'autenticazione.php';
    if (!$userid = checkAuth()) {
        header("Location: login.php");
        exit;
    }
?>

<html>
    <?php 
        // Carico le informazioni dell'utente loggato per visualizzarle nella sidebar (mobile)
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        $userid = mysqli_real_escape_string($conn, $userid);
        $query = "SELECT * FROM utenti WHERE id = $userid";
        $res_1 = mysqli_query($conn, $query);
        $userinfo = mysqli_fetch_assoc($res_1);   
    ?>

    <head>
        <link rel='stylesheet' href='profilo.css'>
        <script src='profilo.js' defer></script>
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap" rel="stylesheet">
        <link rel="icon" type="image/png" href="./images/favicon.png">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">

        <title>MusicParadise-<?php echo $_SESSION['_agora_username']?></title>
    </head>

    <body>
        <header>
            <nav>
                <img src="./images/logo.jpg" id="logo">
                <div id="links"><a href="MusicParadise.php">Home</a>
                <a href="#">Chi sono?</a>
                <a href="profilo.php">Profilo</a>
                <a href="logout.php">Logout</a>
                </div>
                </nav>
                <div id="userInfo">
                    <div id="avatar" style="background-image: url(<?php echo $userinfo['propic'] == null ? "./images/default_avatar.png" : $userinfo['propic'] ?>)"> </div>
                    <div id="utente"><?php echo $_SESSION['_agora_username']?></div>
                </div>               
           
        </header>

        <section id="container">
        <div class="cat"><h2>Brani</h2><div id="results"></div></div>
        <div class="cat"><h2>Album</h2><div id="results2"></div></div>
        <div class="cat"><h2>Artisti</h2><div id="results3"></div></div>
        </section>
    </body>
</html>

