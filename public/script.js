async function sendMessage() {
    const input = document.getElementById("user-input");
    const chat = document.getElementById("chat-box");
    const message = input.value.trim();
    if (!message) return;

    chat.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
    input.value = "";

    try {
        const res = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });
        const data = await res.json();
        await typeResponse(`AI: ${data.reply}`, chat);
    } catch {
        chat.innerHTML += `<p><strong>AI:</strong> Server error.</p>`;
    }

    chat.scrollTop = chat.scrollHeight;
}

function typeResponse(markdown, container) {
    return new Promise((resolve) => {
        const p = container.appendChild(document.createElement("p"));
        const html = marked.parse(markdown);
        const text = new DOMParser().parseFromString(html, "text/html").body.textContent;
        let i = 0;

        const interval = setInterval(() => {
            if (i < text.length) {
                p.textContent += text[i++];
                container.scrollTop = container.scrollHeight;
            } else {
                clearInterval(interval);
                p.innerHTML = html;
                MathJax.typesetPromise([p]).then(resolve);
            }
        }, 20);
    });
}