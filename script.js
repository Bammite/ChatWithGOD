document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    
    // Envoyer un message
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === '') return;
        
        // Créer l'élément du message
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'sent');
        messageElement.textContent = messageText;
        
        // Ajouter au chat
        chatMessages.appendChild(messageElement);
        
        // Effacer le champ de saisie
        messageInput.value = '';
        
        // Faire défiler vers le bas
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Écouteurs d'événements
    sendBtn.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});