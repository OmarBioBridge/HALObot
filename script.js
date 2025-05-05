async function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();
    if (!message) return;

    // Show user message
    const chat = document.getElementById("chat");
    const userBubble = document.createElement("div");
    userBubble.className = "user-bubble";
    userBubble.innerText = message;
    chat.appendChild(userBubble);

    input.value = "";

    // Send to backend
    try {
        const res = await fetch("https://haloai-production.up.railway.app/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });

        const data = await res.json();
        const botBubble = document.createElement("div");
        botBubble.className = "bot-bubble";
        botBubble.innerText = data.response || data.error || "No response.";
        chat.appendChild(botBubble);
    } catch (err) {
        const errorBubble = document.createElement("div");
        errorBubble.className = "bot-bubble error";
        errorBubble.innerText = "❌ Error contacting the bot.";
        chat.appendChild(errorBubble);
    }
}
