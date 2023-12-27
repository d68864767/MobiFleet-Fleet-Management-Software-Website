// Import necessary modules
const axios = require('axios');

// Social media links
const socialMediaLinks = {
    facebook: 'https://www.facebook.com/MobiFleet',
    twitter: 'https://twitter.com/MobiFleet',
    linkedin: 'https://www.linkedin.com/company/MobiFleet',
    instagram: 'https://www.instagram.com/MobiFleet'
};

// Function to initialize social media integration
function initSocialMedia() {
    // Add social media links to the website
    addSocialMediaLinks();

    // Add social media sharing buttons to blog posts
    addSharingButtons();
}

// Function to add social media links to the website
function addSocialMediaLinks() {
    const footer = document.querySelector('footer');

    // Create a div for the social media links
    const socialMediaDiv = document.createElement('div');
    socialMediaDiv.id = 'social-media-links';

    // Create and append the social media links
    for (let platform in socialMediaLinks) {
        let link = document.createElement('a');
        link.href = socialMediaLinks[platform];
        link.target = '_blank';
        link.innerText = platform.charAt(0).toUpperCase() + platform.slice(1);
        socialMediaDiv.appendChild(link);
    }

    // Append the social media links div to the footer
    footer.appendChild(socialMediaDiv);
}

// Function to add social media sharing buttons to blog posts
function addSharingButtons() {
    const blogPosts = document.querySelectorAll('.blog-post');

    blogPosts.forEach(post => {
        // Create a div for the sharing buttons
        const sharingDiv = document.createElement('div');
        sharingDiv.className = 'sharing-buttons';

        // Create and append the sharing buttons
        for (let platform in socialMediaLinks) {
            let button = document.createElement('button');
            button.innerText = `Share on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`;
            button.onclick = function() {
                shareOnSocialMedia(platform, post.id);
            };
            sharingDiv.appendChild(button);
        }

        // Append the sharing buttons div to the blog post
        post.appendChild(sharingDiv);
    });
}

// Function to share a blog post on social media
function shareOnSocialMedia(platform, postId) {
    // Get the blog post details
    axios.get(`/api/blog/${postId}`)
        .then(response => {
            const post = response.data;

            // Open a new window to share the blog post on the selected social media platform
            window.open(`${socialMediaLinks[platform]}?share=${post.title}&url=${post.url}`, '_blank');
        })
        .catch(error => {
            console.error(`Error sharing blog post on ${platform}: ${error}`);
        });
}

// Export the initSocialMedia function
module.exports = {
    initSocialMedia
};
