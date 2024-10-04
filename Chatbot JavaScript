document.getElementById("sendBtn").onclick = function() {
  let userInput = document.getElementById("userInput").value;

  if (userInput.trim() !== "") {
      appendMessage("user", userInput);
      document.getElementById("userInput").value = ""; // Clear input field
      
      // Show typing indicator
      document.getElementById("typingIndicator").style.display = 'block';

      // Simulate bot response
      setTimeout(() => {
          document.getElementById("typingIndicator").style.display = 'none'; // Hide typing indicator
          let botResponse = getBotResponse(userInput);
          appendMessage("bot", botResponse);
          saveChatHistory(userInput, botResponse); // Save chat history
      }, 1000);
  }
};

// Add event listener for quick response buttons
document.querySelectorAll('.quick-btn').forEach(button => {
  button.addEventListener('click', function() {
      document.getElementById("userInput").value = this.textContent; // Set textarea value to button text
      document.getElementById("sendBtn").click(); // Trigger send button click
  });
});

function appendMessage(sender, message) {
  const chatbox = document.getElementById("chatbox");
  
  const messageElement = document.createElement("li");
  messageElement.className = sender === "user" ? "chat-outgoing chat" : "chat-incoming chat";
  
  messageElement.textContent = message;

  chatbox.appendChild(messageElement);

  // Scroll to the bottom of the chatbox
  chatbox.scrollTop = chatbox.scrollHeight;
}

function getBotResponse(input) {
  // Simple responses based on user input
  if (input.toLowerCase().includes("project")) {
      return "Brainy Breakdown gives you regular email updates.";
  } else if (input.toLowerCase().includes("standout")) {
      return "We have features including catchy news,live engaging feed and news discussion.";
  } else if (input.toLowerCase().includes("plans")) {
      return "Our subscriptions plans are monthly and quaterly.";
  } else {
      return "I'm sorry, I don't understand that.Please ask from the below questions.";
  }
}

function saveChatHistory(userMessage, botMessage) {
  let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
  chatHistory.push({ user: userMessage, bot: botMessage });
  localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

function getChatHistory() {
  let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
  chatHistory.forEach(chat => {
      appendMessage("user", chat.user);
      appendMessage("bot", chat.bot);
  });
}

// Call this function on page load to display previous chats
window.onload = function() {
  getChatHistory();
};

function closeChat() {
   document.querySelector('.chatbot').style.display = 'none';
   document.getElementById('openChatBtn').style.display = 'block'; // Show open button when chat is closed
   clearChat(); // Clear the chat history when closing
}

function openChat() {
   document.querySelector('.chatbot').style.display = 'block'; // Show chatbot when open button is clicked
   document.getElementById('openChatBtn').style.display = 'none'; // Hide open button
}

// Function to clear the chatbox and local storage
function clearChat() {
   const chatbox = document.getElementById("chatbox");
   while (chatbox.firstChild) {
       chatbox.removeChild(chatbox.firstChild); // Remove all messages from the chatbox
   }
   localStorage.removeItem('chatHistory'); // Clear saved chat history in local storage
   appendMessage("chat-incoming", "Hey! How can I assist you today?"); // Reset initial bot message
}

// Add event listener for open button
document.getElementById('openChatBtn').onclick = openChat;
