# 🎵 Lettore di Musica JavaScript

Benvenuto nel progetto del **Lettore di Musica**! Questo esercizio è stato realizzato per esercitarsi con JavaScript, in particolare con i metodi di manipolazione di stringhe e array. Il lettore di musica consente di riprodurre una playlist di brani, con funzionalità di riproduzione, pausa, avanzamento, ripetizione, cancellazione di brani e ripristino di brani.

Questo è il settimo esercizio del corso di freecodecamp.org (https://www.freecodecamp.org/), nello specifico https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/#learn-basic-string-and-array-methods-by-building-a-music-player

Lezione: Learn Basic String and Array Methods by Building a Music Player

## 🚀 Funzionalità

- **Riproduzione**: Ascolta i tuoi brani preferiti.
- **Pausa**: Metti in pausa la riproduzione in qualsiasi momento.
- **Avanzamento**: Passa al brano successivo.
- **Ripetizione**: Torna al brano precedente.
- **Casuale**: Mescola la playlist per un ascolto casuale.
- **Cancellazione**: Rimuovi i brani dalla playlist.

## 📚 JavaSCript Lesson
**Introduzione all'API Audio Web**: l'API Audio Web è supportata da tutti i browser moderni e consente di generare e processare audio nelle applicazioni web. Offre un controllo dettagliato sui suoni, permettendo di creare effetti sonori complessi, manipolare l'audio e costruire sintetizzatori (const audio = new Audio();)

 - **Proprietà**:
   - **src**: Specifica l'URL del file audio.
   - **currentTime**: Ottiene o imposta la posizione corrente di riproduzione in secondi.
   - **duration**: Restituisce la durata totale del file audio in secondi (solo lettura).
   - **paused**: Restituisce un valore booleano che indica se l'audio è in pausa (solo lettura).
   - **volume**: Ottiene o imposta il volume del suono (un valore tra 0.0 e 1.0).

 - **Metodi**:
   - **play()**: Avvia la riproduzione dell'audio.
   - **pause()**: Mette in pausa la riproduzione dell'audio.
   - **load()**: Ricarica l'elemento audio.
  
**Operatore copia Array**
songs: [...allSongs], permette di fare una copia di un array esistente.

**Arrow Function**
const song = userData?.songs.find((song) => song.id === id);

**Optional Chaining**
?. Optional Chaining è una funzione che permette di accedere all'array senza verificare se tutti i livelli intermedi esistano. Previene errori nel caso in cui le proprietà sono null o indefinite.

## 📜 Licenza
Questo progetto è rilasciato sotto la licenza MIT. Vedi il file LICENSE per maggiori dettagli.
