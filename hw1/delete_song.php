<?php
require_once 'autenticazione.php';
if (!$userid = checkAuth()) exit;

spotify();

function spotify() {
    global $dbconfig, $userid;

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    # Costruisco la query
    $userid = mysqli_real_escape_string($conn, $userid);
    $id = mysqli_real_escape_string($conn, $_POST['id']);

    # Controllo se la canzone è presente per l'utente
    $query = "SELECT * FROM songs WHERE user = '$userid' AND song_id = '$id'";
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

    # Se la canzone è presente, la rimuovo dal database
    if (mysqli_num_rows($res) > 0) {
        $deleteQuery = "DELETE FROM songs WHERE user = '$userid' AND song_id = '$id'";
        if (mysqli_query($conn, $deleteQuery)) {
            echo json_encode(array('ok' => true));
            exit;
        } else {
            echo json_encode(array('ok' => false));
            exit;
        }
    }

    mysqli_close($conn);
    echo json_encode(array('ok' => false));
}
?>
