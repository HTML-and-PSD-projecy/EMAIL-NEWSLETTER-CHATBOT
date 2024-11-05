// Function to initialize article data from localStorage or set default values
function initializeArticles() {
    const articles = document.querySelectorAll('.article');
    articles.forEach(article => {
        const articleId = article.dataset.articleId;
        const storedData = JSON.parse(localStorage.getItem(articleId)) || { likes: 0, views: 0, comments: [] };

        // Set initial values
        article.querySelector('.like-count').textContent = storedData.likes;
        article.querySelector('.view-count').textContent = storedData.views;
        article.querySelector('.comment-count').textContent = storedData.comments.length;

        // Attach event listeners
        article.querySelector('.like-button').addEventListener('click', () => {
            storedData.likes++;
            updateArticleData(articleId, storedData.likes, storedData.views, storedData.comments);
            article.querySelector('.like-count').textContent = storedData.likes;
        });

        article.querySelector('.comment-toggle').addEventListener('click', () => {
            const commentsSection = article.querySelector('.comments-section');
            commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
            article.querySelector('.comment-list').innerHTML = ''; // Clear previous comments

            // Display existing comments
            storedData.comments.forEach(commentText => {
                const commentElement = document.createElement('div');
                commentElement.textContent = commentText;
                commentElement.classList.add('comment');
                article.querySelector('.comment-list').appendChild(commentElement);
            });
        });

        const commentInput = article.querySelector('.comment-input');
        const commentButton = article.querySelector('.comment-button');

        commentButton.addEventListener('click', () => {
            const commentText = commentInput.value.trim();
            if (commentText) {
                const commentElement = document.createElement('div');
                commentElement.textContent = commentText;
                commentElement.classList.add('comment');
                article.querySelector('.comment-list').appendChild(commentElement);
                commentInput.value = ''; // Clear input after submission

                // Update comments array and localStorage
                storedData.comments.push(commentText);
                updateArticleData(articleId, storedData.likes, storedData.views, storedData.comments);
                article.querySelector('.comment-count').textContent = storedData.comments.length; // Update comment count
            }
        });

        // Increment view count when the article is clicked
        article.addEventListener('click', () => {
            storedData.views++;
            updateArticleData(articleId, storedData.likes, storedData.views, storedData.comments);
            article.querySelector('.view-count').textContent = storedData.views;
        });
    });
}

// Function to update article data in localStorage
function updateArticleData(articleId, likes, views, comments) {
    const articleData = { likes, views, comments };
    localStorage.setItem(articleId, JSON.stringify(articleData));
}

// Filter event listeners for the buttons
document.getElementById('filterLikes').addEventListener('click', () => {
    filterArticlesByCount('like');
});

document.getElementById('filterViews').addEventListener('click', () => {
    filterArticlesByCount('view');
});

document.getElementById('filterComments').addEventListener('click', () => {
    filterArticlesByCount('comment');
});

// Filter articles by count
function filterArticlesByCount(type) {
    const articles = Array.from(document.querySelectorAll('.article'));
    articles.sort((a, b) => {
        const aCount = parseInt(a.querySelector(`.${type}-count`).textContent);
        const bCount = parseInt(b.querySelector(`.${type}-count`).textContent);
        return bCount - aCount; // Sort in descending order
    });

    const container = document.querySelector('body'); // Use body since container was removed
    articles.forEach(article => container.appendChild(article)); // Re-attach sorted articles
}

// Search bar event listener
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const articles = document.querySelectorAll('.article');

    articles.forEach(article => {
        const title = article.querySelector('h2').textContent.toLowerCase();
        const content = article.querySelector('p').textContent.toLowerCase();

        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            article.style.display = ''; // Show article
        } else {
            article.style.display = 'none'; // Hide article
        }
    });
});

// Initialize articles on page load
initializeArticles();
