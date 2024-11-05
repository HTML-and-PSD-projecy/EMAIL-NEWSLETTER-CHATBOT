document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.getElementById(targetId.substring(1));

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      console.warn(`Target element ${targetId} not found.`);
    }
  });
});
document.getElementById("openChatBtn").onclick = function () {
  // Show the chatbot when open button is clicked
  document.querySelector(".chatbot").style.display = "block";
  document.getElementById("openChatBtn").style.display = "none"; // Hide the open button
};

function closeChat() {
  // Hide the chatbot and show the open button when the close button is clicked
  document.querySelector(".chatbot").style.display = "none";
  document.getElementById("openChatBtn").style.display = "block";
}

document.getElementById("sendBtn").onclick = function () {
  const userInput = document.getElementById("userInput").value.trim();

  if (userInput !== "") {
    appendMessage("user", userInput); // Add user's message to the chat
    document.getElementById("userInput").value = ""; // Clear the input field

    // Show typing indicator
    document.getElementById("typingIndicator").style.display = "block";

    // Simulate a delay for the bot response
    setTimeout(() => {
      document.getElementById("typingIndicator").style.display = "none"; // Hide typing indicator
      const botResponse = getBotResponse(userInput); // Get bot response based on input
      appendMessage("bot", botResponse); // Add bot's response to the chat
      saveChatHistory(userInput, botResponse); // Save chat history in local storage
    }, 1000);
  }
};

// Function to handle quick response buttons
document.querySelectorAll(".quick-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const quickMessage = this.textContent;
    document.getElementById("userInput").value = quickMessage; // Set textarea value to the button text
    document.getElementById("sendBtn").click(); // Trigger send button click
  });
});

function appendMessage(sender, message) {
  const chatbox = document.getElementById("chatbox");

  const messageElement = document.createElement("li");
  messageElement.className =
    sender === "user" ? "chat-outgoing chat" : "chat-incoming chat";
  messageElement.textContent = message;

  chatbox.appendChild(messageElement);

  // Scroll to the bottom of the chatbox to show the latest message
  chatbox.scrollTop = chatbox.scrollHeight;
}

function getBotResponse(input) {
  // Simple responses based on keywords in the user's input
  if (input.toLowerCase().includes("project")) {
    return "Brainy Breakdown gives you regular email updates.";
  } else if (input.toLowerCase().includes("standout")) {
    return "We have features including catchy news, live engaging feed, and news discussion.";
  } else if (input.toLowerCase().includes("plans")) {
    return "Our subscription plans are monthly and quarterly.";
  } else {
    return "I'm sorry, I don't understand that. Please select a question from the quick responses.";
  }
}

function saveChatHistory(userMessage, botMessage) {
  let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
  chatHistory.push({ user: userMessage, bot: botMessage });
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
}

function getChatHistory() {
  let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
  chatHistory.forEach((chat) => {
    appendMessage("user", chat.user);
    appendMessage("bot", chat.bot);
  });
}

// Call this function on page load to display previous chats
window.onload = function () {
  getChatHistory();
};

// Optional: Typing indicator (add this inside your HTML if you need it)
// <div id="typingIndicator" style="display:none;">Bot is typing...</div>
