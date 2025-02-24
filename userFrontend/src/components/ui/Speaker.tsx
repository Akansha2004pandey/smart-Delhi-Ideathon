import React, { useEffect, useState, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

const Speaker = ({ message }: { message: string }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) {
      console.warn("Speech synthesis not supported");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1.0;
    utterance.pitch = 1.2;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    const enableSpeech = () => {
      speak(message);
      window.removeEventListener("click", enableSpeech);
    };
    window.addEventListener("click", enableSpeech);
    return () => window.removeEventListener("click", enableSpeech);
  }, [message, speak]);

  return (
    <button
      onClick={() => speak(message)}
      disabled={isSpeaking}
      className={`flex items-center justify-center w-12 h-12 rounded-full 
        transition-all duration-300 shadow-md 
        ${isSpeaking ? "bg-red-500 animate-pulse" : "bg-indigo-500 hover:bg-indigo-600"} text-white`}
    >
      {isSpeaking ? <VolumeX size={24} /> : <Volume2 size={24} />}
    </button>
  );
};

export default Speaker;
