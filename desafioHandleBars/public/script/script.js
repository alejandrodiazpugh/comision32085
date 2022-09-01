const socket = io();

socket.on('from-server-messages', data => {
    console.log('mensajes:', data);
})

const render = (mensajes) => {
    const cuerpoMensajesHTML = mensajes.map((msj)=>{
        return `<span><b>${msj.author}: </b><span>${msj.text}</span></span>`;
    }).join('<br>');  
    console.log(cuerpoMensajesHTML);  

    document.querySelector('#chat').innerHTML = cuerpoMensajesHTML;
}

const enviarMensaje = () => {
    const inputEmail = document.querySelector('#email');
    const inputContenido = document.querySelector('#contenidoMensaje');

    const mensaje = {
        author: inputEmail.value,
        text: inputContenido.value
    }

    socket.emit('from-client-mensaje', mensaje);
}

const sendBtn = document.querySelector('#sendBtn');
sendBtn.addEventListener('click', () => {

})
