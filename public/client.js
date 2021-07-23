const socket = io("http://192.168.1.105:80")

socket.on("connection");


var audio = new Audio("notify.mp3");

/*-----------------------------------------------------------*/
// const send_message =()=>{
//     const message_Input = document.querySelector("#message");
//     const Message = message_Input.value;
//     socket.emit("message",Message);
// }
// socket.on("message",(data)=>{
//     document.querySelector("h1").innerHTML=data;
// });


/*-----------------------------------------------------------*/


const messageContainer = document.querySelector("#chat_container");
const form = document.getElementById("container_send");

const appending = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == "left")
    {
        audio.play()
    }
}

const send_username=()=>{
    const username_Input = document.querySelector("#text_username");
    const username = username_Input.value;
    socket.emit('new_user_connected',username);
}
socket.on("user_connected", username=>{
    console.log(username);
    appending(`${username} joined the chat`,'right');
});

form.addEventListener('submit',(eventoccur)=>{
    eventoccur.preventDefault();
    const message_Input = document.querySelector("#message");
    const message = message_Input.value
    appending(`You:${message}`,`right`);
    socket.emit(`send`,message);
    message_Input.value ="";
})
socket.on("recieve",(info)=>{
    appending(`${info.username}:${info.message}`,`left`);
})

    