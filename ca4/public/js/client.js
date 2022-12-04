var userName = "";
var userColor = "";
var isFirstLoad = true;

const txtInputUser = document.getElementById('txtInputUser');
const sendButton = document.getElementById('btnSend');
// const inputField = document.getElementById('inputField');

//Required for front end communication between client and server
const socket = io();
const inboxPeople = document.querySelector(".inbox__people");

const inputField = document.querySelector(".message_form__input");
const messageForm = document.querySelector(".message_form");
const messageBox = document.querySelector(".messages__history");

var modal = document.getElementById('myModal');
var btnCloseModal = document.getElementById('modalButton');

//Creates the modal to insert the username to display to other users.
function createModal() {

  modal.style.display = "block";
  modal.className = "modal fade show";

  btnCloseModal.addEventListener('click', (e) => {
    let username = txtInputUser.value;

    //Check if the user has specify the username.
    if (username === "" || username === null || username === undefined) {
      txtInputUser.value="";
      alert("Username cannot be empty.");
    }
    else {
      modal.style.display = "none";
      modal.className = "modal fade";

      //When user will confirm the username, the modal will close.
      newUserConnected(username);
    }
    inputField.focus();
  });
}

//Creates the notification toast to notify a message to the other users
function createToast(header, message) {
  const notificationToast = document.getElementById('notificationToast');

  let toastHeader = document.getElementById("toastHeader");
  let toastTime = document.getElementById("toastTime");
  let toastMessage = document.getElementById("toastMessage");
  let time = new Date();

  toastHeader.innerText = header;
  toastTime.innerText = time.toLocaleString("en-US", { hour: "numeric", minute: "2-digit" });
  toastMessage.innerText = message;

  //Shows the notification.
  const toast = new bootstrap.Toast(notificationToast);
  toast.show();
}

//Sends the message by pressing enter from the keyboard.
inputField.addEventListener('keydown', function (e) {
  // Get the code of pressed key
  const keyCode = e.which || e.keyCode;

  // 13 represents the Enter key
  if (keyCode === 13 && !e.shiftKey) {
    // Don't generate a new line
    e.preventDefault();
    sendButton.click();
  }

  //Notify to the other users that the user is typing a message.
  socket.emit("typing", userName);
});

//Confirms the username by pressing enter from the keyboard.
txtInputUser.addEventListener('keydown', function (e) {
  // Get the code of pressed key
  const keyCode = e.which || e.keyCode;

  // 13 represents the Enter key
  if (keyCode === 13 && !e.shiftKey) {
    // Don't generate a new line
    e.preventDefault();
    btnCloseModal.click();
  }
});

//Returns a random color for the user
function getRandomUserColor() {
  return "hsla(" + ~~(360 * Math.random()) + "," + "90%," + "30%,1)";
}

const newUserConnected = function (data) {

  //give the user a random unique id
  let id = Math.floor(Math.random() * 1000000);

  if (data === null || data === "" || data === undefined) {
    userName = "user-" + id;
  }
  else {
    userName = String(data);
  }

  userColor = getRandomUserColor();

  //emit an event with the username and the user color
  socket.emit("new user", { user: userName, color: userColor });
  //Add the user to the users list
  addToUsersBox(userName, userColor);
};

const addToUsersBox = function (username, userColor) {
  //This if statement checks whether an element of the user-userlist
  //exists and then inverts the result of the expression in the condition
  //to true, while also casting from an object to boolean
  if (!!document.querySelector(`.${username}-userlist`)) {
    return;
  }

  //Setup the divs for displaying the connected users.
  //Id is set to a string including the username.
  const userBox = `
    <div class="chat_id ${username}-userlist">
      <h5 class="username" style="color: ${userColor}">${username}</h5>
    </div>
  `;

  //Add the userBox to the inboxPeople div to display it.
  inboxPeople.innerHTML += userBox;

  //Notify in the messages div that the user joined the chat.
  if (!isFirstLoad && username !== userName) {
    var userBoxJoinChat = `<p style="align-self: center;">${username} joined the chat</p>`;
    messageBox.innerHTML += userBoxJoinChat;
  }

  //Scroll automatically the users div to the bottom.
  const divUsersList = document.getElementById('usersList');
  divUsersList.scrollTop = divUsersList.scrollHeight;
};

