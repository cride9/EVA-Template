class AskUser {
    get name() { return 'askuser'; }

    async execute(args, context) {
        const { question } = args;
        if (!question) return "Error: 'question' argument is required.";

        // This will pause the agent's execution loop in AgentInstance
        const userResponse = await context.waitForUserInput(question);
        return `User responded: ${userResponse}`;
    }
}
module.exports = AskUser;