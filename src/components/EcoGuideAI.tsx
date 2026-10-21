import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const PRESET_PROMPTS = [
  'How is the net scrap payout calculated from MCX spot benchmarks?',
  'What are the compliance requirements for Form-6 e-waste destruction?',
  'How do I prepare heavy copper and aluminium cables for pickup?',
  'How does the Reusable Marketplace escrow settlement guarantee work?'
];

export const EcoGuideAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-init',
      sender: 'assistant',
      text: "Hello, I am Recyvora EcoGuide, your AI circular economy and regulatory compliance advisor. I can help with material classification, ISO 14001 compliance standards, pricing index calculations, and e-waste handling. How can I assist you today?",
      timestamp: '09:00 AM'
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // Check if API key is present in environment
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (process as any).env?.GEMINI_API_KEY;

      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `You are Recyvora EcoGuide, the responsible recycling and circular-economy assistant for the Recyvora platform. Provide clear, practical, professional, and safety-conscious guidance on material recycling, scrap valuation benchmarks, hazardous e-waste compliance (Form-6, ISO 14001), and the circular recommerce marketplace. Keep responses well-structured and helpful.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: text,
          config: {
            systemInstruction: systemPrompt
          }
        });

        const reply = response.text || 'No response returned from EcoGuide.';
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            sender: 'assistant',
            text: reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        // High-fidelity fallback based on expert domain knowledge
        await new Promise((r) => setTimeout(r, 650));
        let reply = '';
        const q = text.toLowerCase();

        if (q.includes('calculate') || q.includes('payout') || q.includes('rate') || q.includes('formula')) {
          reply = `Recyvora calculates your net payout with full index transparency:\n\n• **Base Rate:** Derived from the daily 08:00 IST benchmark on the Multi Commodity Exchange (MCX) and regional industrial smelters.\n• **Quality Factor:** Clean Grade A (>98% pure stripped) receives 100% index value. Mixed/Minor incurs an 8% deductible, while heavy contamination incurs a 22% deductible.\n• **Volume Tier Incentive:** Lots above 40 kg automatically unlock a +₹15.00/kg bonus (+₹7.50/kg for >20 kg).\n• **Handling Fee:** A standardized 4.5%–6.12% fee covers on-site calibrated digital scale weighing, hydraulic pallet loading, and instant NEFT bank settlement.\n\n*Net Payout = (Base Rate + Quality Factor + Volume Bonus) × Verified Weight - Handling Fee.*`;
        } else if (q.includes('e-waste') || q.includes('form-6') || q.includes('data') || q.includes('shred')) {
          reply = `For corporate and industrial e-waste:\n\n1. **Statutory Form-6 Certification:** Issued under State Pollution Control Board guidelines confirming non-landfill channelization and recovery.\n2. **DoD 5220.22-M Data Sanitization:** Physical degaussing and serial-tagged hard drive shredding for servers and laptops.\n3. **Hazardous Battery Protocol:** Lithium-ion and sealed VRLA lead-acid batteries are transported in specialized HazMat containers directly to ISO-certified hydrometallurgical extractors.`;
        } else if (q.includes('prepare') || q.includes('cable') || q.includes('copper') || q.includes('aluminium')) {
          reply = `To maximize your lot valuation:\n\n• **Insulation:** Stripping outer PVC insulation upgrades wire to "Grade 1 Millberry", commanding ~₹720/kg versus ~₹480/kg insulated.\n• **Separation:** Keep ferrous (steel bolts, screws) away from non-ferrous extrusions to maintain 100% clean grade qualification.\n• **Access:** Ensure loading bays have hydraulic jack clearance for our collector's floor scale.`;
        } else {
          reply = `On the Recyvora circular platform, every kilogram of secondary material diverted from landfills counts toward Scope 3 carbon avoidance and your corporate ESG ledger.\n\nYou can:\n• **Schedule doorstep collections** with guaranteed calibrated digital scales\n• **Estimate live valuations** against real commodity indexes\n• **Publish reusable corporate assets** on our Recommerce Marketplace with escrow safety.`;
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            sender: 'assistant',
            text: reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: "I'm currently running in local advisory mode. You can ask any question regarding scrap pricing formulas, e-waste preparation, or marketplace listings.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full px-gutter-lg pt-space-lg pb-space-xl max-w-4xl mx-auto h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-space-md mb-space-md border-b border-outline-variant/30 shrink-0">
        <div className="flex items-center gap-space-sm">
          <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">smart_toy</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Recyvora EcoGuide AI</h2>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed text-xs font-bold font-mono">
                GEMINI 2.5 FLASH
              </span>
            </div>
            <p className="text-body-sm text-on-surface-variant">
              Circular Economy, Statutory ISO 14001, and Material Valuation Copilot
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'm-reset',
                sender: 'assistant',
                text: 'Conversation reset. How can I assist your sustainability operations?',
                timestamp: 'Just now'
              }
            ])
          }
          className="text-xs text-outline hover:text-on-surface flex items-center gap-1 font-semibold"
        >
          <span className="material-symbols-outlined text-[16px]">restart_alt</span>
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div key={m.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                  isUser
                    ? 'bg-primary text-on-primary rounded-br-none'
                    : 'bg-surface-container-lowest text-on-surface border border-outline-variant/30 rounded-bl-none'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center gap-1.5 text-xs text-primary font-bold mb-1">
                    <span className="material-symbols-outlined text-[16px]">eco</span>
                    <span>EcoGuide Advisor</span>
                  </div>
                )}
                <div className="text-body-sm leading-relaxed whitespace-pre-wrap">{m.text}</div>
                <div
                  className={`text-[10px] mt-2 font-mono ${
                    isUser ? 'text-on-primary-container text-right' : 'text-outline text-left'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              <span className="text-body-sm text-outline">EcoGuide is analyzing circular standards...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="py-2 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
        {PRESET_PROMPTS.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(p)}
            className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-medium whitespace-nowrap border border-outline-variant/30 transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="mt-2 flex items-center gap-2 bg-surface-container-lowest p-2 rounded-xl border border-outline-variant/50 shadow-sm shrink-0"
      >
        <input
          type="text"
          placeholder="Ask about scrap commodities, e-waste compliance, or logistics..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-transparent px-3 py-2 text-sm text-on-surface focus:outline-none placeholder:text-outline"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="p-2.5 rounded-lg bg-primary text-on-primary hover:bg-tertiary-container disabled:opacity-40 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">send</span>
        </button>
      </form>
    </div>
  );
};
