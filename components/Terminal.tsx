
import React, { useEffect, useRef, useState } from 'react';
import { Message, SkillType, THEMES } from '../types';

interface TerminalProps {
  history: Message[];
  onCommand: (cmd: string) => void;
  onHint: () => void;
  isProcessing: boolean;
  skill: SkillType | null;
}

const Terminal: React.FC<TerminalProps> = ({ history, onCommand, onHint, isProcessing, skill }) => {
  const [input, setInput] = useState('');
  // Command history state
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1); // -1 means new input (not in history)

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keep focus on input
  useEffect(() => {
    const handleClick = () => {
        // Only focus if text is not being selected
        if (window.getSelection()?.toString().length === 0) {
            inputRef.current?.focus();
        }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    
    const cmd = input.trim();

    // Check for 'hint' or 'help' command locally
    if (cmd.toLowerCase() === 'hint' || cmd.toLowerCase() === 'help') {
        onHint();
        setInput('');
        return;
    }

    // Update history: Add new command to the end
    setCommandHistory(prev => [...prev, cmd]);
    // Reset history pointer to "new input" position
    setHistoryIndex(-1);

    onCommand(cmd);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      // If at "new input" (index -1), go to last command.
      // Otherwise go back one, clamping at 0.
      const newIndex = historyIndex === -1 
        ? commandHistory.length - 1 
        : Math.max(0, historyIndex - 1);
      
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      
      if (historyIndex === -1) return; // Already at the bottom

      if (historyIndex < commandHistory.length - 1) {
          // Move forward in history
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
      } else {
          // Moved past the most recent command -> clear input
          setHistoryIndex(-1);
          setInput('');
      }
    }
  };

  // Safely handle theme lookup
  const themeClass = (skill && THEMES[skill]) ? THEMES[skill] : THEMES.DEFAULT;
  const textColor = themeClass ? themeClass.split(' ')[0] : 'text-amber-500';

  return (
    <div className="flex flex-col h-full w-full bg-black/90 relative overflow-hidden border-2 border-gray-800 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      {/* Terminal Header */}
      <div className={`flex justify-between items-center px-4 py-2 border-b border-gray-800 bg-gray-900/50 ${textColor}`}>
        <span className="text-xs tracking-widest uppercase font-bold">
          {skill ? `MODULE: ${skill}` : 'TERMINAL_IDLE'}
        </span>
        <div className="flex gap-2">
           <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
           <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
           <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm md:text-base space-y-2 scrollbar-hide">
        {history.map((msg) => (
          <div 
            key={msg.id} 
            className={`
              mb-2 break-words
              ${msg.sender === 'USER' ? 'text-white text-right' : ''}
              ${msg.sender === 'SYSTEM' ? 'opacity-70 italic' : ''}
              ${msg.sender === 'AI' ? textColor : ''}
              ${msg.type === 'error' ? 'text-red-500' : ''}
              ${msg.type === 'success' ? 'text-green-400' : ''}
              ${msg.type === 'hint' ? 'text-cyan-400' : ''}
            `}
          >
            {msg.sender !== 'USER' && (
                <span className="font-bold mr-2 select-none">
                {msg.sender === 'AI' ? 'MF-99:' : 'SYS:'}
                </span>
            )}
            
            {msg.sender === 'USER' && (
                 <span className="font-bold mr-2 select-none">{'>'}</span>
            )}

            <span className="whitespace-pre-wrap leading-relaxed">
               {msg.text}
            </span>
          </div>
        ))}
        
        {isProcessing && (
          <div className={`${textColor} animate-pulse`}>
            <span className="mr-2 font-bold">MF-99:</span>
            <span>ESTABLISHING UPLINK...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-2 bg-black border-t border-gray-800 flex items-center gap-2 relative z-20">
        <span className={`font-bold text-xl ${textColor} select-none`}>{'>'}</span>
        <form onSubmit={handleSubmit} className="flex-1">
            <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`
                w-full bg-transparent border-none outline-none font-mono text-lg
                text-white placeholder-gray-800
            `}
            placeholder={isProcessing ? "INITIALIZING..." : "ENTER COMMAND..."}
            disabled={isProcessing}
            autoFocus
            autoComplete="off"
            />
        </form>
        
        <button 
            type="button"
            onClick={onHint}
            className={`
                px-3 py-1 text-xs border border-gray-700 hover:border-current 
                ${textColor} uppercase tracking-wider transition-all hover:bg-white/5
            `}
        >
            HINT
        </button>
      </div>
    </div>
  );
};

export default Terminal;
