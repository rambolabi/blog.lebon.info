
// Global variables
let currentFilter = { type: null, value: null };
let allTags = [];
let allDates = [];

// Initialize the blog
document.addEventListener('DOMContentLoaded', function() {
    extractTagsAndDates();
    renderTagFilters();
    renderDateFilters();
    renderBlogPosts();
    setupEventListeners();
});

// Extract unique tags and dates from blog posts
function extractTagsAndDates() {
    const tagSet = new Set();
    const dateSet = new Set();
    
    blogPosts.forEach(post => {
        post.tags.forEach(tag => tagSet.add(tag));
        dateSet.add(formatDateForFilter(post.date));
    });
    
    allTags = Array.from(tagSet).sort();
    allDates = Array.from(dateSet).sort().reverse(); // Most recent first
}

// Format date for display in filters
function formatDateForFilter(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
    });
}

// Format date for display in posts
function formatDateForPost(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Render tag filters in sidebar
function renderTagFilters() {
    const tagFilters = document.getElementById('tagFilters');
    tagFilters.innerHTML = '';
    
    allTags.forEach(tag => {
        const button = document.createElement('button');
        button.className = 'tag-filter';
        button.textContent = tag;
        button.onclick = () => filterByTag(tag);
        tagFilters.appendChild(button);
    });
}

// Render date filters in sidebar
function renderDateFilters() {
    const dateScroll = document.getElementById('dateScroll');
    dateScroll.innerHTML = '';
    
    allDates.forEach(date => {
        const button = document.createElement('button');
        button.className = 'date-item';
        button.textContent = date;
        button.onclick = () => filterByDate(date);
        dateScroll.appendChild(button);
    });
}

// Render blog posts
function renderBlogPosts(postsToRender = blogPosts) {
    const blogPostsContainer = document.getElementById('blogPosts');
    blogPostsContainer.innerHTML = '';
    
    if (postsToRender.length === 0) {
        const noPostsMsg = document.createElement('div');
        noPostsMsg.className = 'blog-post';
        noPostsMsg.innerHTML = '<h2>No posts found</h2><p>No blog posts match your current filter criteria.</p>';
        blogPostsContainer.appendChild(noPostsMsg);
        return;
    }
    
    postsToRender.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'blog-post';
        
        // Build content HTML
        let contentHTML = '';
        
        // Handle content (array of paragraphs or single string)
        if (Array.isArray(post.content)) {
            contentHTML = post.content.map(paragraph => `<p>${paragraph}</p>`).join('');
        } else {
            contentHTML = `<p>${post.content}</p>`;
        }
        
        // Add image if present
        let imageHTML = '';
        if (post.image) {
            imageHTML = `<div class="post-image">
                <img src="${post.image}" alt="${post.title}" />
            </div>`;
        }
        
        // Add more link if present
        let moreLinkHTML = '';
        if (post.moreLink) {
            moreLinkHTML = `<div class="post-more-link">
                <a href="${post.moreLink.url}" target="_blank" rel="noopener noreferrer">
                    ${post.moreLink.text} →
                </a>
            </div>`;
        }
        
        // Add source if present
        let sourceHTML = '';
        if (post.source) {
            sourceHTML = `<div class="post-source">
                <span>Source: </span>
                <a href="${post.source.url}" target="_blank" rel="noopener noreferrer">
                    ${post.source.text}
                </a>
            </div>`;
        }
        
        postElement.innerHTML = `
            <div class="post-header">
                <h2 class="post-title">${post.title}</h2>
                <div class="post-meta">
                    <div class="post-date">${formatDateForPost(post.date)}</div>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
            ${imageHTML}
            <div class="post-content">
                ${contentHTML}
            </div>
            ${moreLinkHTML}
            ${sourceHTML}
        `;
        blogPostsContainer.appendChild(postElement);
    });
}

// Filter posts by tag
function filterByTag(tag) {
    currentFilter = { type: 'tag', value: tag };
    updateActiveFilters();
    
    const filteredPosts = blogPosts.filter(post => 
        post.tags.includes(tag)
    );
    
    renderBlogPosts(filteredPosts);
}

// Filter posts by date
function filterByDate(date) {
    currentFilter = { type: 'date', value: date };
    updateActiveFilters();
    
    const filteredPosts = blogPosts.filter(post => 
        formatDateForFilter(post.date) === date
    );
    
    renderBlogPosts(filteredPosts);
}

// Clear all filters
function clearAllFilters() {
    currentFilter = { type: null, value: null };
    updateActiveFilters();
    renderBlogPosts();
}

// Update active filter styling
function updateActiveFilters() {
    // Remove active class from all filters
    document.querySelectorAll('.tag-filter, .date-item').forEach(el => {
        el.classList.remove('active');
    });
    
    // Add active class to current filter
    if (currentFilter.type === 'tag') {
        const tagButtons = document.querySelectorAll('.tag-filter');
        tagButtons.forEach(button => {
            if (button.textContent === currentFilter.value) {
                button.classList.add('active');
            }
        });
    } else if (currentFilter.type === 'date') {
        const dateButtons = document.querySelectorAll('.date-item');
        dateButtons.forEach(button => {
            if (button.textContent === currentFilter.value) {
                button.classList.add('active');
            }
        });
    }
}

// Setup event listeners
function setupEventListeners() {
    const clearFiltersBtn = document.getElementById('clearFilters');
    clearFiltersBtn.addEventListener('click', clearAllFilters);
}

// Function to add new blog post (for backend use)
function addNewBlogPost(title, content, tags, options = {}) {
    const {
        date = new Date().toISOString().split('T')[0],
        image = null,
        moreLink = null,
        source = null
    } = options;
    
    const newPost = {
        id: blogPosts.length + 1,
        title: title,
        date: date,
        tags: tags,
        content: content, // Can be array of paragraphs or single string
        ...(image && { image }),
        ...(moreLink && { moreLink }),
        ...(source && { source })
    };
    
    // Add to beginning of array (newest first)
    blogPosts.unshift(newPost);
    
    // Re-extract tags and dates
    extractTagsAndDates();
    
    // Re-render everything
    renderTagFilters();
    renderDateFilters();
    renderBlogPosts();
}

// Examples of how to add new posts from backend:

// Simple post with multiple paragraphs:
// addNewBlogPost(
//     "Simple Multi-paragraph Post",
//     [
//         "This is the first paragraph of the blog post.",
//         "This is the second paragraph with more detailed information.",
//         "And here's the conclusion paragraph."
//     ],
//     ["Tips and Tricks"]
// );

// Complete post with all optional elements:
// addNewBlogPost(
//     "Complete Blog Post Example",
//     [
//         "This is a comprehensive blog post example.",
//         "It includes multiple paragraphs of content.",
//         "Each paragraph provides valuable information to readers."
//     ],
//     ["Security", "Nice to know"],
//     {
//         date: "2025-05-24",
//         image: "https://example.com/image.jpg",
//         moreLink: {
//             text: "Read the full article",
//             url: "https://example.com/full-article"
//         },
//         source: {
//             text: "Research from Tech University",
//             url: "https://techuniversity.edu/research"
//         }
//     }
// );

// Simple single-paragraph post:
// addNewBlogPost(
//     "Simple Post Title",
//     "This is a simple post with just one paragraph of content.",
//     ["Nice to know"]
// );