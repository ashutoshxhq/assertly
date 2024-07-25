const ConsoleLog = ({ log }: { log: { type: string; text: string } }) => {
    const getLogStyle = (type: string) => {
        switch (type) {
            case "error":
                return "text-red-500";
            case "warn":
                return "text-yellow-500";
            case "info":
                return "text-blue-500";
            default:
                return "text-gray-700 dark:text-gray-300";
        }
    };

    return (
        <div
            className={`py-1 px-2 ${getLogStyle(log.type)} text-xs bg-zinc-100 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded w-full`}
        >
            <span className="font-mono">{log.text}</span>
        </div>
    );
};

const ConsoleLogs = ({ logs }: { logs: { type: string; text: string }[] }) => {
    return (
        <div className="h-full pb-12 overflow-y-auto">
            <div className="flex flex-col gap-1">
                {logs.map((log, index) => (
                    <ConsoleLog key={index} log={log} />
                ))}
            </div>
        </div>
    );
};

export default ConsoleLogs;
