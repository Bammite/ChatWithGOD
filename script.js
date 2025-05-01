document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const user1Btn = document.getElementById('user1');
    const user2Btn = document.getElementById('user2');
    
    let currentUser = 'user1';
    
    // Charger les messages depuis le localStorage
    loadMessages();
    
    // Vérifier les nouveaux messages toutes les secondes
    setInterval(loadMessages, 1000);
    
    // Gestion du changement d'utilisateur
    user1Btn.addEventListener('click', function() {
        currentUser = 'user1';
        user1Btn.classList.add('active');
        user2Btn.classList.remove('active');
    });
    
    user2Btn.addEventListener('click', function() {
        currentUser = 'user2';
        user2Btn.classList.add('active');
        user1Btn.classList.remove('active');
    });
    
    // Envoyer un message
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === '') return;
        
        // Créer un nouveau message
        const newMessage = {
            text: messageText,
            user: currentUser,
            timestamp: new Date().getTime()
        };
        
        // Récupérer les messages existants
        let messages = JSON.parse(localStorage.getItem('chatMessages') || []);
        
        // Ajouter le nouveau message
        messages.push(newMessage);
        
        // Sauvegarder dans le localStorage
        localStorage.setItem('chatMessages', JSON.stringify(messages));
        
        // Effacer le champ de saisie
        messageInput.value = '';
        
        // Recharger les messages
        loadMessages();
    }
    
    function loadMessages() {
        // Récupérer les messages depuis le localStorage
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        
        // Effacer les messages actuels
        chatMessages.innerHTML = '';
        
        // Afficher chaque message
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.classList.add(message.user);
            
            // Formater la date
            const date = new Date(message.timestamp);
            const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            // Afficher l'utilisateur et l'heure
            const userDisplay = message.user === 'user1' ? 'Utilisateur 1' : 'Utilisateur 2';
            messageElement.innerHTML = `<strong>${userDisplay}</strong> (${timeString}):<br>${message.text}`;
            
            chatMessages.appendChild(messageElement);
        });
        
        // Faire défiler vers le bas
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});