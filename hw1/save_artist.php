<?php
    /*******************************************************
        Inserisce nel database il post da pubblicare 
    ********************************************************/
    require_once 'autenticazione.php';
    if (!$userid = checkAuth()) exit;

    spotify();

    function spotify() {
        global $dbconfig, $userid;

        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        
        # Costruisco la query
        $userid = mysqli_real_escape_string($conn, $userid);
        $id = mysqli_real_escape_string($conn, $_POST['artista_id']);
        $nome = mysqli_real_escape_string($conn, $_POST['nome']);
        $genere = mysqli_real_escape_string($conn, $_POST['genere']);
        $immagine = mysqli_real_escape_string($conn, $_POST['immagine']);
        

        # check if song is already present for user
        $query = "SELECT * FROM artista WHERE user = '$userid' AND artista_id = '$id'";
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
        # if song is already present, do nothing
        if(mysqli_num_rows($res) > 0) {
            echo json_encode(array('ok' => true));
            exit;
        }

        # Eseguo
        $query = "INSERT INTO artista(user, artista_id, immagine,nome,genere) VALUES('$userid','$id', '$immagine', '$nome', '$genere')";
        error_log($query);
        # Se corretta, ritorna un JSON con {ok: true}
        if(mysqli_query($conn, $query) or die(mysqli_error($conn))) {
            echo json_encode(array('ok' => true));
            exit;
        }

        mysqli_close($conn);
        echo json_encode(array('ok' => false));
    }