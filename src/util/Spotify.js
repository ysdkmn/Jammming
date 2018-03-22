const clientId = '2fc72505568c435da9edcf298ece8c1d';
const secret ='498e0746fc264aeeba09135a40761515';
const redirect_uri = 'http://localhost:3000';

const Spotify = {
  async search() {
    try {
      let response = await fetch(`https://accounts.spotify.com/en/authorize/?client_id=${clientId}&response_type=code&scope=user-read-private playlist-modify-private&redirect_uri=${redirect_uri}`);
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
