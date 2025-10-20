const path = require('path');
const fs = require('fs');

function sanitizeAgentPath(agentPath) {
  if (!agentPath) return '';
  let sanitized = agentPath.startsWith('/') ? agentPath.substring(1) : agentPath;
  if (sanitized.startsWith('workspace/')) {
    sanitized = sanitized.substring('workspace/'.length);
  }
  return sanitized;
}

function resolvePath(sessionPath, userPath) {
  let normalized = userPath.replace(/^\/+/, '');

  const agentRoot = path.join(sessionPath, 'workspace');

  if (normalized.startsWith('workspace/')) {
    normalized = normalized.substring('workspace/'.length);
  }

  const intendedPath = path.resolve(agentRoot, normalized);

  if (!intendedPath.startsWith(agentRoot)) {
    throw new Error(`Access denied. Path traversal attempt detected: ${userPath}`);
  }

  const parentDir = path.dirname(intendedPath);
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  }

  return intendedPath;
}

module.exports = { resolvePath, sanitizeAgentPath }; // Export the new function