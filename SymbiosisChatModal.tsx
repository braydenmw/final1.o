

import React, { useState, useEffect, useRef } from 'react';
import type { SymbiosisContext, ChatMessage } from '../types';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { SymbiosisIcon, NexusLogo, CloseIcon } from './Icons';
import { marked } from 'marked';

interface SymbiosisChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: SymbiosisContext;
  onSendMessage: (history: ChatMessage[]) => Promise<string>;
}

export const SymbiosisChatModal: React.FC<SymbiosisChatModalProps> = ({ isOpen, onClose, context, onSendMessage }) => {
  useEscapeKey(onClose);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([{
        sender: 'ai',
        text: `Nexus Symbiosis activated. You've selected the topic: **${context.topic}**. The original finding was: *"${context.originalContent}"*. How can I elaborate or provide updated information on this specific point?`
      }]);
    }
  }, [isOpen, context]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isThinking) return;

    const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsThinking(true);

    try {
      const aiResponseText = await onSendMessage(newMessages);
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponseText }]);
    } catch (error) {
      console.error("Symbiosis chat error:", error);
      setMessages(prev => [...prev, { sender: 'ai', text: "I'm sorry, I encountered an error connecting to my core systems. Please try again." }]);
    } finally {
      setIsThinking(false);
    }
  };
  
  const parseMessage = (text: string) => {
    if (typeof marked !== 'undefined' && marked.parse) {
        try {
            return marked.parse(text, { breaks: true });
        } catch (e) {
            console.error("Markdown parsing failed, returning plain text.", e);
        }
    }
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog">
      <div 
        className="bg-gradient-to-br from-nexus-bg-start to-nexus-bg-end border border-nexus-border rounded-xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 flex justify-between items-center border-b border-nexus-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <SymbiosisIcon className="w-8 h-8 text-purple-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Nexus Symbiosis Chat</h2>
              <p className="text-sm text-gray-400 truncate max-w-md">Topic: {context.topic}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white"><CloseIcon className="w-6 h-6"/></button>
        </header>

        <main className="flex-grow p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
             <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
               {msg.sender === 'ai' && <NexusLogo className="w-7 h-7 text-nexus-blue flex-shrink-0 mt-1" />}
               <div className={`rounded-lg px-4 py-2 max-w-lg ${msg.sender === 'user' ? 'bg-nexus-blue text-white' : 'bg-slate-700 text-gray-200'}`}>
                  <div className="prose prose-invert prose-p:my-0" dangerouslySetInnerHTML={{ __html: parseMessage(msg.text) }}></div>
               </div>
             </div>
          ))}
          {isThinking && (
            <div className="flex items-start gap-3">
                <NexusLogo className="w-7 h-7 text-nexus-blue flex-shrink-0 mt-1 animate-pulse" />
                <div className="rounded-lg px-4 py-2 bg-slate-700 text-gray-200 flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s] mx-1"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>

        <footer className="p-4 border-t border-nexus-border flex-shrink-0">
            <form onSubmit={handleSend} className="flex gap-2">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={isThinking ? "Nexus is thinking..." : "Ask a follow-up question..."}
                    disabled={isThinking}
                    className="w-full bg-nexus-dark border border-nexus-border rounded-lg p-3 text-white focus:ring-2 focus:ring-nexus-blue focus:outline-none disabled:opacity-50"
                />
                <button type="submit" disabled={isThinking || !userInput.trim()} className="bg-nexus-blue hover:bg-sky-400 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">
                    Send
                </button>
            </form>
        </footer>
      </div>
    </div>
  );
};