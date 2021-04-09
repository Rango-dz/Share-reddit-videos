const axios = require('axios').default;

axios.get('https://www.reddit.com/r/Pikabu/comments/k2t0qo/%D1%80%D0%B8%D0%B0%D0%BB_%D1%81%D0%BB%D0%B8%D0%BC_%D1%88%D0%B5%D0%B9%D0%B4%D0%B8/')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

// Optionally the request above could also be done as
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });  

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}