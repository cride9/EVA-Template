const fs = require('fs');
const { resolvePath, sanitizeAgentPath } = require('../../utils/sandbox');
const he = require('he'); // Add this dependency: npm install he

class WriteFile {
    get name() { return 'writefile'; }

    async execute(args, context) {
        const { filename, content } = args;
        if (!filename) return "Error: 'filename' argument is required.";
        if (content === undefined || content === null) return "Error: 'content' argument is required.";

        const sanitizedFilename = sanitizeAgentPath(filename);
        const filePath = resolvePath(context.sessionPath, `${context.cwd}/${sanitizedFilename}`);

        // Decode escaped HTML entities like &lt; &gt; &amp; etc.
        const decodedContent = he.decode(content);

        fs.writeFileSync(filePath, decodedContent, 'utf-8');

        return `Successfully wrote content to file: ${sanitizedFilename}`;
    }
}

module.exports = WriteFile;
