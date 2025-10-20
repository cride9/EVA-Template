const fetch = require('node-fetch');
const cheerio = require('cheerio');

class GetTextFromWebPage {
    get name() { return 'gettextfromwebpage'; }

    async execute(args, context) {
        const { url } = args;
        if (!url) return "Error: 'url' argument is required.";

        try {
            const response = await fetch(url, {
                headers: { 'User-Agent': 'Mozilla/5.0' }
            });
            if (!response.ok) {
                return `Error: Failed to fetch URL. Status: ${response.statusText}`;
            }
            const html = await response.text();
            const $ = cheerio.load(html);

            // Remove unwanted elements
            $('script, style, nav, header, footer, aside, noscript').remove();
            
            // Get text from body, clean it up
            const text = $('body').text();
            const cleanText = text.replace(/\s\s+/g, ' ').replace(/\n\s*\n/g, '\n').trim();
            
            return cleanText.substring(0, 8000); // Limit response size
        } catch (error) {
            return `Error scraping web page: ${error.message}`;
        }
    }
}

module.exports = GetTextFromWebPage;