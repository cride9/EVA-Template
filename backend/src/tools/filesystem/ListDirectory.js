const fs = require('fs');
const path = require('path');
const { resolvePath, sanitizeAgentPath } = require('../../utils/sandbox');

class ListDirectory {
    get name() { return 'listdirectory'; }

    async execute(args, context) {
        try {
            const currentPath = resolvePath(context.sessionPath, context.cwd);

            if (!fs.existsSync(currentPath)) {
                return `Error: Current directory not found: /${context.cwd}`;
            }

            const entries = fs.readdirSync(currentPath, { withFileTypes: true });

            if (entries.length === 0) {
                return `Directory /${context.cwd} is empty.`;
            }

            const listings = entries.map(entry =>
                entry.isDirectory() ? `[DIR]  ${entry.name}` : `[FILE] ${entry.name}`
            );

            return `Contents of /${context.cwd}:\n${listings.join('\n')}`;

        } catch (error) {
            return `Error listing directory: ${error.message}`;
        }
    }
}

module.exports = ListDirectory;