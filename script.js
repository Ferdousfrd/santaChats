const inputElement = document.querySelector('.message-input')
const chatBodyElement = document.querySelector('.chat-body')
const submitBtnElement = document.getElementById('send-message')
const fileInputElement = document.getElementById('file-input')
const attachmentBtnElement = document.getElementById('file-attachment')
const fileUploadWrapperEl = document.querySelector('.file-upload-wrapper')
const chatbotToggler = document.querySelector('#chatbot-toggler')
const headerChatcloseBtn = document.getElementById("close-chatbot")


const API_KEY = "AIzaSyBMOG8V0AhfoX02pk-TX7p7xTrSyo32ouU"
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`

// creating an object to store user input messages so we can globally access it
const userData = {
    message: null,
    file : {
        data: null,
        mime_type: null
    }
}

// listening to change to our input element on every keystroke and storing msg
inputElement.addEventListener("input",function(event){
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
                parts: [{ text: `The user is writing message to sante. so, Pretend to be Santa, who lives in Santa calus village, Finland. If the user text is in Finnish, reply in finnish.
                    And if user texts in English, reply in  english . Here is the message,${userData.message}` 
                        }, ...(userData.file.data? [{ inline_data: userData.file }] : []
                        )]
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
        // reseting user file data after attaching and sending the file
        userData.file = {}
        incomingMsgElement.classList.remove("thinking")
        chatBodyElement.scrollTo({ top: chatBodyElement.scrollHeight, behavior: "smooth" })
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
    const newMessage = `<div class="message-text">${msg}</div>
                        ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,
                            ${userData.file.data}" class="attachment" />` : ""}`
    const outgoingMsgElement = createMessageElementIncominBot(newMessage, "user-message")
    chatBodyElement.appendChild(outgoingMsgElement)
    inputElement.value = ""
    fileUploadWrapperEl.querySelector("img").src = "assets/link.png"

    

    // to make it scroll above after body updates for better experince
    chatBodyElement.scrollTo({ top: chatBodyElement.scrollHeight, behavior: "smooth" })

    // bot thinking animtation after sending a text
    setTimeout(()=>{
        const newMessage = `<img src="assets/santa-claus-face.png" width="35px" height="35px" />
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
        chatBodyElement.scrollTo({ top: chatBodyElement.scrollHeight, behavior: "smooth" })
        generateBotResponse(incomingMsgElement)
    }, 600)

}


// submit button handler
submitBtnElement.addEventListener('click', function(event){
    event.preventDefault()
    handleOutgoinMsg(userData.message)
})




// handling file attachment btn
attachmentBtnElement.addEventListener('click', ()=>{
    fileInputElement.click()            // this elemnt.click() method trigers or simulates the action of cicking on our hidden file input element
})

// handle the file attachment
fileInputElement.addEventListener('change', ()=>{
    const file = fileInputElement.files[0]          // here files[0] means the the first file from the FileList object(an object of our selected files)
    if(!file)return

    const reader = new FileReader()         // converting the file to base64 format
    reader.onload = (event) => {
        fileUploadWrapperEl.querySelector("img").src = event.target.result
        const base64String = event.target.result.split(",")[1]

        // storing the file data in our userdata obj
        userData.file = {
            data: base64String,
            mime_type: file.type
        }
        fileInputElement.value = ""
    }

    reader.readAsDataURL(file)
})


const picker = new EmojiMart.Picker ({
    theme : "light",
    skinTonePosition: "none",
    previewPosition : "none",

    onEmojiSelect : (emoji) => {
        const { selectionStart: start, selectionEnd: end } = inputElement
        inputElement.setRangeText(emoji.native, start, end)
        inputElement.focus()
    },

    onClickOutside : (e) => {
        if(e.target.closest("#emoji-picker")){
            console.log("works")
            document.body.classList.toggle("show-emoji-picker")
        } else {
            document.body.classList.remove("show-emoji-picker")
            
        }
    }
})

document.querySelector(".chat-form").appendChild(picker)

chatbotToggler.addEventListener('click', () => document.body.classList.toggle("show-chatbot")
)
headerChatcloseBtn.addEventListener('click', () => document.body.classList.toggle("show-chatbot")
)




// select the element in the document. document.querySelector('#id')
// selectedelement.addEventListener('whatTypeEvent(click)', whatwilldo(functon))
    // get the value of userInput
    // add that usermsg in the chat 

// create the msg dynamicly
// create a div with our msg and add class
// select the body where and push the msg


// when sent user text to gemni, make it pretend santa
