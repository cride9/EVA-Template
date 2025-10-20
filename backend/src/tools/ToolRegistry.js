const fs = require('fs');
const path = require('path');

class ToolRegistry {
  constructor() {
    this.tools = new Map();
    this.loadTools();
  }

  loadTools() {
    const toolDirs = ['filesystem', 'task', 'terminal', 'web'];
    toolDirs.forEach(dir => {
      const dirPath = path.join(__dirname, dir);
      fs.readdirSync(dirPath).forEach(file => {
        if (file.endsWith('.js')) {
          const ToolClass = require(path.join(dirPath, file));
          const toolInstance = new ToolClass();
          this.tools.set(toolInstance.name.toLowerCase(), toolInstance);
          console.log(`Loaded tool: ${toolInstance.name}`);
        }
      });
    });
  }

  getTool(name) {
    return this.tools.get(name.toLowerCase());
  }
}

module.exports = { ToolRegistry };