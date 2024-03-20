import React, { useState } from 'react';

type AudioPlayerProps = {
    byteArray: Uint8Array;
};

const AudioPlayer = ( props: AudioPlayerProps ): JSX.Element => {
  const [audioSource, setAudioSource] = useState('');

  // byte[]를 Base64로 변환하는 함수
  const arrayBufferToBase64 = (buffer: Uint8Array) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  // byte[]를 오디오로 변환하여 재생
  const playAudio = () => {
    const base64Data = arrayBufferToBase64(props.byteArray);
    const audioSrc = `data:audio/wav;base64,${base64Data}`;
    setAudioSource(audioSrc);
  };

  return (
    <div>
      <button onClick={playAudio}>Play Audio</button>
      {audioSource &&
        <audio controls src={audioSource}>
            <source src={audioSource} type="audio/mpeg"></source>
        </audio>}
    </div>
  );
};

export default AudioPlayer;