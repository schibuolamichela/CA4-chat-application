//required for front end communication between client and server

const socket = io();

const inboxPeople = document.querySelector(".inbox__people");

let userName = "";
let id;
const newUserConnected = function (data) {


  //give the user a random unique id
  id = Math.floor(Math.random() * 1000000);

  userName = 'user-' + id;
  //console.log(typeof(userName));   


  //emit an event with the user id
  socket.emit("new user", userName);
  //call
  addToUsersBox(userName);
};

const addToUsersBox = function (userName) {
  //This if statement checks whether an element of the user-userlist
  //exists and then inverts the result of the expression in the condition
  //to true, while also casting from an object to boolean
  if (!!document.querySelector(`.${userName}-userlist`)) {
    return;

  }

  //setup the divs for displaying the connected users
  //id is set to a string including the username
  const userBox = `
    <div class="chat_id ${userName}-userlist">
      <h5 class="username">${userName}</h5>
    </div>
  `;
  //set the inboxPeople div with the value of userbox
  inboxPeople.innerHTML += userBox;

  const divUsersList = document.getElementById('usersList');

  divUsersList.scrollTop = divUsersList.scrollHeight;
};

//call 
newUserConnected();

//when a new user event is detected
socket.on("new user", function (data) {
  data.map(function (user) {
    return addToUsersBox(user);
  });
});

//when a user leaves
socket.on("user disconnected", function (userName) {
  document.querySelector(`.${userName}-userlist`).remove();
});


const inputField = document.querySelector(".message_form__input");
const messageForm = document.querySelector(".message_form");
const messageBox = document.querySelector(".messages__history");

const addNewMessage = ({ user, message }) => {
  const time = new Date();
  const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

  const receivedMsg = `
  <div class="incoming__message">
    <div class="message received__message">
      <div class="message__info">
        <span class="message__author">${user}</span>
      </div>
      <p class="text_message">${message}</p>
      <div class="message__info">
        <span class="time_date">${formattedTime}</span>
      </div>
      
    </div>
  </div>`;

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

  const divMessages = document.getElementById('messages');

  divMessages.scrollTop = divMessages.scrollHeight;
};

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inputField.value) {
    return;
  }

  socket.emit("chat message", {
    message: inputField.value,
    nick: userName,
  });

  inputField.value = "";
});

socket.on("chat message", function (data) {
  addNewMessage({ user: data.nick, message: data.message });
});