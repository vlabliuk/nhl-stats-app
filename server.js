const express = require('express');
const axios = require('axios')
const _server = express();

_server.use(express.static('public'));

  _server.get('/standings', async (req, res) => {
    try {
        const response = await axios.get('https://statsapi.web.nhl.com/api/v1/standings');
        const data = response.data;
        res.header('Access-Control-Allow-Origin', 'https://nhl-stats-portal.netlify.app');
        res.send(data);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving data');
      }
  });

  _server.get('/schedule', async (req, res) => {
    try {
        const response = await axios.get('https://statsapi.web.nhl.com/api/v1/schedule');
        const data = response.data;
        res.header('Access-Control-Allow-Origin', 'https://nhl-stats-portal.netlify.app');
        res.send(data);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving data');
      }
  });
  _server.get('/schedule/:date', async (req, res) => {
  try {
      const response = await axios.get('https://statsapi.web.nhl.com/api/v1/schedule?date=' + req.params.date);
      const data = response.data;
      res.header('Access-Control-Allow-Origin', 'https://nhl-stats-portal.netlify.app');
      res.send(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving data');
    }
  });
  _server.get('/teams', async (req, res) => {
    try {
        const response = await axios.get('https://statsapi.web.nhl.com/api/v1/teams');
        const data = response.data;
        res.header('Access-Control-Allow-Origin', 'https://nhl-stats-portal.netlify.app');
        res.send(data);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving data');
      }
  });
  _server.get('/teams/:id/roster', async (req, res) => {
    try {
        let response = await axios.get('https://statsapi.web.nhl.com/api/v1/teams/' + req.params.id + '/roster');
        const data = response.data.roster;
          for(let i = 0; i < data.length; i++){
            let playerID = data[i].person.id;
            url = ('https://statsapi.web.nhl.com/api/v1/people/' + playerID + '/stats?stats=statsSingleSeason&season=20222023');
            let info = await axios.get(url);
            data[i].stat = info.data.stats[0].splits[0].stat;
          }
        res.header('Access-Control-Allow-Origin', 'https://nhl-stats-portal.netlify.app');
        res.send(data);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving data');
      }
  });
  _server.get('/plater/:id/info', async (req, res) => {
    try {
      let  playersInfo;
        var playerID = req.params.id;
        url = API_URL + "/people/" + playerID; //"/stats?stats=statsSingleSeason&season=20222023";

        let response = await axios.get(url);
        const data = response.data.people[0];
        // playersInfo.roster.push({
          playersInfo.playerID = data.fullName;
          playersInfo.playerID = data.primaryNumber;
          playersInfo.playerID = data.birthDate;
          playersInfo.playerID = data.birthCity;
          playersInfo.playerID = data.birthCountry;
          playersInfo.playerID = data.height;
          playersInfo.playerID = data.weight;
          playersInfo.playerID = data.currentTeam.name;
          playersInfo.playerID = data.primaryPosition.name;
        res.header('Access-Control-Allow-Origin', 'https://nhl-stats-portal.netlify.app');
        res.send(playersInfo);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving data');
      }
  });

  // const response = await axios.get('https://statsapi.web.nhl.com/api/v1/people/' + req.params.id + '/stats?stats=statsSingleSeason&season=20222023');

_server.listen(8080, () => {
  console.log('Server listening on port 8080');
});