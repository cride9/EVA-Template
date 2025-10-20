const fs = require('fs');
const { resolvePath, sanitizeAgentPath } = require('../../utils/sandbox'); // Import new function

class CreateDirectory {
    get name() { return 'createdirectory'; }

    async execute(args, context) {
        const { dirname } = args;
        if (!dirname) return "Error: 'dirname' argument is required.";

        const sanitizedDirname = sanitizeAgentPath(dirname); // Sanitize the path
        const newDirPath = resolvePath(context.sessionPath, `${context.cwd}/${sanitizedDirname}`);

        if (fs.existsSync(newDirPath)) {
            return `Error: Directory '${sanitizedDirname}' already exists.`;
        }

        fs.mkdirSync(newDirPath, { recursive: true });
        return `Successfully created directory: ${sanitizedDirname}`;
    }
}

module.exports = CreateDirectory;