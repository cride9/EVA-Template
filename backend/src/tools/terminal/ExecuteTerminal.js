const { exec } = require('child_process');
const { resolvePath, sanitizeAgentPath } = require('../../utils/sandbox'); // Import new function

class ExecuteTerminal {
    get name() { return 'executeterminal'; }

    async execute(args, context) {
        const { command } = args;
        if (!command) return "Error: 'command' argument is required.";

        // WARNING: This is still a dangerous tool. Ensure your backend is properly secured.
        // The command will run inside the user's sandboxed CWD.
        const cwdPath = resolvePath(context.sessionPath, context.cwd);

        return new Promise((resolve) => {
            exec(command, { cwd: cwdPath, timeout: 30000 }, (error, stdout, stderr) => {
                if (error) {
                    resolve(`Error: ${error.message}\nStderr: ${stderr}`);
                    return;
                }
                if (stderr) {
                    resolve(`Stderr: ${stderr}\nStdout: ${stdout || 'Command executed with no output.'}`);
                    return;
                }
                resolve(stdout || 'Command executed successfully.');
            });
        });
    }
}

module.exports = ExecuteTerminal;