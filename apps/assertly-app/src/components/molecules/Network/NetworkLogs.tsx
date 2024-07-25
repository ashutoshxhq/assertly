import { NetworkLog } from "src/store/test-specs/steps";

const NetworkLogItem = ({ log }: { log: NetworkLog }) => {
    const getStatusColor = (status: number) => {
        if (status >= 200 && status < 300) return "text-green-500";
        if (status >= 400) return "text-red-500";
        return "text-yellow-500";
    };

    return (
        <div className="mb-2 p-2 bg-zinc-100 dark:bg-zinc-800 rounded">
            <div className="flex justify-between items-center">
                <span className="font-bold">
                    {log.request.method} {log.request.url}
                </span>
                {log.response && (
                    <span
                        className={`font-bold ${getStatusColor(log.response.status)}`}
                    >
                        {log.response.status}
                    </span>
                )}
            </div>
            <div className="text-sm mt-2">
                <strong>Request Headers:</strong>
                <pre className="mt-1 text-xs">
                    {JSON.stringify(log.request.headers, null, 2)}
                </pre>
            </div>
            {log.request.body && (
                <div className="text-sm mt-2">
                    <strong>Request Body:</strong>
                    <pre className="mt-1 text-xs">{log.request.body}</pre>
                </div>
            )}
            {log.response && (
                <div className="text-sm mt-2">
                    <strong>Response Headers:</strong>
                    <pre className="mt-1 text-xs">
                        {JSON.stringify(log.response.headers, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

const NetworkLogs = ({ logs }: { logs: NetworkLog[] }) => {
    return (
        <div className="h-full overflow-y-auto pb-4">
            <div className="flex flex-col gap-2 p-2">
                {logs.map((log, index) => (
                    <NetworkLogItem key={index} log={log} />
                ))}
            </div>
        </div>
    );
};

export default NetworkLogs;
