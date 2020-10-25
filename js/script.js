'use strict';

// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   });

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

  function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  function clearList() {
    titleList.innerHTML = '';
  }
  clearList();
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  // console.log(articles)
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    // console.log(articleId)
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    // console.log(articleTitle)
    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTML =
      '<li><a href="' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
    /* insert link into titleList */
    titleList.innerHTML = titleList.innerHTML + linkHTML;
    {
      const titleClickHandler = function (event) {
        event.preventDefault();
        console.log('Link was clicked!');
        console.log(event);
    
        const clickedElement = this;
    
        /* remove class 'active' from all article links  */
    
        const activeLinks = document.querySelectorAll('.titles a.active');
    
        for (let activeLink of activeLinks) {
          activeLink.classList.remove('active');
        }
    
        /* add class 'active' to the clicked link */
    
        clickedElement.classList.add('active');
    
        /* remove class 'active' from all articles */
    
        const activeArticles = document.querySelectorAll('.posts article.active');
    
        for (let activeArticle of activeArticles) {
          activeArticle.classList.remove('active');
        }
    
        /* get 'href' attribute from the clicked link */
        const correctArticle = document
          .querySelector('.titles a.active')
          .getAttribute('href');
        console.log(correctArticle);
    
        /* find the correct article using the selector (value of 'href' attribute) */
        const articleId = document.getElementById(correctArticle);
        console.log(articleId);
    
        /* add class 'active' to the correct article */
        articleId.classList.add('active');
        console.log('clickedElement (with plus): ' + clickedElement);
      };
    
      const links = document.querySelectorAll('.titles a');
    
      for (let link of links) {
        link.addEventListener('click', titleClickHandler);
      }
    }
  }
}

generateTitleLinks();



{
  function generateTags(){
    /* find all articles */
    const articles = document.querySelectorAll('article');
    // console.log(articles);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      let tagsWrapper = article.querySelector(optArticleTagsSelector);
      // console.log(tagsWrapper);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      // console.log(articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      // console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        /* generate HTML of the link */
        let tagToAdd =  '<li><a href="tag-' + tag +'"> '+ tag +' </a></li>'
        /* add generated code to html variable */   
        html = html + tagToAdd + ' ';
      }
        /* END LOOP: for each tag */
      console.log(html)
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = tagsWrapper.innerHTML + html;
    /* END LOOP: for every article: */
    }
  }
  
  generateTags();
}

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.split('tag-')[1];
  console.log(tag)
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="tag-"]');
  console.log('activeTagLinks ' + activeTagLinks);
  /* START LOOP: for each active tag link */
  for (let tag of activeTagLinks) {
    console.log(tag)
    /* remove class active */
    tag.classList.remove('active');  
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tags = document.querySelectorAll(`a[href^=${href}]`);
  console.log(tags);
  /* START LOOP: for each found tag link */
  for (let tagLink of tags) {
    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tags = document.querySelectorAll('a[href^="tag-"]');
  /* START LOOP: for each link */
  for (let tag of tags) {
    /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler)
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();
