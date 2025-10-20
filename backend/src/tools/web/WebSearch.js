const fetch = require('node-fetch');

class WebSearch {
    get name() { return 'websearch'; }

    async execute(args, context) {
        const { query } = args;
        if (!query) return "Error: 'query' argument is required.";

        const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
        const engineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

        if (!apiKey || !engineId) {
            return "Error: Google Search API key or Engine ID is not configured on the server.";
        }

        const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${engineId}&q=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                return data.items.slice(0, 5).map((item, index) => 
                    `${index + 1}. ${item.title}\n   Link: ${item.link}\n   Snippet: ${item.snippet}`
                ).join('\n\n');
            } else {
                return "No search results found.";
            }
        } catch (error) {
            return `Error during web search: ${error.message}`;
        }
    }
}

module.exports = WebSearch;