const { AgentManager } = require('../agent/AgentManager');

module.exports = function(app, io) {
  const agentManager = new AgentManager(io);

  // Endpoint to start a new agent task
  app.post('/api/start', async (req, res) => {
    const { task } = req.body;
    console.log("Received task on backend:", task);
    if (!task) {
      return res.status(400).json({ error: 'Task is required' });
    }
    try {
      const sessionId = await agentManager.createSession(task); // Await the creation
      agentManager.startTask(sessionId, task);
      res.json({ sessionId });
    } catch (error) {
      console.error('Error starting agent task:', error);
      res.status(500).json({ error: 'Failed to start agent session.' });
    }
  });

  // WebSocket connection handler
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('register', (sessionId) => {
        if (agentManager.sessions[sessionId]) {
            console.log(`Socket ${socket.id} registered for session ${sessionId}`);
            agentManager.sessions[sessionId].setSocket(socket);
        } else {
            console.log(`Attempted to register for non-existent session: ${sessionId}`);
        }
    });

    socket.on('user_response', ({ sessionId, response }) => {
        if(agentManager.sessions[sessionId]) {
            agentManager.sessions[sessionId].handleUserResponse(response);
        }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
      // You might want to add logic to clean up sessions on disconnect
    });
  });
};