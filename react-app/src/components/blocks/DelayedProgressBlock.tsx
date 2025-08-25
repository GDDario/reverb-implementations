import {useEffect, useState} from "react";
import echo from "laravel-echo";
import {echoIsConfigured, useEcho, useEchoPublic} from "@laravel/echo-react";

type DelayedEventResponse = {
    key: string;
}

type DelayedEvent = {
    key: string;
    dateTime: string;
};

export default function DelayedProgressBlock() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isInProgress, setIsInProgress] = useState<boolean>(false);
    const [events, setEvents] = useState<DelayedEvent[]>([]);

    const {listen} = useEchoPublic(
        'delayed-event-channel',
        '.delayed-event',
        (e: DelayedEventResponse) => {
            // setEvents((prev) => [...prev, {
            //     key: e.key,
            //     dateTime: Date.now(),
            // }])
            setEvents((prev: DelayedEvent[]) => [
                ...prev,
                {
                    key: e.key,
                    dateTime: new Date().toLocaleTimeString(),
                }
            ]);
            setIsInProgress(false);
            console.log('Event received: ', e);
        }
    );

    useEffect(() => {
        listen();
    }, []);

    const startLongTask = () => {
        setIsLoading(true);
        setIsInProgress(true);
        fetch('http://localhost:8000/api/delayed-event').then(() => setIsLoading(false));
    }

    return (
        <section
            className="card flex flex-col gap-4"
            title="This block demonstrates handling delayed events with real-time update when completed."
        >
            <div className="flex gap-2 justify-between">
                <h2>Delayed Progress Block</h2>

                {
                    isInProgress && (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm text-gray-600">In Progress...</span>
                        </div>
                    )
                }
            </div>

            <div className="flex flex-col gap-1">
                {
                    events.map((event: DelayedEvent) => (
                        <div key={event.key} className="p-2 bg-slate-800 rounded">
                            <span className="font-mono text-sm">Event Key: {event.key}</span>
                            <br />
                            <span className="text-xs text-gray-600">Received at: {event.dateTime}</span>
                        </div>
                    ))
                }
            </div>

            <button
                className="px-4 py-2 rounded bg-blue-800 text-white font-semibold shadow hover:bg-blue-900 transition-colors cursor-pointer"
                onClick={startLongTask}
                disabled={isLoading}
            >
                {isLoading ? 'Starting ...' : 'Start Long Task'}
            </button>
        </section>
    );
}
