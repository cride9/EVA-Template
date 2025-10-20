const path = require('path');
const AIWrapper = require('./AIWrapper');
const XMLParser = require('./XMLParser');
const { ToolRegistry } = require('../tools/ToolRegistry');
const { getDbPool } = require('../config/db');

class AgentInstance {
  constructor(sessionId, sessionPath) {
    this.sessionId = sessionId;
    this.rootSessionPath = sessionPath; // Store the parent path

    this.socket = null;
    this.cwd = 'workspace'; // logical cwd (relative inside session)
    this.sessionPath = this.rootSessionPath; // keep the root session path
    const workspacePath = require('path').join(this.sessionPath, this.cwd);
    require('fs').mkdirSync(workspacePath, { recursive: true });

    this.ai = new AIWrapper();
    this.tools = new ToolRegistry();
    this.isRunning = false;
    this.isWaitingForUser = false;
    this.userResponseCallback = null;
  }

  async logEvent(eventType, content) {
    try {
      const pool = await getDbPool();
      const contentString = (typeof content === 'object') ? JSON.stringify(content) : String(content);
      
      await pool.request()
        .input('SessionId', this.sessionId)
        .input('EventType', eventType)
        .input('Content', contentString)
        .query('INSERT INTO SessionHistory (SessionId, EventType, Content) VALUES (@SessionId, @EventType, @Content)');
    } catch (err) {
      console.error(`Failed to log event for session ${this.sessionId}:`, err);
    }
  }

  setSocket(socket) {
    this.socket = socket;
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
    this.logEvent(event, data);
  }

  async run(initialTask) {
    if (this.isRunning) return;
    this.isRunning = true;
    let nextPrompt = `Task: ${initialTask}\nCurrent Directory: /${this.cwd}`;
    
    while (this.isRunning) {
        // Simple "thinking" message
        this.emit('agent_thought', "EVA is thinking...");

        // Await the full response
        const llmResponse = await this.ai.stream(nextPrompt);

        // Emit the final, parsed thought
        this.emit('agent_thought', llmResponse.thought);
        
        let toolOutputs = [];
        for (const toolCall of llmResponse.toolCalls) {
            this.emit('tool_call', toolCall);

            if (this.isWaitingForUser) {
                await new Promise(resolve => this.userResponseCallback = resolve);
            }

            const output = await this.executeTool(toolCall);
            this.emit('tool_output', { name: toolCall.name, output });
            
            if (!this.isRunning) break; 
            
            toolOutputs.push(`Tool: ${toolCall.name}\nOutput:\n${output}`);
        }
        
        if (!this.isRunning) break;

        nextPrompt = `Tool Results:\n${toolOutputs.join('\n\n')}\n\nCurrent Directory: /${this.cwd}`;
    }
    console.log(`Session ${this.sessionId} finished.`);
  }
  
  async executeTool(toolCall) {
    const tool = this.tools.getTool(toolCall.name);
    if (!tool) {
      return `Error: Tool "${toolCall.name}" not found.`;
    }
    try {
        const context = {
            sessionId: this.sessionId,
            sessionPath: this.rootSessionPath,
            cwd: this.cwd,
            updateCwd: (newCwd) => { this.cwd = newCwd; },
            waitForUserInput: this.waitForUserInput.bind(this),
            endTask: this.endTask.bind(this),
        };
        const result = await tool.execute(toolCall.args, context);
        return result;
    } catch (e) {
      console.error(`Error executing tool ${toolCall.name}:`, e);
      return `Error: ${e.message}`;
    }
  }

  waitForUserInput(question) {
    this.isWaitingForUser = true;
    this.emit('user_question', question);
    return new Promise(resolve => {
        this.userResponseCallback = resolve;
    });
  }
  
  handleUserResponse(response) {
      if (this.isWaitingForUser && this.userResponseCallback) {
          this.isWaitingForUser = false;
          this.userResponseCallback(response);
          this.userResponseCallback = null;
      }
  }

  async endTask(finalMessage) {
      this.isRunning = false;
      this.emit('agent_finished', finalMessage);

      try {
          const pool = await getDbPool();
          await pool.request()
              .input('SessionId', this.sessionId)
              .input('Status', 'completed')
              .input('CompletedAt', new Date().toISOString())
              .query('UPDATE AgentSessions SET Status = @Status, CompletedAt = @CompletedAt WHERE SessionId = @SessionId');
      } catch (err) {
          console.error(`Failed to update session ${this.sessionId} status to 'completed':`, err);
      }
  }
}

module.exports = { AgentInstance };