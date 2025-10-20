const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { AgentInstance } = require('./AgentInstance');
const { getDbPool } = require('../config/db');

class AgentManager {
  constructor(io) {
    this.sessions = {};
    this.io = io;
    this.sessionsDir = path.join(__dirname, '../../sessions');
    if (!fs.existsSync(this.sessionsDir)) {
      fs.mkdirSync(this.sessionsDir);
    }
  }

  async createSession(initialTask) {
    const sessionId = uuidv4();
    const sessionPath = path.join(this.sessionsDir, sessionId);
    fs.mkdirSync(sessionPath, { recursive: true });

    try {
      const pool = await getDbPool();
      await pool.request()
        .input('SessionId', sessionId)
        .input('InitialTask', initialTask)
        .input('Status', 'pending')
        .query('INSERT INTO AgentSessions (SessionId, InitialTask, Status) VALUES (@SessionId, @InitialTask, @Status)');
      console.log(`Created session in DB: ${sessionId}`);
    } catch (err) {
      console.error('Failed to create session in database:', err);
      throw new Error('Database operation failed.');
    }
    
    this.sessions[sessionId] = new AgentInstance(sessionId, sessionPath);
    return sessionId;
  }

  async startTask(sessionId, task) {
    if (this.sessions[sessionId]) {
      try {
        const pool = await getDbPool();
        await pool.request()
          .input('SessionId', sessionId)
          .input('Status', 'running')
          .query('UPDATE AgentSessions SET Status = @Status WHERE SessionId = @SessionId');
      } catch (err) {
        console.error(`Failed to update session ${sessionId} status to 'running':`, err);
      }
      this.sessions[sessionId].run(task);
    } else {
      console.error(`Session not found: ${sessionId}`);
    }
  }
}

module.exports = { AgentManager };