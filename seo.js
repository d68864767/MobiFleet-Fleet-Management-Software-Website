// Importing necessary modules
const fs = require('fs');
const cheerio = require('cheerio');
const SEOChecker = require('seo-checker');

// List of HTML files to check
const htmlFiles = ['index.html', 'features.html', 'pricing.html', 'demo_signup.html', 'testimonials.html', 'blog.html', 'contact.html'];

// Function to load HTML file and return a Cheerio object
function loadHTML(file) {
    const html = fs.readFileSync(file, 'utf-8');
    return cheerio.load(html);
}

// Function to check SEO of a page
function checkSEO($) {
    // Check title length
    const title = $('title').text();
    if (title.length < 50 || title.length > 60) {
        console.log(`Warning: Title length should be between 50-60 characters. Current length is ${title.length}.`);
    }

    // Check meta description length
    const metaDescription = $('meta[name="description"]').attr('content');
    if (metaDescription.length < 50 || metaDescription.length > 160) {
        console.log(`Warning: Meta description length should be between 50-160 characters. Current length is ${metaDescription.length}.`);
    }

    // Check for H1 tags
    if ($('h1').length > 1) {
        console.log('Warning: There should only be one H1 tag per page.');
    }

    // Check for alt attributes on images
    $('img').each((i, img) => {
        if (!$(img).attr('alt')) {
            console.log('Warning: All images should have an alt attribute.');
        }
    });

    // Check for broken links
    $('a').each((i, link) => {
        if ($(link).attr('href') === '#') {
            console.log('Warning: Found a broken link.');
        }
    });
}

// Run SEO checks on all HTML files
htmlFiles.forEach(file => {
    console.log(`Checking SEO for ${file}...`);
    const $ = loadHTML(file);
    checkSEO($);
});
