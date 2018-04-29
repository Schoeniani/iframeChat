var parent = window.parent;
var chat = document.getElementById('chat');

// Receive message from parent
window.addEventListener('message', function(e){
    var p = document.createElement('p');
    var node = document.createTextNode(e.data);
    p.appendChild(node);
    chat.appendChild(p);
    chat.scrollTop = chat.scrollHeight;
});

// Send message to parent
function sendMessage(){
    var message = document.getElementById('input').value;
    if(message) parent.postMessage(message, window.location.href);
    document.getElementById('input').value = '';
    return false;
}

