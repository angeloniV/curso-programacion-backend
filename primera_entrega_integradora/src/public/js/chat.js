let socket = io()
let user = ''
let chatBox = document.getElementById('message');

Swal.fire({
    title: 'Authentication',
    input: 'text',
    text: 'Ingrese su nombre',
    inputValidator: value => {
        return !value.trim() && 'Porfavor, escribe un nombre.'
    },
    allowOutsideClick: false
}).then( result => {
    user = result.value;
    document.getElementById('username').innerHTML = user
})

// Enviamos mensajes
chatBox.addEventListener('keyup', event => {
    if(event.key === 'Enter') {
        if(chatBox.value.trim().length > 0) {
            socket.emit('message', {
                user,
                message: chatBox.value
            })
            
            sendMessagePost(user, chatBox.value);

            chatBox.value = '';
        }
    }
})


// Recibir Mensahes
socket.on('logs', data => {
    const divLog = document.getElementById('messageLogs')
    let messages = ''

    data.forEach(message => {
        messages += `<p><i>${message.user}</i>: ${message.message}</p>`
    });

    divLog.innerHTML = messages
})


// Nose como habria que hacer sino es a traves de un request desde este js.
function sendMessagePost(user, message){
     var xhr = new XMLHttpRequest();
     xhr.open("POST", "/chat/api/message", true);
     xhr.setRequestHeader('Content-Type', 'application/json');
     xhr.send(JSON.stringify({
         user: user,
         message:message
     }));            
}
