const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const playTrack = (ev) => {
    audioPlayer.setAudioFile(ev.currentTarget.dataset.previewTrack)
    const image = ev.currentTarget.children[0].src
    document.querySelector('footer .track-item').innerHTML = `<img src=${image}>`
    audioPlayer.play()
}


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
        document.querySelector('#tracks').innerHTML = ""
        if (tracks.length == 0) {
            document.querySelector('#tracks').innerHTML = "<h3>No tracks found</h3>"
        }
        else {
            for (let i = 0; i < tracks.length; i++) {
                document.querySelector('#tracks').innerHTML +=
                `<section onclick="playTrack(event)" class="track-item preview" data-preview-track="${tracks[i].preview_url}">
                     <img src="${tracks[i].album.image_url}">
                     <i class="fas play-track fa-play" aria-hidden="true"></i>
                     <div class="label">
                         <h3>${tracks[i].name}</h3>
                         <p>
                            ${tracks[i].artist.name}
                         </p>
                     </div>
                 </section>`
            }
        }        
    }

    )
};

const getAlbums = (term) => {
    fetch(baseURL + `?type=album&q=${term}`)
    .then(
        response => {
            return (response.json())
        }
    )
    .then(albums => {
        document.querySelector('#albums').innerHTML = ""
        if (albums.length == 0) {
            document.querySelector('#albums').innerHTML = "<h3>No albums found</h3>"
        }
        else {
            for (let i = 0; i < albums.length; i++) {
                document.querySelector('#albums').innerHTML +=
                `<section class="album-card" id="${albums[i].id}">
                    <div>
                        <img src="${albums[i].image_url}">
                        <h3>${albums[i].name}</h3>
                        <div class="footer">
                            <a href="${albums[i].spotify_url}" target="_blank">
                                view on spotify
                            </a>
                        </div>
                    </div>
                </section>`
            }
        }        
    }

    )
};

const getArtist = (term) => {
    fetch(baseURL + `?type=artist&q=${term}`)
        .then(
            response => {
                return (response.json())
            }
        )
        .then (artist => {
            if (artist.length == 0) {
                document.querySelector('#artist').innerHTML = "<h3>Artist not found</h3>"
            }
            else {
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
            }
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