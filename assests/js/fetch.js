fetch(
  'https://newsapi.org/v2/top-headlines?country=us&apiKey=d199684dc0a64bfeb06f85cc8baa0aaf',
)
  .then((response) => response.json())
  .then((data) => displayNews(data))
  .catch((error) => console.log(error));

function displayNews(data) {
  const articleMainDiv = document.querySelector('article');

  data.articles.forEach((article) => {
    // create a container for ONE article
    const articleContainer = document.createElement('div');
    articleContainer.classList.add('container', 'py-5', 'articles-container');

    articleContainer.innerHTML = `
       <div class="row justify-content-between align-items-center g-4">
          <div class="col-md-6">
            <h3 class="author">Author: ${article.author || 'Unknown'}</h3>
            <p><small>${article.publishedAt}</small></p>
            <p class="description">${article.description || ''}</p>
          </div>
            
          <div class="col-md-6">
            <img
            class="d-block img-thumbnail mb-4"
            width="350px"
            src="${article.urlToImage || ''}"
            alt=""
            <p>
              <small class="title">Title: ${article.title}</small>
            </p>
          </div>  
      </div>
    `;

    // add article to the page
    articleMainDiv.appendChild(articleContainer);
  });
}
