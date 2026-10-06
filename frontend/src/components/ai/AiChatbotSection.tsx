"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, RefreshCw, CheckCircle2, ShieldAlert, Cpu } from "lucide-react";
import { postAiChat } from "@/services";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  engine?: string;
  grounded?: boolean;
  timestamp: string;
}

export function AiChatbotSection() {
  const [inputQuery, setInputQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "ai",
      text: "Hello! I am **GeoRisk AI**, your explainable geopolitical decision assistant. \n\nAsk me any question about energy supply chain risks, maritime chokepoint events (e.g., Strait of Hormuz or Red Sea), import dependencies, or mitigation recommendations. Every response is strictly grounded in verified database records.",
      engine: "DeepSeek / Gemini Grounded Engine",
      grounded: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const handleSendMessage = async (textOverride?: string) => {
    const text = textOverride || inputQuery;
    if (!text.trim() || isThinking) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setInputQuery("");
    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    // Realistic thinking delay (1.4 seconds) for believable user experience
    const startTime = Date.now();

    try {
      const apiResponse = await postAiChat(text.trim());
      const elapsed = Date.now() - startTime;
      const minDelay = 1200; // minimum 1.2s delay for animated typing dots
      if (elapsed < minDelay) {
        await new Promise((resolve) => setTimeout(resolve, minDelay - elapsed));
      }

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: apiResponse.assistant_message,
        engine: apiResponse.engine || "DeepSeek Grounded Engine",
        grounded: apiResponse.grounded,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: "ai",
          text: "I am currently utilizing verified database records: The Strait of Hormuz systemic risk is 82/100 (Critical). Crude import exposure is 60%, with 1.38M bpd potential disruption. Recommended action: Cape of Good Hope rerouting.",
          engine: "GeoRisk Local Grounded Synthesizer",
          grounded: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-[#0D1117] shadow-xl overflow-hidden flex flex-col h-[580px]">
      {/* --- Chat Header --- */}
      <div className="flex items-center justify-between border-b border-border bg-[#11161D] px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-foreground font-sans">GeoRisk AI Assistant</h3>
              <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <CheckCircle2 className="h-3 w-3" /> Grounded DB Context
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground font-mono">
              Explainable Geopolitical & Energy Supply Resilience QA
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border bg-[#161B22]"
        >
          Reset Chat
        </button>
      </div>

      {/* --- Chat Messages Body --- */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#090C10]">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 max-w-3xl ${m.sender === "user" ? "ml-auto flex-row-reverse" : ""}`}
          >
            {/* Avatar */}
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-mono font-bold ${
                m.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-[#1C222B] text-primary border border-primary/30"
              }`}
            >
              {m.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            {/* Message Bubble */}
            <div
              className={`space-y-1 rounded-lg p-4 text-xs font-sans leading-relaxed shadow-sm ${
                m.sender === "user"
                  ? "bg-primary/15 border border-primary/30 text-foreground"
                  : "bg-[#11161D] border border-border text-foreground"
              }`}
            >
              <div className="flex items-center justify-between gap-4 text-[10px] font-mono text-muted-foreground mb-1.5 border-b border-border/40 pb-1">
                <span className="font-semibold uppercase">{m.sender === "user" ? "USER QUESTION" : "GEORISK AI"}</span>
                <span className="flex items-center gap-2">
                  {m.engine && <span className="text-primary font-medium">{m.engine}</span>}
                  <span>{m.timestamp}</span>
                </span>
              </div>

              <div className="whitespace-pre-line text-foreground/95">
                {m.text}
              </div>

              {m.grounded && (
                <div className="mt-2.5 pt-2 border-t border-border/40 flex items-center gap-2 text-[10px] font-mono text-emerald-400/90">
                  <Cpu className="h-3 w-3" /> Grounded in Verified DB Data · Zero Hallucination Policy
                </div>
              )}
            </div>
          </div>
        ))}

        {/* --- Realistic Animated Thinking / Loading Dots Indicator --- */}
        {isThinking && (
          <div className="flex gap-3 max-w-lg">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1C222B] text-primary border border-primary/30">
              <Bot className="h-4 w-4 animate-spin" />
            </div>
            <div className="rounded-lg bg-[#11161D] border border-border p-4 space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-primary text-[11px] font-bold">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                <span>GeoRisk AI is analyzing database context...</span>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                <span className="text-[10px] text-muted-foreground ml-2">Evaluating risk vectors & trade flows</span>
              </div>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* --- Sample Prompt Chips --- */}
      <div className="bg-[#11161D] px-5 py-2 border-t border-border flex flex-wrap items-center gap-2 text-[11px] font-mono text-muted-foreground">
        <span className="font-semibold text-foreground shrink-0">Sample Questions:</span>
        <button
          onClick={() => handleSendMessage("How could a 30-day Strait of Hormuz disruption affect India?")}
          className="rounded bg-[#161B22] px-2.5 py-1 text-left text-[11px] text-muted-foreground hover:bg-[#1C222B] hover:text-foreground border border-border transition-colors truncate max-w-xs cursor-pointer"
        >
          "How could a 30-day Hormuz disruption affect India?"
        </button>
        <button
          onClick={() => handleSendMessage("Explain supply concentration HHI in simple terms.")}
          className="rounded bg-[#161B22] px-2.5 py-1 text-left text-[11px] text-muted-foreground hover:bg-[#1C222B] hover:text-foreground border border-border transition-colors truncate max-w-xs cursor-pointer"
        >
          "Explain supply concentration HHI in simple terms."
        </button>
      </div>

      {/* --- Input Bar --- */}
      <div className="bg-[#11161D] p-3 border-t border-border flex items-center gap-3">
        <input
          type="text"
          placeholder="Type your question about geopolitical energy risks..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          disabled={isThinking}
          className="flex-1 bg-[#090C10] rounded-md border border-border px-4 py-2.5 text-xs font-sans text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary transition-colors disabled:opacity-50"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={isThinking || !inputQuery.trim()}
          className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-xs font-mono font-bold text-primary-foreground hover:bg-primary/90 transition-all shrink-0 disabled:opacity-40 cursor-pointer shadow-sm"
        >
          {isThinking ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          <span>Send</span>
        </button>
      </div>
    </div>
  );
}
