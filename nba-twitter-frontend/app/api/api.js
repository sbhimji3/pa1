export const getName = () => {
    return fetch('https://us-central1-nba-twitter.cloudfunctions.net/app/name')
      .then(response => response.json())
      .then(json => {
        return json.name;
      })
      .catch(error => {
        console.error(error);
      });
};