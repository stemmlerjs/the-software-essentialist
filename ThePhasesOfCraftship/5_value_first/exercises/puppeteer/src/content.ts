// This file is intentionally left blank.

let selectedText = '';

let square = document.createElement('div');
square.style.width = '50px';
square.style.height = '50px';
square.style.backgroundColor = 'blue';
square.style.position = 'absolute';
square.style.display = 'none';
square.classList.add('hidden');
square.classList.add('selection-square')
square.id = 'speech-to-text-square';
document.body.appendChild(square);
square.onclick = (e) => {
  e.stopImmediatePropagation();
  generateTextToVoice();
}

const selectTextOnSelectionChange = () => {
  const selection = window.getSelection()?.toString();
  if (selection) {
    selectedText = selection;
  }
}

const showSpeechToTextOnMouseUpEvent = (e: MouseEvent) => {
  if (selectedText) {
    console.log("We should show the box because there is text selected", selectedText);
    // Show the square right where the mouse was unpressed
    square.style.left = `${e.pageX}px`;
    square.style.top = `${e.pageY}px`;
    square.style.display = 'block';
    square.classList.remove('hidden');
  } else {
    console.log("no text selected, no need to show the box", selectedText);
    // Hide the square
    square.classList.add('hidden');
  }
};

const generateTextToVoice = async () => {
  if (selectedText) {
    chrome.runtime.sendMessage({ 
      action: 'startTextToSpeech', 
      data: { text: selectedText }
    }, async response => {
      if (response.status === 'fetchingTextToSpeechAudioSuccess') {
        console.log('Received data from API:', response);
        // Create an audio context
        // const audioContext = new AudioContext();

        // let blob = response.data as Blob;

        // // Decode the audio data
        // const arrayBuffer = await blob.arrayBuffer();
        // const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        // // Create a buffer source
        // const source = audioContext.createBufferSource();
        // source.buffer = audioBuffer;

        // // Connect the source to the audio context's destination (the speakers)
        // source.connect(audioContext.destination);

        // // Start playing the audio
        // source.start();

      }      
    });
  }
}

document.addEventListener('selectionchange', selectTextOnSelectionChange);
document.addEventListener('mouseup', showSpeechToTextOnMouseUpEvent);