
import React, { useState, useEffect, useRef } from 'react';
import { User, Message } from '../types';
import { getFriendResponse } from '../services/geminiService';
import { SendIcon, CameraIcon, MicIcon } from './Icons';

interface ChatWindowProps {
  friend: User;
  onBack: () => void;
  currentUser: User;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ friend, onBack, currentUser }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: friend.id,
      text: `Hey ${currentUser.fullName.split(' ')[0]}! How's it going? 👋`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
      setRecordingTime(0);
    }
    return () => {
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    };
  }, [isRecording]);

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim() && !isRecording) return;

    const finalMessage = isRecording ? `🎤 Voice message (${formatTime(recordingTime)})` : text;

    const myMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      text: finalMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages(prev => [...prev, myMessage]);
    setInputValue('');
    setIsRecording(false);
    setIsTyping(true);

    // Call Gemini
    const response = await getFriendResponse(friend, [...messages, myMessage]);
    
    setIsTyping(false);
    const friendMessage: Message = {
      id: (Date.now() + 1).toString(),
      senderId: friend.id,
      text: response,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: false
    };
    setMessages(prev => [...prev, friendMessage]);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleSendMessage(`📸 Attached: ${file.name}`);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      handleSendMessage();
    } else {
      setIsRecording(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*,video/*" 
        onChange={handleFileChange} 
      />
      
      {/* Header */}
      <header className="flex items-center px-4 py-4 border-b border-zinc-100 bg-white shadow-sm z-10">
        <button onClick={onBack} className="md:hidden mr-4 p-2 -ml-2 text-zinc-400 hover:text-black transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div className="relative">
          <img src={friend.avatar} alt={friend.username} className="w-10 h-10 rounded-full mr-3 border border-zinc-100" />
          <div className="absolute bottom-0 right-3 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
        </div>
        <div>
          <h2 className="font-bold text-sm leading-tight text-zinc-900">{friend.fullName}</h2>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Active now</p>
        </div>
        <button className="ml-auto p-2 text-zinc-300 hover:text-zinc-900 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </button>
      </header>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-50/30"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div 
              className={`max-w-[80%] px-5 py-3 rounded-3xl text-sm ${
                msg.isMe 
                  ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/10 rounded-tr-none' 
                  : 'bg-white border border-zinc-100 text-zinc-800 shadow-sm rounded-tl-none'
              }`}
            >
              <p className="leading-relaxed">{msg.text}</p>
              <div className={`text-[9px] font-bold uppercase tracking-widest mt-2 opacity-50 ${msg.isMe ? 'text-right' : 'text-left'}`}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="bg-white border border-zinc-100 px-5 py-4 rounded-3xl rounded-tl-none flex space-x-1.5 items-center shadow-sm">
              <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce delay-75"></div>
              <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input - Enhanced with media and recording */}
      <div className="p-6 border-t border-zinc-100 bg-white">
        <div className="flex items-center bg-zinc-900 rounded-[2rem] px-5 py-2.5 transition-all focus-within:ring-4 focus-within:ring-zinc-900/5 shadow-2xl min-h-[56px]">
          {!isRecording && (
            <button 
              onClick={handleFileClick}
              className="text-zinc-400 p-2 hover:text-white transition-colors mr-1"
            >
              <CameraIcon className="w-5 h-5" />
            </button>
          )}

          {isRecording ? (
            <div className="flex-1 flex items-center px-2">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse mr-3"></div>
              <span className="text-white text-sm font-bold tabular-nums">{formatTime(recordingTime)}</span>
              <span className="ml-4 text-zinc-500 text-xs font-bold uppercase tracking-tighter animate-pulse">Recording...</span>
              <button 
                onClick={() => setIsRecording(false)}
                className="ml-auto text-red-500 text-[10px] font-bold uppercase tracking-widest hover:text-red-400 px-2"
              >
                Cancel
              </button>
            </div>
          ) : (
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Write a message..." 
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 text-white placeholder:text-zinc-500 font-medium"
            />
          )}

          <div className="flex items-center ml-2 space-x-1">
            {inputValue.trim() || isRecording ? (
              <button 
                onClick={() => handleSendMessage()} 
                className="text-blue-500 p-2 hover:text-blue-400 transition-all active:scale-90"
              >
                <SendIcon className="w-5 h-5 fill-current" />
              </button>
            ) : (
              <button 
                onClick={toggleRecording}
                className="text-zinc-400 p-2 hover:text-white transition-colors"
              >
                <MicIcon className={`w-5 h-5 ${isRecording ? 'text-red-500' : ''}`} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
