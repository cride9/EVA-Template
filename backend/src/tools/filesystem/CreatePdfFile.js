const PDFDocument = require('pdfkit');
const MarkdownIt = require('markdown-it');
const fs = require('fs');
const { resolvePath, sanitizeAgentPath } = require('../../utils/sandbox'); // Import new function

class CreatePdfFile {
    get name() { return 'createpdffile'; }

    async execute(args, context) {
        const { filename, markdown_content } = args;
        if (!filename) return "Error: 'filename' argument is required.";
        if (!markdown_content) return "Error: 'markdown_content' is required.";

        const filePath = resolvePath(context.sessionPath, `${context.cwd}/${filename}`);

        if (fs.existsSync(filePath)) {
            return `Error: File '${filename}' already exists.`;
        }

        // Basic markdown-to-text conversion for PDFKit
        const md = new MarkdownIt();
        const textContent = md.render(markdown_content); // This is a limitation, pdfkit doesn't render HTML. For simplicity, we convert to text.
        // For a more advanced version, a library like 'html-pdf' would be needed to convert the rendered HTML.

        return new Promise((resolve, reject) => {
            const doc = new PDFDocument();
            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);
            
            // Simple text rendering. More complex parsing needed for full markdown support.
            doc.fontSize(12).text(textContent, {
                align: 'left'
            });

            doc.end();

            stream.on('finish', () => {
                resolve(`Successfully created PDF file: ${filename}`);
            });
            stream.on('error', (err) => {
                reject(err);
            });
        });
    }
}

module.exports = CreatePdfFile;