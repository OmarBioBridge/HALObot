// Matches IDs in index (1).html
async function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if (!text) return;

  appendMessage("user", text);
  input.value = "";

  // typing indicator
  const chatBox = document.getElementById("chatBox");
  const typing = document.createElement("div");
  typing.className = "typing-indicator";
  typing.textContent = "Assistant is typing...";
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch("https://haloai-production.up.railway.app/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    chatBox.removeChild(typing);
    appendMessage("bot", data.response ?? "No response.");
  } catch (err) {
    chatBox.removeChild(typing);
    appendMessage("bot", "❌ Error contacting the bot.");
  }
}

function appendMessage(sender, text) {
  const chatBox = document.getElementById("chatBox");
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerHTML = `
    <div class="avatar">${sender === "user" ? "🧑" : "🤖"}</div>
    <div class="bubble">${text}</div>
  `;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Dark mode toggle (kept external to avoid duplicate handlers)
document.addEventListener("DOMContentLoaded", () => {
  const darkToggle = document.getElementById("darkToggle");
  if (darkToggle) {
    darkToggle.addEventListener("change", () => {
      document.body.classList.toggle("dark");
    });
  }
  const input = document.getElementById("messageInput");
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  }
});

