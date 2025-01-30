async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const message = userInput.value;
    if (!message) return;

    chatBox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
    userInput.value = "";

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        chatBox.innerHTML += `<p><strong>AI:</strong> ${data.reply}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        chatBox.innerHTML += `<p><strong>AI:</strong> Error connecting to server.</p>`;
    }
}