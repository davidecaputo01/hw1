<?php
    // Verifica che l'utente sia già loggato, in caso positivo va direttamente alla home
    require_once 'autenticazione.php';
    if (checkAuth()) {
        header('Location: MusicParadise.php');
        exit;
    }

    if (!empty($_POST["username"]) && !empty($_POST["password"]) )
    {

        // Se username e password sono stati inviati
        // Connessione al DB
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

        $username = mysqli_real_escape_string($conn, $_POST['username']);
        // ID e Username per sessione, password per controllo
        $query = "SELECT * FROM utenti WHERE username = '$username'";
        // Esecuzione
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));;
        
        if (mysqli_num_rows($res) > 0) {
            // Ritorna una sola riga, il che ci basta perché l'utente autenticato è solo uno
            $entry = mysqli_fetch_assoc($res);
            if (password_verify($_POST['password'], $entry['password'])) {

                // Imposto una sessione dell'utente
                $_SESSION["_agora_username"] = $entry['username'];
                $_SESSION["_agora_user_id"] = $entry['id'];
                header("Location: MusicParadise.php");
                mysqli_free_result($res);
                mysqli_close($conn);
                exit;
            }
        }
        // Se l'utente non è stato trovato o la password non ha passato la verifica
        $error = "Credenziali errate";
    }
    else if (isset($_POST["username"]) || isset($_POST["password"])) {
        // Se solo uno dei due è impostato
        $error = "Inserisci username e password";
    }

?>

<html>
    <head>
        <link rel='stylesheet' href='login.css'>
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Accedi a MusicParadise</title>
    </head>
    
    <nav>
        <img src="./images/logo.jpg" id="logo">
        <div id="links">
        <a href="hw1.php">Home</a>
        <a href="#">Chi sono?</a>
        </div>
    </nav>

    <body>
      <main id="login">
        <section id="main">
            <h5>Per continuare, accedi a MusicParadise.</h5>
            <?php
                // Verifica la presenza di errori
                if (isset($error)) {
                    echo "<p class='error'>$error</p>";
                }
                
            ?>
            <form name='login' method='post'>
                <!-- Seleziono il valore di ogni campo sulla base dei valori inviati al server via POST -->
                <div id="nomeutente">
                    <label>Username</label>
                    <input type='text' name='username' <?php if(isset($_POST["username"])){echo "value=".$_POST["username"];} ?>>
                </div>
                <div id="Password">
                    <label>Password</label>
                    <input type='password' name='password' <?php if(isset($_POST["password"])){echo "value=".$_POST["password"];} ?>>
                </div>
                <div id="login-btn">
                        <input type='submit' value="ACCEDI">
                    </div>
              
            </form>
            <div id="signup"><h4>Non hai un account?</h4></div>
            <div id="signup-btn-container"><a href="registrati.php">ISCRIVITI A MusicParadise</a></div>
        </section>
        </main>
    </body>
</html>