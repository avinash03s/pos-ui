import { useEffect, useRef, useState } from "react";
import { askAI } from "../service/AiService";

import {
  IconRobot,
  IconSend,
  IconTrash,
  IconX,
  IconChartBar,
  IconPackage,
  IconShoppingCart,
  IconBulb,
} from "@tabler/icons-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  ts: Date;
}

let msgId = 0;

const makeMsg = (role: Message["role"], text: string): Message => ({
  id: ++msgId,
  role,
  text,
  ts: new Date(),
});

const fmt = (d: Date) =>
  d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const renderText = (text: string) => {
  const lines = text.split("\n");

  return lines.map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);

    const rendered = parts.map((p, j) => (j % 2 ? <strong key={j}>{p}</strong> : p));

    if (line.trimStart().startsWith("- ") || line.trimStart().startsWith("• ")) {
      return (
        <div key={i} style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#E8862A",
              marginTop: 7,
              flexShrink: 0,
            }}
          />
          <span>{line.replace(/^[\s\-•]+/, "")}</span>
        </div>
      );
    }

    return (
      <span key={i}>
        {rendered}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
};

const TypingDots = () => (
  <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#E8862A",
          animation: `dot-bounce 1.2s ease ${i * 0.2}s infinite`,
        }}
      />
    ))}
  </div>
);

const AIChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setMessages([
        makeMsg(
          "assistant",
          `👋 Welcome to Yantra AI Assistant.

I'm here to help you manage your business.

You can ask me about:

• Sales Reports

• Inventory

• Customers

• Orders

• Billing

• Profit Analysis

• Business Growth Ideas

How can I help today?`
        ),
      ]);

      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setMessages([]);
      setInput("");
    }
  }, [open]);

  const handleAsk = async (question?: string) => {
    const q = (question ?? input).trim();
    if (!q || loading) return;

    setInput("");
    setMessages((prev) => [...prev, makeMsg("user", q)]);
    setLoading(true);

    try {
      const res = await askAI(q);
      setMessages((prev) => [...prev, makeMsg("assistant", res)]);
    } catch {
      setMessages((prev) => [
        ...prev,
        makeMsg("assistant", "Sorry, I couldn't connect to Yantra AI. Please try again."),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  const clearChat = () => {
    setMessages([
      makeMsg("assistant", "Chat cleared.\n\nHow can I help your business today?"),
    ]);
  };

  const canSend = !loading && input.trim().length > 0;

  return (
    <>
      {/* Floating Glow */}
      {!open && (
        <span
          style={{
            position: "fixed",
            right: 25,
            bottom: 25,
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "rgba(232,134,42,.3)",
            animation: "pulse-ring 2s infinite",
            zIndex: 9998,
          }}
        />
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          right: 28,
          bottom: 28,
          width: 58,
          height: 58,
          border: "none",
          cursor: "pointer",
          borderRadius: "50%",
          background: "linear-gradient(135deg,#E8862A,#DB7A1F)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 12px 30px rgba(232,134,42,.4)",
          zIndex: 9999,
        }}
      >
        {open ? <IconX size={22} /> : <IconRobot size={24} />}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: 20,
            bottom: 95,
            width: 380,
            maxWidth: "calc(100vw - 30px)",
            height: 620,
            maxHeight: "78vh",
            display: "flex",
            flexDirection: "column",
            background: "#ffffff",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(20,33,61,.18)",
            border: "1px solid rgba(20,33,61,.08)",
            zIndex: 9999,
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#14213D",
              color: "#fff",
              padding: "18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  background: "rgba(232,134,42,.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconRobot color="#E8862A" size={24} />
              </div>

              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>Yantra AI</div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#9AA5B8",
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#2F6F5E",
                    }}
                  />
                  Online
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={clearChat}
                style={{
                  border: "none",
                  cursor: "pointer",
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: "rgba(255,255,255,.1)",
                  color: "#fff",
                }}
              >
                <IconTrash size={16} />
              </button>

              <button
                onClick={() => setOpen(false)}
                style={{
                  border: "none",
                  cursor: "pointer",
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: "rgba(255,255,255,.1)",
                  color: "#fff",
                }}
              >
                <IconX size={16} />
              </button>
            </div>
          </div>

          {/* Suggestion Cards */}
          {messages.length <= 1 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: 10,
                padding: 15,
                background: "#fff",
              }}
            >
              {[
                { icon: <IconChartBar color="#E8862A" size={20} />, text: "Today's Sales" },
                { icon: <IconPackage color="#E8862A" size={20} />, text: "Inventory" },
                { icon: <IconShoppingCart color="#E8862A" size={20} />, text: "Orders" },
                { icon: <IconBulb color="#E8862A" size={20} />, text: "Business Tips" },
              ].map((item) => (
                <button
                  key={item.text}
                  onClick={() => handleAsk(item.text)}
                  style={{
                    padding: 14,
                    borderRadius: 14,
                    border: "1px solid #E5E1D8",
                    background: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    alignItems: "center",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#14213D",
                  }}
                >
                  {item.icon}
                  {item.text}
                </button>
              ))}
            </div>
          )}

          {/* Chat messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: 16, background: "#FAF8F4" }}>
            {messages.map((message) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={message.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    marginBottom: 14,
                    alignItems: isUser ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "100%",
                      minWidth: 0,
                      padding: 14,
                      borderRadius: 20,
                      background: isUser
                        ? "linear-gradient(135deg,#E8862A,#DB7A1F)"
                        : "#fff",
                      color: isUser ? "#fff" : "#14213D",
                      boxShadow: "0 10px 25px rgba(20,33,61,.06)",
                    }}
                  >
                    <div
                      style={{
                        marginBottom: 8,
                        fontSize: 12,
                        fontWeight: 700,
                        color: isUser ? "rgba(255,255,255,.85)" : "#14213D99",
                      }}
                    >
                      {isUser ? "You" : "Yantra AI"}
                    </div>

                    <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.7, fontSize: 14 }}>
                      {renderText(message.text)}
                    </div>
                  </div>

                  <div style={{ fontSize: 11, color: "#14213D66" }}>{fmt(message.ts)}</div>
                </div>
              );
            })}

            {loading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 8,
                  padding: 14,
                  borderRadius: 18,
                  background: "#fff",
                  boxShadow: "0 10px 25px rgba(20,33,61,.06)",
                }}
              >
                <TypingDots />
                <span style={{ color: "#14213D99", fontSize: 14 }}>
                  Yantra AI is typing...
                </span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: 16, background: "#fff", borderTop: "1px solid #E5E1D8" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask Yantra AI anything..."
                style={{
                  flex: 1,
                  minWidth: 0,
                  border: "1px solid #E5E1D8",
                  borderRadius: 14,
                  padding: "12px 14px",
                  outline: "none",
                  fontSize: 14,
                  color: "#14213D",
                }}
              />

              <button
                type="button"
                onClick={() => handleAsk()}
                disabled={!canSend}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  border: "none",
                  background: canSend ? "#E8862A" : "#F0C79A",
                  color: "#fff",
                  cursor: canSend ? "pointer" : "not-allowed",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <IconSend size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: .6; }
          40% { transform: translateY(-5px); opacity: 1; }
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.8; }
          70% { transform: scale(1.25); opacity: 0; }
          100% { transform: scale(1.25); opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default AIChatBot;