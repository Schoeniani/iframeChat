var children = [];
var chats = document.getElementById('chats');

// Receive message from iframe
window.addEventListener('message', function(e){
    children.forEach(function(child){ 
        child.postMessage(e.source.name+': ' + e.data, window.location.href); 
    });
});

function addChat(e){
    var wrapper = document.createElement('div');
    wrapper.className = 'chat-wrapper';
    var iframe = document.createElement('iframe');
    iframe.name = 'User'+(1+children.length);
    iframe.src = '/frame.html';
    iframe.className = 'z-depth-2';
    wrapper.appendChild(iframe);
    chats.appendChild(wrapper);

    // Add the created chat window to children
    children.push(iframe.contentWindow);

    // Make it draggable
    interact(wrapper).draggable({
        inertia: true,
        restrict: {
          restriction: 'parent',
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        autoScroll: true,
        onmove: function(e){
            var target = e.target;
            var x = (parseFloat(target.getAttribute('data-x')) || 0) + e.dx;
            var y = (parseFloat(target.getAttribute('data-y')) || 0) + e.dy;
            target.style.webkitTransform = target.style.transform = 'translate('+x+'px,'+y+'px)';
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }
    })
}

