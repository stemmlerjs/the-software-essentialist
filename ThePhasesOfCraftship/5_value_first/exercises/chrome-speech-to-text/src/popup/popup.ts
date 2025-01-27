
import { SpeechRecognitionError } from "./types/index";

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button') as HTMLButtonElement;
    const stopButton = document.getElementById('stop-button') as HTMLButtonElement;
    const transcriptOutput = document.getElementById('transcript-output') as HTMLDivElement;

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    // @ts-ignore
    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        transcriptOutput.innerText = transcript;
    };

    recognition.onerror = (event: SpeechRecognitionError) => {
        console.error('Speech recognition error', event);
    };

    startButton.addEventListener('click', () => {
        recognition.start();
    });

    stopButton.addEventListener('click', () => {
        recognition.stop();
    });
});