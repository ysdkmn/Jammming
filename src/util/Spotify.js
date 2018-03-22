const clientId = '2fc72505568c435da9edcf298ece8c1d';
const secret ='498e0746fc264aeeba09135a40761515';
const redirectUri = 'http://localhost:3000';
let accessToken = '';

const Spotify = {
  async search() {
    try {
      let response = await fetch(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`);
      if (response.ok) {
        console.log(response);
      }
      throw new Error('Request failed!');
    } catch(error) {
      console.log(error);
    }
  }
}

export default Spotify;
