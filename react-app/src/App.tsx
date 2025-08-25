import './App.css'
import DelayedProgressBlock from "./components/blocks/DelayedProgressBlock.tsx";
import {configureEcho} from "@laravel/echo-react";

// window.Pusher = Pusher;
//
// window.Echo = new Echo({
//     broadcaster: 'reverb',
//     key: import.meta.env.VITE_REVERB_APP_KEY,
//     wsHost: import.meta.env.VITE_REVERB_HOST,
//     wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
//     wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });

configureEcho({
    broadcaster: 'reverb',
    key: 'u7lwdgqskhaowu5zek73',
    wsHost: '0.0.0.0',
    wsPort: 8080,
    wssPort: 443,
    forceTLS: false,
    enabledTransports: ['ws'],
    // authEndpoint: null,
    // auth: null,
});

function App() {
    return (
        <>
            <DelayedProgressBlock/>
        </>
    )
}

export default App
