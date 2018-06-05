const clientId = '2fc72505568c435da9edcf298ece8c1d';
const redirectUri = 'http://jammin1986.surge.sh/';
let accessToken = '';

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else if (window.location.href.includes('access_token')) {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      let expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}&show_dialog=true`;
    }
  },

  async search(searchTerm) {
    try {
      let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      });
      if (response.ok) {
        let jsonResponse = await response.json();
        if (jsonResponse.tracks) {
          return jsonResponse.tracks.items.map(track => {
            return ({id: track.id, album: track.album.name, artist: track.artists[0].name, title: track.name, uri: track.uri});
          });
        }
      }
      throw new Error('Request failed!');
    } catch (error) {
      console.log(error);
    }
  },

  savePlaylist(name, tracks) {
    let userId;
    return fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
    }).then(jsonResponse => {
      if (jsonResponse.id) {
          userId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${jsonResponse.id}/playlists`, {
            headers: {
              Authorization: 'Bearer ' + accessToken,
              'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({name: name})
          });
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
    }).then((jsonResponse) => {
      if (jsonResponse.id) {
         return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${jsonResponse.id}/tracks`, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          },
          method: 'post',
          body: JSON.stringify({
            "uris": tracks.filter(track => track.selected).map(track => track.uri)
          })
        })
      }
    })
    .catch(err => {
      console.error('Request failed', err)
    });
  }
}

export default Spotify;
