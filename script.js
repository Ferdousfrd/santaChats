const inputElement = document.querySelector('.message-input')
const chatBodyElement = document.querySelector('.chat-body')
const submitBtnElement = document.getElementById('send-message')

const API_KEY = "AIzaSyBMOG8V0AhfoX02pk-TX7p7xTrSyo32ouU"
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`

// creating an object to store user input messages so we can globally access it
const userData = {
    message: null
}

// listening to change to our input element on every keystroke and storing msg
inputElement.addEventListener("keydown",function(event){
    userData.message = event.target.value.trim()
})

// generting bot response from geminiApi
async function generateBotResponse(incomingMsgElement){
    const messageElementIncominBot = incomingMsgElement.querySelector(".message-text")

    //API request options
    const requestOptions = {
        method : "POST",
        headers : { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{
                // sending the user text with some extra text so we make chatbot pretend santa
                parts: [{ text: `Pretend to be Santa. The user is writing message to sante.
                            Here is the message,${userData.message}` 
                        }]
            }]
        })
    }

    try {
        // fetch bot response from API
        const response = await fetch(API_URL, requestOptions)
        const data = await response.json()
        if(!response.ok) throw new Error(data.error.message)
        
        // extract and displlay bot response from gemini API
        const apiResponseText = data.candidates[0].content.parts[0].text.trim()
        messageElementIncominBot.innerHTML = apiResponseText
    }
    catch (error){
        console.log(error)
    }
    finally {
        incomingMsgElement.classList.remove("thinking")
    }
}


// create a new div element with our new msg
function createMessageElementIncominBot(content, ...classes){
    const newDiv = document.createElement('div')
    newDiv.classList.add("message", ...classes)
    newDiv.innerHTML = content
    return newDiv
}

// handling outgoing user msgs and pushing it in the body
function handleOutgoinMsg(msg){
    const newMessage = `<div class="message-text">${msg}</div>`
    const outgoingMsgElement = createMessageElementIncominBot(newMessage, "user-message")
    chatBodyElement.appendChild(outgoingMsgElement)
    inputElement.value = ""

    // bot thinking animtation after sending a text
    setTimeout(()=>{
        const newMessage = `<img src="assets/santa-claus-face.png" width="35px" height="35px" />
                    <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
                </svg>

                <div class="message-text">
                    <div class="thinking-indicator">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>`

        const incomingMsgElement = createMessageElementIncominBot(newMessage, "bot-message", "thinking")
        chatBodyElement.appendChild(incomingMsgElement)
        inputElement.value = ""
        generateBotResponse(incomingMsgElement)
    }, 600)

}

// submit button handler
submitBtnElement.addEventListener('click', function(event){
    event.preventDefault()
    handleOutgoinMsg(userData.message)
})






// select the element in the document. document.querySelector('#id')
// selectedelement.addEventListener('whatTypeEvent(click)', whatwilldo(functon))
    // get the value of userInput
    // add that usermsg in the chat 

// create the msg dynamicly
// create a div with our msg and add class
// select the body where and push the msg


// when sent user text to gemni, make it pretend santa
