<?php
require_once 'autenticazione.php';
if (!$userid = checkAuth()) exit;

spotifyCheck();

function spotifyCheck() {
    global $dbconfig, $userid;

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    # Costruisco la query
    $userid = mysqli_real_escape_string($conn, $userid);
    $id = mysqli_real_escape_string($conn, $_POST['album_id']);
    $artist=mysqli_real_escape_string($conn,$_POST['artist']);
    $title = mysqli_real_escape_string($conn, $_POST['title']);

    # Check if song is already present for user
    $query = "SELECT * FROM album WHERE user = '$userid' AND album_id = '$id' AND artist = '$artist' AND title='$title'";
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

    if(mysqli_num_rows($res) > 0) {
        echo json_encode(array('exists' => true));
    } else {
        echo json_encode(array('exists' => false));
    }

    mysqli_close($conn);
}
?>