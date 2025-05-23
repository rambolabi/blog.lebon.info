// Blog data - Add new posts here (newest first)
const blogPosts = [
    {
        id: 4,
        title: "Advanced Security Best Practices for 2025",
        date: "2025-05-23",
        tags: ["Security", "Tips and Tricks"],
        content: "In today's digital landscape, security remains paramount. Here are the latest best practices every organization should implement to stay protected against emerging threats. From zero-trust architecture to advanced encryption methods, we'll cover everything you need to know."
    },
    {
        id: 3,
        title: "Essential Productivity Tips for Remote Work",
        date: "2025-05-20",
        tags: ["Tips and Tricks", "Nice to know", "Test"],
        content: "Working remotely has become the new normal for many professionals. These proven productivity techniques will help you maintain focus, manage your time effectively, and create a healthy work-life balance while working from home."
    },
    {
        id: 2,
        title: "Understanding Modern Web Development Trends",
        date: "2025-05-18",
        tags: ["Nice to know"],
        content: "The web development landscape is constantly evolving. From new JavaScript frameworks to emerging design patterns, stay up-to-date with the latest trends that are shaping how we build web applications in 2025."
    },
    {
        id: 1,
        title: "Cybersecurity Fundamentals Everyone Should Know",
        date: "2025-05-15",
        tags: ["Security", "Nice to know"],
        content: "Cybersecurity isn't just for IT professionals anymore. Every internet user should understand these fundamental concepts to protect themselves online. Learn about password management, phishing detection, and basic security hygiene practices."
    }
];

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
            <div class="post-content">
                <p>${post.content}</p>
            </div>
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
function addNewBlogPost(title, content, tags, date = new Date().toISOString().split('T')[0]) {
    const newPost = {
        id: blogPosts.length + 1,
        title: title,
        date: date,
        tags: tags,
        content: content
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

// Example of how to add a new post from backend:
// addNewBlogPost(
//     "New Blog Post Title",
//     "This is the content of the new blog post...",
//     ["Security", "Tips and Tricks"],
//     "2025-05-24"
// );