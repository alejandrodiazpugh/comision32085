const socket = io();

socket.on("from-server-messages", (data) => {
  renderChat(data);
});

socket.on("from-server-products", (data) => {
  renderProducts(data);
});

const renderChat = (mensajes) => {
  const cuerpoMensajesHTML = mensajes
    .map((mensaje) => {
      return `<span><b class="chatAuthor">${mensaje.author}</b> <small>(${mensaje.dateTime})</small>: <span class="chatText"><i>${mensaje.text}</i></span></span>`;
    })
    .join("<br>");

  document.querySelector("#chatMessages").innerHTML = cuerpoMensajesHTML;
};

const renderProducts = (products) => {
  const productTable = document.querySelector("#productTable");

  const filaTablaProductos = products.map((product) => {
    return `
        <tr>
            <td>${product.id}</td>
            <td>${product.titulo}</td>
            <td>$${parseInt(product.precio).toLocaleString('en-US')}</td>
            <td><img src="${product.url}" alt="" class="tableImg"/></td>
        </tr>`;
  }).join('<br>');

  console.log(filaTablaProductos)

  productTable.innerHTML = filaTablaProductos;
};

const chatBtn = document.querySelector("#chatBtn");
chatBtn.addEventListener("click", () => {
  const inputEmail = document.querySelector("#inputEmail");
  const inputContenido = document.querySelector("#contenidoMensaje");

  let date = new Date();
  let stringDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${
    date.toTimeString().split(" ")[0]
  }`;

  const mensaje = {
    author: inputEmail.value,
    dateTime: stringDate,
    text: inputContenido.value,
  };

  socket.emit("from-client-message", mensaje);
});

const sendBtn = document.querySelector("#sendBtn");
sendBtn.addEventListener("click", () => {
  const titleInput = document.querySelector("#titleInput");
  const priceInput = document.querySelector("#priceInput");
  const urlInput = document.querySelector("#urlInput");

  const producto = {
    titulo: titleInput.value,
    precio: priceInput.value,
    url: urlInput.value,
  };

  socket.emit("from-client-product", producto);
});
