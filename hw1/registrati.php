
<?php
    require_once 'autenticazione.php';

    if (checkAuth()) {
        header("Location: MusicParadise.php");
        exit;
    }   

    // Verifica l'esistenza di dati POST
    if (!empty($_POST["nome"]) && !empty($_POST["cognome"]) && !empty($_POST["username"]) && !empty($_POST["email"]) && 
        !empty($_POST["password"]) && !empty($_POST["confpassword"]))
    {
        $error = array();
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

        
        # USERNAME
        // Controlla che l'username rispetti il pattern specificato
        if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $_POST['username'])) {
            $error[] = "Username non valido";
        } else {
            $username = mysqli_real_escape_string($conn, $_POST['username']);
            // Cerco se l'username esiste già o se appartiene a una delle 3 parole chiave indicate
            $query = "SELECT username FROM utenti WHERE username = '$username'";
            $res = mysqli_query($conn, $query);
            if (mysqli_num_rows($res) > 0) {
                $error[] = "Username già utilizzato";
            }
        }
        # PASSWORD
        if (strlen($_POST["password"]) < 8) {
            $error[] = "Caratteri password insufficienti";
        } 
        # CONFERMA PASSWORD
        if (strcmp($_POST["password"], $_POST["confpassword"]) != 0) {
            $error[] = "Le password non coincidono";
        }
        # EMAIL
        if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            $error[] = "Email non valida";
        } else {
            $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
            $res = mysqli_query($conn, "SELECT email FROM utenti WHERE email = '$email'");
            if (mysqli_num_rows($res) > 0) {
                $error[] = "Email già utilizzata";
            }
        }

        # UPLOAD DELL'IMMAGINE DEL PROFILO  
        if (count($error) == 0) { 
            if ($_FILES['avatar']['size'] != 0) {
                $file = $_FILES['avatar'];
                $type = exif_imagetype($file['tmp_name']);
                $allowedExt = array(IMAGETYPE_PNG => 'png', IMAGETYPE_JPEG => 'jpg');
                if (isset($allowedExt[$type])) {
                    if ($file['error'] === 0) {
                        if ($file['size'] < 7000000) {
                            $fileNameNew = uniqid('', true).".".$allowedExt[$type];
                            $fileDestination = 'images/'.$fileNameNew;
                            move_uploaded_file($file['tmp_name'], $fileDestination);
                        } else {
                            $error[] = "L'immagine non deve avere dimensioni maggiori di 7MB";
                        }
                    } else {
                        $error[] = "Errore nel carimento del file";
                    }
                } else {
                    $error[] = "I formati consentiti sono .png, .jpeg, .jpg";
                }
            }else{
                echo "Non hai caricato nessuna immagine";
            }
        }

        # REGISTRAZIONE NEL DATABASE
        if (count($error) == 0) {
            $nome = mysqli_real_escape_string($conn, $_POST['nome']);
            $cognome = mysqli_real_escape_string($conn, $_POST['cognome']);
            $password = mysqli_real_escape_string($conn, $_POST['password']);
            $password = password_hash($password, PASSWORD_BCRYPT);

            $query = "INSERT INTO utenti (nome, cognome, username, email, password, propic) VALUES('$nome', '$cognome', '$username', '$email', '$password', '$fileDestination')";
            
            if (mysqli_query($conn, $query)) {
                $_SESSION["_agora_username"] = $_POST["username"];
                $_SESSION["_agora_user_id"] = mysqli_insert_id($conn);
                mysqli_close($conn);
                header("Location: MusicParadise.php");
                exit;
            } else {
                $error[] = "Errore di connessione al Database";
            }
        }

        mysqli_close($conn);
    }
  

?>
<!DOCTYPE html>
<html>
    <head>
        <title>Registrati</title>
        <link rel="icon" type="image/png" href="./images/favicon.png">
        <meta charset="'utf-8">
        <link rel="stylesheet" href="registrati.css" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300&display=swap" rel="stylesheet">
        <script src="registra.js" defer="true"></script>
         <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <nav>
        <img src="./images/logo.jpg" id="logo">
        <div id="links"><a href="hw1.php">Home</a>
        <a href="#">Chi sono?</a>
        <a href="#">Registrati</a>
        <a href="login.php">Login</a>
        </div>
      </nav>
     <body id="bodyreg">
     <section></section>
    <form name="sign" method='post' enctype="multipart/form-data">
        <div id="name"><label>Nome<input type='text' name='nome'  
             <?php if(isset($_POST["nome"])){echo "value=".$_POST["nome"];} ?> ></label></div>
        <div id="surname"><label>Cognome <input type='text' name='cognome' 
             <?php if(isset($_POST["cognome"])){echo "value=".$_POST["cognome"];} ?> > </label></div>
        <div id="username"><label>Username<input type='text' name='username' 
             <?php if(isset($_POST["username"])){echo "value=".$_POST["username"];} ?> > </label></div>
        <div id="email"><label>E-mail <input type='text' name='email' 
             <?php if(isset($_POST["email"])){echo "value=".$_POST["email"];} ?> > </label></div>
        <div id="password"><label>Password <input type='password' name='password'
             <?php if(isset($_POST["password"])){echo "value=".$_POST["password"];} ?> > </label></div>
        <div id="conf_password"><label>Conferma Password <input type='password' name='confpassword' 
             <?php if(isset($_POST["confpassword"])){echo "value=".$_POST["confpassword"];} ?> > </label></div>
        <div id="avatar"><label>Scegli un'immagine di profilo <input type='file' name='avatar' accept='.jpg, .jpeg, image/gif, image/png' id="carica"></label></div>
        <div id="errorDiv" style="display: none;"></div>
        <?php if(isset($error)) {
                    foreach($error as $err) {
                        echo "<div class='errorj'><img src='./assets/close.svg'/><span>".$err."</span></div>";
                    }
                } ?>
        <div id="registrati"><label>&nbsp;<input type='submit' value="REGISTRATI" id="invio"></label></div>
        <div id="exists">Hai gia' un account? <a href="login.php">ACCEDI</a></div>
    </form>
  
  
  <footer><p id=identificativo>Davide Caputo<address>Cittadella Universitaria - Catania</address><span id="matricola">1000016550</span></p></footer>
  </body>
  </html>