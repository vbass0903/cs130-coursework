const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    fetch(baseURL + `?type=track&q=${term}&limit=5`)
    .then(
        response => {
            return (response.json())
        }
    )
    .then(tracks => {
        tracks = tracks[0]
        document.querySelector('#tracks').innerHTML = ""
        for (track in tracks) {
            document.querySelector('#tracks').innerHTML +=
            `<section class="track-item preview" data-preview-track="${track.preview_url}">
                 <img src="${track.album.image_url}">
                 <i class="fas play-track fa-play" aria-hidden="true"></i>
                 <div class="label">
                     <h3>${track.name}</h3>
                     <p>
                        ${track.artist.name}
                     </p>
                 </div>
             </section>`
        }
        
    }

    )
};

const getAlbums = (term) => {
//     fetch(baseURL + `?type=album&q=${term}`)
//   .then(response => response.json())
//   .then(data => console.log(data));
    console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);
};

const getArtist = (term) => {
    fetch(baseURL + `?type=artist&q=${term}`)
        .then(
            response => {
                return (response.json())
            }
        )
        .then (artist => {
            artist = artist[0]
            document.querySelector('#artist').innerHTML =
            `<section class="artist-card" id="${artist.id}">
                <div>
                    <img src="${artist.image_url}">
                    <h3>${artist.name}</h3>
                    <div class="footer">
                        <a href="${artist.spotify_url}" target="_blank">
                            view on spotify
                        </a>
                    </div>
                </div>
            </section>`
        })
};


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};