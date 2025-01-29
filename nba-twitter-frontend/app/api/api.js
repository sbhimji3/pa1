export const postSearch = async (name) => {
  const data = { name: name };

  try {
    const response = await fetch('https://ca15de59-957a-4b6e-9dfc-f158c87aad6d.us-east-1.cloud.genez.io/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(response)

    const json = await response.json(); 
    const { name, visits } = json;
    return { name, visits };
  } catch (error) {
    console.error('Error during POST request:', error);
  }
}

export const getSearch = async (name) => {
  
  try {
    const newsResponse = await fetch(`https://ca15de59-957a-4b6e-9dfc-f158c87aad6d.us-east-1.cloud.genez.io/news?text=${name}`);
    const newsData = await newsResponse.json();
    
    const articlesList = newsData.articles.map(article => ({
      source: article.source.name,
      title: article.title,
    }));
    console.log(articlesList.slice(0,3))
    return articlesList
    
    
  } catch (error) {
  }
}