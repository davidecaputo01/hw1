<?php 
    /*******************************************************
        Preleva gli ultimi 10 post o tutti, se ce ne sono 
        meno di 10
    ********************************************************/
    require_once 'autenticazione.php';
    if (!$userid = checkAuth()) exit;

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $userid = mysqli_real_escape_string($conn, $userid);
   
    $query = "SELECT user, song_id, titolo, artist,duration,immagine from songs where user = $userid";
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
    
    $songArray = array();
    while($row = mysqli_fetch_assoc($res)) {
        // Scorro i risultati ottenuti e creo l'elenco di post
        $songArray[] = $row;
    }
    mysqli_free_result($res);
    mysqli_close($conn);
    echo json_encode($songArray);
    
    exit;
?>