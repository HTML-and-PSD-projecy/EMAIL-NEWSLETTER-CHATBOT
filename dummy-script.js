document.addEventListener("DOMContentLoaded", () => {
    const articlesCount = 5;
    const articleList = document.querySelector('.article-list');
    const searchBar = document.getElementById('search-bar');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Load and save articlesData (views, likes, comments persist using localStorage)
    function loadArticlesData() {
        const storedData = localStorage.getItem('articlesData');
        return storedData ? JSON.parse(storedData) : Array.from({ length: articlesCount }, (_, index) => ({
            index,
            views: 0,
            likes: 0,
            comments: 0,
            title: `Article Title ${index + 1}`,
            commentList: []
        }));
    }

    function saveArticlesData() {
        localStorage.setItem('articlesData', JSON.stringify(articlesData));
    }

    let articlesData = loadArticlesData();

    // Function to generate an article in the DOM
    function generateArticle(articleData) {
        const section = document.createElement("section");
        section.classList.add("article-container");

        const article = document.createElement("article");
        article.classList.add("article-content");

        const title = document.createElement("h1");
        title.textContent = articleData.title;

        const para = document.createElement("p");
        para.textContent = "This is an example of an article inside a container. You can add more content, images, or other HTML elements to this section to complete your article.";

        const image = document.createElement("img");
        image.classList.add("article-image");
        image.src = "image.png";
        image.alt = "Article Image";

        const interactionSection = document.createElement("div");
        interactionSection.classList.add("interaction-section");

        const likeBtn = document.createElement("button");
        likeBtn.classList.add("like-btn");
        likeBtn.textContent = "Like";

        const likeCount = document.createElement("span");
        likeCount.classList.add("like-count");
        likeCount.textContent = `${articleData.likes} Likes`;

        const viewCount = document.createElement("span");
        viewCount.classList.add("view-count");
        viewCount.textContent = `${articleData.views} Views`;

        const commentBtn = document.createElement("button");
        commentBtn.classList.add("comment-btn");
        commentBtn.textContent = "Comment";

        interactionSection.appendChild(likeBtn);
        interactionSection.appendChild(likeCount);
        interactionSection.appendChild(viewCount);
        interactionSection.appendChild(commentBtn);

        const commentSection = document.createElement("div");
        commentSection.classList.add("comment-section");

        const commentBox = document.createElement("textarea");
        commentBox.classList.add("comment-box");
        commentBox.placeholder = "Write a comment...";

        const submitComment = document.createElement("button");
        submitComment.classList.add("submit-comment");
        submitComment.textContent = "Submit";

        const commentList = document.createElement("div");
        commentList.classList.add("comment-list");

        const commentCounter = document.createElement("span");
        commentCounter.classList.add("comment-count");
        commentCounter.textContent = `${articleData.comments} Comments`;

        articleData.commentList.forEach(commentText => {
            const commentItem = document.createElement('p');
            commentItem.textContent = commentText;
            commentList.appendChild(commentItem);
        });

        commentSection.appendChild(commentBox);
        commentSection.appendChild(submitComment);
        commentSection.appendChild(commentList);

        article.appendChild(title);
        article.appendChild(para);
        article.appendChild(image);
        article.appendChild(interactionSection);
        article.appendChild(commentSection);
        article.appendChild(commentCounter);

        section.appendChild(article);
        articleList.appendChild(section);

        let viewCounter = articleData.views;

        // Track views on article click
        article.addEventListener('click', () => {
            viewCounter++;
            viewCount.textContent = `${viewCounter} Views`;
            articleData.views = viewCounter;
            saveArticlesData();
        });

        // Like button functionality
        likeBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            articleData.likes++;
            likeCount.textContent = `${articleData.likes} Likes`;
            saveArticlesData();
        });

        // Toggle comment section
        commentBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            commentSection.style.display = commentSection.style.display === 'none' || commentSection.style.display === '' ? 'block' : 'none';
        });

        // Submit comment functionality
        submitComment.addEventListener('click', (event) => {
            event.stopPropagation();
            const commentText = commentBox.value.trim();
            if (commentText) {
                const newComment = document.createElement('p');
                newComment.textContent = commentText;
                commentList.appendChild(newComment);
                articleData.comments++;
                articleData.commentList.push(commentText);
                commentCounter.textContent = `${articleData.comments} Comments`;
                saveArticlesData();
                commentBox.value = '';
            }
        });
    }

    // Search functionality
    searchBar.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        articleList.innerHTML = '';
        const filteredArticles = articlesData.filter(article => article.title.toLowerCase().includes(searchTerm));
        filteredArticles.forEach(articleData => generateArticle(articleData));
    });

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const filterType = event.target.getAttribute('data-filter');
            let sortedArticles = [...articlesData];

            if (filterType === 'views') {
                sortedArticles.sort((a, b) => b.views - a.views);
            } else if (filterType === 'likes') {
                sortedArticles.sort((a, b) => b.likes - a.likes);
            } else if (filterType === 'comments') {
                sortedArticles.sort((a, b) => b.comments - a.comments);
            } else if (filterType === 'alphabetical') {
                sortedArticles.sort((a, b) => a.title.localeCompare(b.title));
            }

            articleList.innerHTML = '';
            sortedArticles.forEach(articleData => generateArticle(articleData));
        });
    });

    // Initial load of articles
    articlesData.forEach(articleData => generateArticle(articleData));
});
