const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");

// Replace with your real API key and endpoint if needed
const OPENAI_API_KEY = "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";

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  appendMessage("You", userText);
  input.value = "";
  
  appendMessage("SoulGPT", "Typing...");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: userText }],
    })
  });

  const data = await response.json();
  chatBox.lastChild.remove(); // remove "Typing..." message
  appendMessage("SoulGPT", data.choices[0].message.content);
}

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  msg.style.margin = "10px 0";
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
