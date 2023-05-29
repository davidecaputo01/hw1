<?php
require_once 'autenticazione.php';
if (!$userid = checkAuth()) exit;

spotifyCheck2();

function spotifyCheck2() {
    global $dbconfig, $userid;

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    # Costruisco la query
    $userid = mysqli_real_escape_string($conn, $userid);
    $id = mysqli_real_escape_string($conn, $_POST['artista_id']);
    $nome=mysqli_real_escape_string($conn,$_POST['nome']);
    $genere = mysqli_real_escape_string($conn, $_POST['genere']);

    # Check if song is already present for user
    $query = "SELECT * FROM artista WHERE user = '$userid' AND artista_id = '$id' AND nome = '$nome' AND genere='$genere'";
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

    if(mysqli_num_rows($res) > 0) {
        echo json_encode(array('exists' => true));
    } else {
        echo json_encode(array('exists' => false));
    }

    mysqli_close($conn);
}
?>