//when a new user event is detected
socket.on("new user", function (data) {
  data.map(function (userData) {
    addToUsersBox(userData.user, userData.color);

    scrollMessagesToBottom();

    //Notify to other users that the user joined the chat.
    if (userData.user !== userName && !isFirstLoad) {
      createToast("New user connected", `User ${userData.user} joined the chat`);
    }

  });
  isFirstLoad = false;
});

//when a user leaves
socket.on("user disconnected", function (username) {
  //Notify in the messages div that the user left the chat.
  if (username !== null && username !== undefined) {
    let userBoxChat = `<p style="align-self: center;">${username} left the chat</p>`;
    messageBox.innerHTML += userBoxChat;
  }

  let userBox = document.querySelector(`.${username}-userlist`);

  if (userBox !== null && userBox !== undefined) {
    //Removes the user from the users list.
    document.querySelector(`.${username}-userlist`).remove();

    //Notify to other users that the user left the chat.
    createToast("User disconnected", `User ${username} left the chat`);
  }

  scrollMessagesToBottom();
});

//Adds a new message to the messages div.
const addNewMessage = ({ user, message, color }) => {
  const time = new Date();
  const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

  //Build the div for the received message
  const receivedMsg = `
  <div class="incoming__message">
    <div class="message received__message">
      <div class="message__info">
        <span class="message__author" style="color: ${color}">${user}</span>
      </div>
      <p class="text_message">${message}</p>
      <div class="message__info">
        <span class="time_date">${formattedTime}</span>
      </div>
      
    </div>
  </div>`;

  //Build the div for the sended message
  const myMsg = `
  <div class="outgoing__message">
    <div class="message sent__message">
      <p class="text_message">${message}</p>
      <div class="message__info">
        <span class="time_date">${formattedTime}</span>
      </div>
    </div>
  </div>`;

  //is the message sent or received
  messageBox.innerHTML += user === userName ? myMsg : receivedMsg;

  scrollMessagesToBottom();
};

//Scroll automatically the messages div to the bottom
function scrollMessagesToBottom() {

  const divMessages = document.getElementById('messages');

  divMessages.scrollTop = divMessages.scrollHeight;
}

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inputField.value) {
    return;
  }

  //Notify the sending of a new message.
  socket.emit("chat message", {
    message: inputField.value,
    nick: userName,
    color: userColor
  });

  //Reset and focus the text area.
  inputField.value = "";
  inputField.focus();
});

//when a user send a new message
socket.on("chat message", function (data) {
  addNewMessage({ user: data.nick, message: data.message, color: data.color });
});

//when a user is typing a message
socket.on("typing", function (data) {
  let typingUsername = data;

  //Builds the "user is typing" label.
  const userTypingDiv = `
  <h6 class="mt-1 ms-2 ${typingUsername}-typing" style="color: darkgray;"><em>${typingUsername} is typing</em></h6>
  `
  let userTypingLabel = document.querySelector(`.${typingUsername}-typing`);

  if ((userTypingLabel === null || userTypingLabel === undefined) && typingUsername !== userName) {
    let userBox = document.querySelector(`.${typingUsername}-userlist`);

    if (userBox !== null && userBox !== undefined) {
      //Shows the "is typing" label.
      userBox.innerHTML += userTypingDiv;
    }
  }

  setTypingTimeout(typingUsername);
});

//Sets the timeout after which to hide the "typing" label for the typing user
function setTypingTimeout(username) {
  setTimeout(() => {
    let typingLabel = document.querySelector(`.${username}-typing`);

    if (typingLabel !== null && typingLabel !== undefined) {
      typingLabel.remove();
    }
  }, 3000);
}

//Create the modal form to enter the username and focus the input.
createModal();
txtInputUser.focus();