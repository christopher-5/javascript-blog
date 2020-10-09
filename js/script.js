'use strict';

// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   });

const titleClickHandler = function(event){
    event.preventDefault();
    console.log('Link was clicked!');
    console.log(event);

    const clickedElement = this;
  
    /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
  
    /* add class 'active' to the clicked link */

    clickedElement.classList.add('active');
  
    /* remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
  
    /* get 'href' attribute from the clicked link */
    const correctArticle = document.querySelector('.titles a.active').getAttribute('href');
    console.log(correctArticle);
  
    /* find the correct article using the selector (value of 'href' attribute) */
    const articleId = document.getElementById(correctArticle);
    console.log(articleId);

    /* add class 'active' to the correct article */
    articleId.classList.add('active');
    console.log('clickedElement (with plus): ' + clickedElement);
}
  
const links = document.querySelectorAll('.titles a');
  
for(let link of links){
    link.addEventListener('click', titleClickHandler);
}