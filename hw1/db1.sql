create DATABASE db1;
use db1;

create table utenti (
    id int primary key auto_increment,
	nome varchar(15) not null,
    cognome varchar(15) not null,
    username varchar(255) not null unique,
    email  varchar(25) not null unique,
    password varchar(255) not null,
    propic varchar(255) not null
	);

CREATE TABLE songs (
    song_id integer primary key auto_increment,
    user integer not null,
    titolo varchar(255),
    artist varchar(255),
    duration varchar(255),
    immagine varchar(255)
);

CREATE TABLE artista(
     artista_id integer primary key auto_increment,
     user integer not null,
     immagine varchar(255),
     nome varchar(255),
     genere varchar(255)
);

CREATE TABLE album(
	 album_id int primary key auto_increment,
     user integer not null,
     immagine varchar(255),
     title varchar(255),
     artist varchar(255),
     releaseDate varchar(255)
);
select * from songs;
drop database db1;