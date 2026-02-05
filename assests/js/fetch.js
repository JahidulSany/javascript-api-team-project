// Fetch data using Fetch API
fetch('https://newsapi.org/v2/everything?q=tesla&from=2026-01-05&sortBy=publishedAt&apiKey=d199684dc0a64bfeb06f85cc8baa0aaf')
  .then((response) => response.json())
  .then((data) => displayNews(data))
  .catch((error) => console.log(error)); 

  function displayNews(articles) {
    console.log(articles);
  }


