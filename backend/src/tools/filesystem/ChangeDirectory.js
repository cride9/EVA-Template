const path = require('path');
const fs = require('fs');
const { resolvePath } = require('../../utils/sandbox');

class ChangeDirectory {
  get name() { return 'changedirectory'; }

  async execute(args, context) {
    const { dirname } = args;
    if (!dirname) return "Error: 'dirname' argument is required.";

    let newCwd;
    if (dirname.trim() === '/') {
      newCwd = 'workspace';
    } else if (dirname.trim() === '..') {
      newCwd = path.dirname(context.cwd);
      if (newCwd === '.') newCwd = 'workspace';
    } else {
      // prevent redundant nesting
      newCwd = path.join(context.cwd, dirname).replace(/^workspace[\\/]+/, 'workspace/');
    }

    try {
      const fullNewPath = resolvePath(context.sessionPath, newCwd);
      if (!fs.existsSync(fullNewPath) || !fs.statSync(fullNewPath).isDirectory()) {
        return `Error: Directory not found at '${dirname}'`;
      }

      context.updateCwd(newCwd);
      return `Successfully changed directory to /${newCwd}`;
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }
}

module.exports = ChangeDirectory;
