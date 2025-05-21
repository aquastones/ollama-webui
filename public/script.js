async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const message = userInput.value.trim();
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
        await typeResponse(`AI: ${data.reply}`, chatBox);
    } catch (error) {
        chatBox.innerHTML += `<p><strong>AI:</strong> Error connecting to server.</p>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

function typeResponse(markdown, container) {
    return new Promise((resolve) => {
        const p = document.createElement("p");
        p.innerHTML = "";
        container.appendChild(p);

        const html = marked.parse(markdown);
        let i = 0;

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        const fullText = tempDiv.textContent;

        const interval = setInterval(() => {
            if (i < fullText.length) {
                p.textContent += fullText[i++];
                container.scrollTop = container.scrollHeight;
            } else {
                clearInterval(interval);
                p.innerHTML = html;
                resolve();
            }
        }, 20);
    });
}