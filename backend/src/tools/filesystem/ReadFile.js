const fs = require('fs');
const pdf = require('pdf-parse');
const { resolvePath, sanitizeAgentPath } = require('../../utils/sandbox'); // Import new function

class ReadFile {
    get name() { return 'readfile'; }

    async execute(args, context) {
        const { filename } = args;
        if (!filename) return "Error: 'filename' argument is required.";

        const filePath = resolvePath(context.sessionPath, `${context.cwd}/${filename}`);

        if (!fs.existsSync(filePath)) {
            return `Error: File not found at '${filename}'.`;
        }

        if (filename.toLowerCase().endsWith('.pdf')) {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdf(dataBuffer);
            return `Content of PDF file '${filename}':\n\n${data.text}`;
        } else {
            const content = fs.readFileSync(filePath, 'utf-8');
            return `Content of '${filename}':\n\`\`\`\n${content}\n\`\`\``;
        }
    }
}

module.exports = ReadFile;