import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { 
  QUICK_PROMPTS, 
  INITIAL_GREETING, 
  findChatbotResponse, 
  type ChatAction 
} from '../../data/chatbotKnowledge';
import { navigateToSection } from '../../utils/navigation';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  actions?: ChatAction[];
  timestamp: string;
}

interface SerendibAIChatbotProps {
  onOpenBookingModal: () => void;
}

export const SerendibAIChatbot: React.FC<SerendibAIChatbotProps> = ({ onOpenBookingModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: INITIAL_GREETING.text,
      actions: INITIAL_GREETING.actions,
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      setHasOpenedOnce(true);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isTyping) return;

    const userMsgId = `user-${Date.now()}`;
    const newMessages: Message[] = [
      ...messages,
      {
        id: userMsgId,
        sender: 'user',
        text: text.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];

    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    // Realistic thinking time: 2.2 to 2.8 seconds
    const thinkingDelay = Math.floor(Math.random() * 600) + 2200;

    setTimeout(() => {
      const responseData = findChatbotResponse(text);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: responseData.reply,
          actions: responseData.actions,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, thinkingDelay);
  };

  const handleActionClick = (action: ChatAction) => {
    if (action.type === 'navigate' && action.payload) {
      navigateToSection(action.payload);
      // On mobile close chat to let user see section
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    } else if (action.type === 'whatsapp') {
      const phone = action.payload || '94713912972';
      const text = encodeURIComponent("Hello SERENDIB Expeditions, I am inquiring about a luxury journey to Sri Lanka.");
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    } else if (action.type === 'modal') {
      onOpenBookingModal();
      setIsOpen(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'bot',
        text: INITIAL_GREETING.text,
        actions: INITIAL_GREETING.actions,
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <>
      {/* Floating Trigger Orb */}
      <div className="fixed bottom-6 left-6 z-[9990] flex items-center">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Serendib AI Concierge"
            className="group relative flex items-center gap-3 px-4 sm:px-5 py-3 rounded-full bg-[#0C0E14]/95 border-2 border-[#C5A059] shadow-[0_10px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(197,160,89,0.35)] backdrop-blur-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer animate-beacon"
          >
            {/* Glowing Bot Icon */}
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-[#C5A059] to-[#F3E5AB] text-[#0C0D0E] shadow-md">
              <Bot className="w-5 h-5 animate-pulse" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0C0E14] rounded-full animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0C0E14] rounded-full" />
            </div>

            {/* Label */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xs sm:text-sm font-bold tracking-wider text-[#F3EFE6] group-hover:text-gold-gradient transition-colors">
                  SERENDIB AI
                </span>
                <Sparkles className="w-3 h-3 text-[#C5A059]" />
              </div>
              <span className="font-mono text-[8.5px] sm:text-[9.5px] text-[#C5A059] tracking-widest uppercase">
                Island Concierge
              </span>
            </div>

            {/* Unread badge pulse */}
            {!hasOpenedOnce && unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-red-600 to-amber-600 text-white font-mono text-[9px] font-bold shadow-lg animate-bounce">
                1
              </span>
            )}
          </button>
        )}
      </div>

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:left-6 sm:bottom-6 z-[9999] w-auto sm:w-[420px] max-w-[95vw] h-[580px] max-h-[88vh] bg-[#0A0C11]/98 border border-[#C5A059]/60 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_30px_rgba(197,160,89,0.25)] backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-6 duration-300 font-sans">
          
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-[#121622] via-[#0E111A] to-[#121622] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-[#C5A059] to-[#F3E5AB] flex items-center justify-center text-[#0C0D0E] shadow-[0_0_15px_rgba(197,160,89,0.5)]">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0A0C11] rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-sm font-bold tracking-wider text-[#F3EFE6]">
                    SERENDIB Concierge AI
                  </h3>
                  <span className="px-1.5 py-0.2 rounded bg-[#C5A059]/20 text-[#E6CA85] font-mono text-[8px] uppercase tracking-wider border border-[#C5A059]/40">
                    Active
                  </span>
                </div>
                <p className="font-sans text-[10px] text-white/50 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Instant Expedition & Island Intelligence
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Reset Conversation"
                className="p-1.5 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize Concierge"
                className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Conversation History Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs leading-relaxed transition-all shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#C5A059] to-[#b08b43] text-[#0C0D0E] font-medium rounded-br-none'
                      : 'bg-white/5 border border-white/10 text-[#F3EFE6]/90 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-line break-words">
                    {msg.text}
                  </div>
                </div>

                {/* Message Interactive Action Cards */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 max-w-[90%]">
                    {msg.actions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => handleActionClick(act)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#161B26] border border-[#C5A059]/40 hover:border-[#C5A059] text-[10.5px] text-[#E6CA85] hover:text-white hover:bg-[#C5A059]/20 transition-all cursor-pointer shadow-sm"
                      >
                        <span>{act.label}</span>
                        <ArrowUpRight className="w-3 h-3 text-[#C5A059]" />
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[9px] font-mono text-white/30 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Realistic AI Thinking / Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-2 animate-in fade-in duration-300">
                <div className="bg-white/5 border border-[#C5A059]/40 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E6CA85] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-bounce" style={{ animationDelay: '200ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#E6CA85] animate-bounce" style={{ animationDelay: '400ms' }} />
                  </div>
                  <span className="font-mono text-[10px] text-[#D8CBB5]/70 italic">
                    Serendib AI is synthesizing island intelligence...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-4 py-2 border-t border-white/5 bg-black/20">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[9px] font-mono uppercase text-[#C5A059] tracking-wider shrink-0 flex items-center gap-1 mr-1">
                <Sparkles className="w-2.5 h-2.5" /> Prompt:
              </span>
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isTyping}
                  className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#C5A059]/60 hover:bg-white/10 text-[10px] text-white/80 whitespace-nowrap transition-all cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input & Send Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#0B0D13] border-t border-white/10 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about Sigiriya, monsoons, safaris, trains..."
              className="flex-1 bg-white/5 border border-white/15 focus:border-[#C5A059] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 font-sans transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#E6CA85] to-[#C5A059] hover:from-[#C5A059] hover:to-[#b08b43] text-[#0C0D0E] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
