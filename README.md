# WORLD CHAT
Michela Schibuola - 52209826


## Introduction
The World Chat is a web site, and its main purpose is to provide a chat accessible from all over the world.


## Pages Description
The web site is composed of a page that provides the chat, a home page that provides an overview of the site, and an about page that provides further details, supplementary information, and background information.


The design of each page maintains the same style and uses the same palette of colors to keep the site consistent. The color palette is composed of two shades of green and three shades of green.


##### Navigation-bar
The navigation-bar is the same for each page.
It is a Bootstrap navigation-bar composed of a title in the centre of the bar, and has below it the links to the three pages *home*, *chat*, and *about*.


To have the same navbar on each page without duplicating its code, there is a separate html file called *nav.html* that contains only the navbar code, and, through the *nav.js* Javascript file, it is necessary to add just one *<script>* tag at the start of each html file that copies the code. This way, every time there are changes, they will be reflected on every page.


##### Chat Page
The Chat page is the page that contains the chat. It is composed of a *textarea*, in which the users can write the text they want to send, a button used to send the message, a space for the history messages, and a lateral bar with a list of all the active users.


When the page is opened, the user is prompted to enter their username, which allows them to be identified. After entering the username, you are joining the chat, and your name is shown in the left bar. If another user joins o leaves the chat, a notification appears on the bottom left, displaying the user's username and the time the user entered/exited; the name of the user who entered/exited is written in the message history, and the name is added/removed to/from the users list.


To write a message, there is a *textarea* in which is possible to write the text. It is possible to send the message using the send button or using the Enter key. It is possible to write a multiline text; to start a new line without sending the message, you need to press shift+enter.


Every time a message is sent or received, or a user leaves or joins the chat, the message history scrolls to the newest message/information.


If a user is typing a message, the phrase *"is typing..."* appears on the left bar, below the user's name.When multiple users are writing at the same time, the phrase *"is typing..."* appears under each user's name.


The messages sent by the current user are displayed on the right, and the messages sent by other users are displayed on the left side. The text and time of each message are displayed, and messages from other users include the username of the person who sent them.


To distinguish the users, each name has an associated color, and when a username is displayed, it is written with its associated color.


###### Client and Server communication
The client side communicates with the server (*index.js*) through a web socket (a computer communications protocol that provides full-duplex communication channels over a single TCP connection). So the bidirectional channel between the Socket.IO server (*index.js*) and the Socket.IO client is established with a websocket.
- The server opens a socket connection
- The server keeps listening to the client
- The server defines the events
- The client uses *emit* to invoke the events defined by the server and declares them with *on*
- After the client invoked with *emit*, the server executes the correspondent method *on* associated
- The server answers the client with *emit*
- The client receives server responses via methods *on*.



##### Home Page
The home page is a static page that contains an initial banner with a link to the chat and some images that represent the idea of the chat. Then there are listed the main purposes and characteristics of the chat. And at the bottom there are the three main steps to joining and using the chat.


##### About Page
The about page is a static page composed of containers that explain the important information about the chat: introduction, what you can do, online users' list, message text, joining the chat, leaving the chat, and how it was developed.


## Extras
To scroll just single areas in the chat application, a personalised scroll bar is used, which is hidden when not needed but appears when there is no more space for all the elements. It is used on every page, but especially in the chat.html users and message lists.It has personalised colors and shape because it has a different border-radius.


The *modal* is used to implement the username insertion.The modal is a Bootstrap component that, in this web site, is used as an input element. Before using the chat, it is required to go through it.


The *toast* protocol is used to implement chat joining.The toast is a Bootstrap component. When a new user joins the chat, it shows for a specific time and can be removed using the x. It is improved with some animations in the entrance and in the exit.


## Challenges I faced
The first challenge was to create a clear elements arrangement. To organize all the chat elements on a page without scrolling. To accomplish this, I divided the screen into three sections: the sidebar containing the user list, the chat history, and the chat input.


Another challenge was implementing the casual color choice for the username.


Another challenge was managing usernames when users chose to use spaces or to begin with a number.To solve that, I used the id as an identifier.


I tested the website on various devices to ensure portability, and I reduced and increased page zoom to see if the pages were still readable at different screen resolutions.The use of Bootstrap provided the page with a responsive layout and consistency of design.


## References
[Bootstrap](https://getbootstrap.com/)