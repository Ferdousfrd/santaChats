const inputValue = document.querySelector('.message-input')
const chatBody = document.querySelector('.chat-body')

// create a new div element with our new msg
function createMessageElement(content, classes){
    const newDiv = document.createElement('div')
    newDiv.classList.add("message", classes)
    newDiv.innerHTML = content
    return newDiv
}

// handling outgoing user msgs and pushing it in the body
function handleOutgoinMsg(msg){
    const msgDivContent = `<div class="message-text">${msg}</div>`
    const outgoingMsgElement = createMessageElement(msgDivContent, "user-message")
    chatBody.appendChild(outgoingMsgElement)
}


// handling sending message with "Enter" press
inputValue.addEventListener("keydown",function(event){
    const userMsg = event.target.value.trim()
    if(event.key === "Enter" && userMsg){
        handleOutgoinMsg(userMsg)
    }
})







// select the element in the document. document.querySelector('#id')
// selectedelement.addEventListener('whatTypeEvent(click)', whatwilldo(functon))
    // get the value of userInput
    // add that usermsg in the chat 

// create the msg dynamicly
// create a div with our msg and add class
// select the body where and push the msg
