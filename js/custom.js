const playlistSongs = document.getElementById("playlist-songs"); //ul della lista canzoni
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

const allSongs = [
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
  },
];

//L'API Audio Web è supportata da tutti i browser moderni e consente di generare e processare audio nelle applicazioni web. Offre un controllo dettagliato sui suoni, permettendo di creare effetti sonori complessi, manipolare l'audio e costruire sintetizzatori.
const audio = new Audio();

//oggetto con copia dell'array allSongs
//[...nomearray] è l'operatore che permette di copiare pari pari un array specificato
  //quindi l'array di oggetti allSongs ha l'elenco delle canzoni con tutte le info necessarie
  //l'oggetto userData, ha tutte le info di allSongs e due proprietà aggiuntive settate a null e zero
let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

//Arrow Function la quale passando un parametro, 
//?. Optional Chaining è una funzione che permette di accedere all'array senza verificare se tutti i livelli intermedi esistano. Previene errori nel caso in cui le proprietà sono null o indefinite
const playSong = (id) => {
  
  const song = userData?.songs.find((song) => song.id === id); //funzioni in callback di find: accede all'ogetto userData con optional chaining, alla proprietà songs (che è la copia dell'array delle canzoni) e applica il metodo find --> gli viene passato il parametro song e se l'id della canzone esistente nell'array corrisponde esattamente all'id passsato nella funzione playSong, allora restituisce il primo elemento che corrisponde all'id fornito.

  audio.src = song.src;
  audio.title = song.title; //audio.title è una proprietà personalizzata

  //Ripristino dell'audio: Se non c'è una canzone corrente (currentSong è null) o se la canzone corrente non corrisponde alla canzone attuale (song.id), l'audio inizia dall'inizio (audio.currentTime = 0).
  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime;
    //Ripresa dell'audio: Se la canzone corrente corrisponde alla canzone attuale (song.id), l'audio riprende dalla posizione salvata (userData?.songCurrentTime).
  }

  userData.currentSong = song; //adesso viene settato currentSong
  playButton.classList.add("playing"); //aggiunge una classe al playButton, ovvero cambia colore quando è in riproduzione

  highlightCurrentSong(); //evidenzia la canzone corrente
  setPlayerDisplay(); //setta titolo e autore nel display
  setPlayButtonAccessibleText(); //aria-label accessibilità testi
  audio.play(); //avvia la riproduzione dell'audio
};

//mettere in pausa
const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime; //imposta il currenttime della canzone in riproduzione dell'array, con i secondi di esecuzione della proprietà audio.
  
  playButton.classList.remove("playing");//aggiunge una classe al playButton, ovvero cambia colore quando è in riproduzione
  audio.pause(); //mette in pausa
};

//canzone successiva
const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id); //riproduce la prima canzone della lista, se non selezionata nemmeno una canzone
  } else {
    const currentSongIndex = getCurrentSongIndex(); //serve per ottenere l'indice della canzone corrente
    const nextSong = userData?.songs[currentSongIndex + 1];

    playSong(nextSong.id); //riproduce la successiva
  }
};

//canzone precedente
const playPreviousSong = () => {
   if (userData?.currentSong === null) return;
   else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];

    playSong(previousSong.id);
   }
};

//random
const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5); //si usa per ordinare in modo casuale un array
  //Il metodo .sort() accetta una funzione di confronto che determina l'ordine degli elementi nell'array. La funzione di confronto deve restituire un valore negativo, zero o positivo per indicare rispettivamente che il primo elemento deve essere ordinato prima, uguale o dopo il secondo elemento.
  //Se il valore è negativo, il primo elemento è considerato minore (e rimarrà prima).
  //Se il valore è positivo, il primo elemento è considerato maggiore (e sarà spostato dopo).
  //Se il valore è zero, l'ordine relativo degli elementi rimane invariato.
  userData.currentSong = null;
  userData.songCurrentTime = 0;

  renderSongs(userData?.songs); //output della lista canzoni randomica
  pauseSong();
  setPlayerDisplay(); //in qeusto caso non si vedrà niente
  setPlayButtonAccessibleText(); //settaggio testo accessibilità
};

