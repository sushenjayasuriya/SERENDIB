import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  ArrowUpRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { 
  QUICK_PROMPTS, 
  INITIAL_GREETING, 
  findChatbotResponse, 
  handleQuizTransition,
  type ChatAction,
  type ChatDestinationCard,
  type QuizState
} from '../../data/chatbotKnowledge';
import { navigateToSection } from '../../utils/navigation';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  cards?: ChatDestinationCard[];
  actions?: ChatAction[];
  timestamp: string;
}

interface SerendibAIChatbotProps {
  onOpenBookingModal: () => void;
}

export const SerendibAIChatbot: React.FC<SerendibAIChatbotProps> = ({ onOpenBookingModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>({});
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

  // Auto-open after a thoughtful 6.5s delay on initial arrival
  useEffect(() => {
    const hasAlreadyAutoOpened = sessionStorage.getItem('serendib_ai_auto_opened');
    if (!hasAlreadyAutoOpened) {
      const timer = window.setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('serendib_ai_auto_opened', 'true');
      }, 6500);

      return () => clearTimeout(timer);
    }
  }, []);

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
          cards: responseData.cards,
          actions: responseData.actions,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, thinkingDelay);
  };

  const handleActionClick = (action: ChatAction) => {
    if (action.type === 'quiz_step' && action.payload) {
      // User tapped a quiz step
      const choiceLabel = action.label;
      const userMsgId = `user-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: userMsgId,
          sender: 'user',
          text: choiceLabel,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      setIsTyping(true);
      const thinkingDelay = Math.floor(Math.random() * 400) + 1800;

      setTimeout(() => {
        const result = handleQuizTransition(action.payload!, quizState);
        setQuizState(result.nextState);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: result.reply,
            cards: result.cards,
            actions: result.actions,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setIsTyping(false);
      }, thinkingDelay);
    } else if (action.type === 'navigate' && action.payload) {
      navigateToSection(action.payload);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    } else if (action.type === 'whatsapp') {
      const payload = action.payload || '94713912972';
      if (payload.includes('&text=')) {
        window.open(`https://wa.me/${payload}`, '_blank');
      } else {
        const text = encodeURIComponent("Hello SERENDIB Expeditions, I would like to inquire about a luxury journey to Sri Lanka.");
        window.open(`https://wa.me/${payload}?text=${text}`, '_blank');
      }
    } else if (action.type === 'modal') {
      onOpenBookingModal();
      setIsOpen(false);
    }
  };

  const handleResetChat = () => {
    setQuizState({});
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

  const renderFormattedMessage = (content: string, isUser: boolean) => {
    if (isUser) {
      return <div className="whitespace-pre-line break-words">{content}</div>;
    }

    const lines = content.split('\n');

    return (
      <div className="space-y-1.5 break-words">
        {lines.map((line, lineIdx) => {
          if (!line.trim()) {
            return <div key={lineIdx} className="h-1" />;
          }

          // Parse inline bold (**text**) and code (`code`)
          const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

          return (
            <p key={lineIdx} className="leading-relaxed">
              {parts.map((part, partIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  const inner = part.slice(2, -2);
                  return (
                    <strong key={partIdx} className="text-[#F3EFE6] font-semibold">
                      {inner}
                    </strong>
                  );
                }
                if (part.startsWith('`') && part.endsWith('`')) {
                  const inner = part.slice(1, -1);
                  return (
                    <code key={partIdx} className="font-mono text-[#E6CA85] bg-white/10 px-1.5 py-0.5 rounded text-[11px] border border-white/10">
                      {inner}
                    </code>
                  );
                }
                return part;
              })}
            </p>
          );
        })}
      </div>
    );
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
        <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:left-6 sm:bottom-6 z-[9999] w-auto sm:w-[450px] max-w-[95vw] h-[600px] max-h-[88vh] bg-[#0A0C11]/98 border border-[#C5A059]/60 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_30px_rgba(197,160,89,0.25)] backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-6 duration-300 font-sans">
          
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
                  className={`max-w-[92%] rounded-2xl px-4 py-3 text-xs leading-relaxed transition-all shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#C5A059] to-[#b08b43] text-[#0C0D0E] font-medium rounded-br-none'
                      : 'bg-white/5 border border-white/10 text-[#F3EFE6]/90 rounded-bl-none'
                  }`}
                >
                  {renderFormattedMessage(msg.text, msg.sender === 'user')}
                </div>

                {/* Rich Visual Destination Cards (Horizontal Carousel) */}
                {msg.cards && msg.cards.length > 0 && (
                  <div className="flex gap-2.5 overflow-x-auto py-2 max-w-full scrollbar-thin scrollbar-thumb-white/10 mt-1">
                    {msg.cards.map((card) => (
                      <div
                        key={card.id}
                        className="w-[200px] shrink-0 rounded-2xl bg-[#111520] border border-[#C5A059]/40 overflow-hidden shadow-lg group hover:border-[#C5A059] transition-all flex flex-col justify-between"
                      >
                        <div className="relative h-24 w-full overflow-hidden">
                          <img
                            src={card.image}
                            alt={card.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111520] via-transparent to-black/40" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 font-mono text-[7.5px] text-[#E6CA85] uppercase tracking-wider">
                            {card.badge}
                          </span>
                        </div>
                        <div className="p-2.5 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-serif text-xs font-bold text-white group-hover:text-[#E6CA85] transition-colors leading-tight line-clamp-1">
                              {card.name}
                            </h4>
                            <p className="font-sans text-[9px] text-[#D8CBB5]/70 line-clamp-2 mt-1 font-light">
                              {card.tagline}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              navigateToSection(card.path);
                              if (window.innerWidth < 768) setIsOpen(false);
                            }}
                            className="mt-2 w-full py-1 rounded-xl bg-white/5 hover:bg-[#C5A059]/20 border border-white/10 hover:border-[#C5A059]/50 text-[9px] font-mono text-[#E6CA85] flex items-center justify-center gap-1 transition-all cursor-pointer"
                          >
                            <Compass className="w-3 h-3 text-[#C5A059]" />
                            <span>Explore Details</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Message Interactive Action Cards */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 max-w-[95%]">
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
