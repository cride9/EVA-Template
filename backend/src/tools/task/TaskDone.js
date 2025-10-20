class TaskDone {
    get name() { return 'taskdone'; }

    async execute(args, context) {
        const { message } = args;
        const finalMessage = message || "Task completed successfully.";
        
        // This will stop the agent's execution loop
        context.endTask(finalMessage);
        
        return "Task marked as complete.";
    }
}
module.exports = TaskDone;