const deleteSong = (id) => {
  //se voglio eliminare la canzone che si sta riproducendo
  if (userData?.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;

    pauseSong();
    setPlayerDisplay();
  }

  //Questa riga di codice utilizza il metodo .filter() per creare un nuovo array di canzoni che esclude la canzone con un determinato id. Poi, assegna questo nuovo array alla proprietà songs di userData.
  userData.songs = userData?.songs.filter((song) => song.id !== id);
  renderSongs(userData?.songs); //in questo modo abbiamo la lista output senza la canzone calcellata
  highlightCurrentSong(); 
  setPlayButtonAccessibleText(); 

  //se cancello tutte le canzoni
  if (userData?.songs.length === 0) {
    const resetButton = document.createElement("button"); //creo un button
    const resetText = document.createTextNode("Reset Playlist"); //creo il testo del bottone

    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    resetButton.appendChild(resetText); //testo del button
    playlistSongs.appendChild(resetButton); //output delle canzoni con tasto di reset

    //aggiungere la funzione al click 
    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs]; //ripristinare l'array

      renderSongs(sortSongs()); //generazione della lista richiamando una funzione 
      setPlayButtonAccessibleText();
      resetButton.remove(); //toglire il pulsante
    });
  }
};

//serve per mostrare titolo e artista in esecuzione
const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title"); //DOM
  const songArtist = document.getElementById("player-song-artist"); //DOM
  const currentTitle = userData?.currentSong?.title; //array
  const currentArtist = userData?.currentSong?.artist; //array

  playingSong.textContent = currentTitle ? currentTitle : ""; //modifica il contenuto testo del DOM se currentTitle è presente, altrimenti vuoto (stessa cosa per artista)
  songArtist.textContent = currentArtist ? currentArtist : "";
};

//La funzione rimuove l'evidenziazione da tutte le canzoni nella playlist e aggiunge l'evidenziazione alla canzone corrente, utilizzando l'attributo aria-current per migliorare l'accessibilità.
const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song"); //ul
  const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`); //Questo seleziona l'elemento con l'ID corrispondente alla canzone corrente (es. song-1).

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  }); //Questo rimuove l'attributo aria-current da tutti gli elementi della playlist, che indica che nessuna canzone è attualmente evidenziata.

  if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
  //Se esiste un elemento per la canzone corrente, imposta aria-current a true, indicando che questa è la canzone attualmente evidenziata.
};

//lista canzoni output
const renderSongs = (array) => {
  //metodo .map per scrivere per ogni elemento dell'array la voce li
  //metodo .join per concatenare tutti gli elementi in un'unica stringa
  //in questo caso, per ogni canzone presente nell'array, viene applicato codice HTML e poi, attraverso la concatenazione, viene formata un'unica stringa HTML
  const songsHTML = array
    .map((song)=> {
      return `
      <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
      </li>
      `;
    })
    .join("");

  playlistSongs.innerHTML = songsHTML; //output
};

//Settal'attributo per l'accssibilità dell'aria-label
const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0];
  //Se userData?.currentSong esiste, viene selezionata come song.
  //Se userData?.currentSong non esiste, viene selezionata la prima canzone della playlist (userData?.songs[0]).

  playButton.setAttribute("aria-label", song?.title ? `Play ${song.title}` : "Play"); //se song ha il titolo allora play con il titolo della canzone altrimenti solo play
};

//Per ottenere l'indice della canzone corrente, puoi utilizzare il metodo indexOf(). Il metodo dell'array indexOf() restituisce il primo indice in cui un dato elemento può essere trovato nell'array, oppure -1 se l'elemento non è presente.
const getCurrentSongIndex = () => userData?.songs.indexOf(userData?.currentSong);

playButton.addEventListener("click", () => {
    if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
});

//funzioni ai bottoni
pauseButton.addEventListener("click",  pauseSong);

nextButton.addEventListener("click", playNextSong);

previousButton.addEventListener("click", playPreviousSong);

shuffleButton.addEventListener("click", shuffle);

//funzione da aggiungere quando finisce un brano
audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;

    if (nextSongExists) {
      playNextSong();
    } else {
      userData.currentSong = null;
      userData.songCurrentTime = 0;  
pauseSong();
setPlayerDisplay();
highlightCurrentSong();
setPlayButtonAccessibleText();

    }
});

//per ordinarli in ordine alfabetico
const sortSongs = () => {
  userData?.songs.sort((a,b) => {
    if (a.title < b.title) {
      return -1;
    }

    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });

  return userData?.songs;
};

renderSongs(sortSongs()); //richiama la funzione per mostrare la lista canzoni
setPlayButtonAccessibleText(); //testo accessibile aria-text