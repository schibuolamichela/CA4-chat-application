# WORLD CHAT
Michela Schibuola - 52209826

## Introduction
The World Chat is a web site, which the main purpose is to provide a chat accessible from all over the world.

## Pages Description
The web site is composed by a page which provides the chat, an home page which provides an overview of the site, and an about page which provides further details, supplementary and background information. 
The design of each page maintain the same style and uses the same palette of colors to let the site consistent. The color palette is composed by two shades of green and three shades of green. 

##### Navigation-bar
The navigation-bar is the same for each page. 
It is a Bootstrap navigation-bar composed by a title on the center of the bar, and has below it the links to the three pages *home*, *chat*, and *about*.

To have the same navbar on each page without duplicating its code there is a separate html file call *nav.html* which contains only the navbar code and, through the *nav.js* Javascript file, it is necessary just one *<script>* tag at the start of each html file which copy the code. On this way, everytime there are changes, they would be reflected on every page.

##### Chat Page
The Chat page is the page which contains the chat: composed by a textarea, in which the users can write the text they want to send, a button used to send the message, a space for the history messages, and a lateral bar with the list of all the active users.

When the page is opened is asked to write the username, that will allow users to be recognizable. After entered the username you are joining the chat, and your name is shown in the left bar. If another user join the chat, on the bottom left is shown a notification, which shows the username and the time when the user entered,  in the messages history is written the name of the username that entered and the name will be added to the users list. If a user leave the chat, it is informed in the messages history.

To write a message there is a textarea in which is possible write the text. Is is possible to send the message using the send button or using the Enter key. It is possible to write a multiline text; to start a new line without sending the message is needed to press shift+enter.

Everytime a message is sent or received, or a user leave or join the chat, the message history scroll to the newest message/information.

If a user is writing a message, on the left bar, below the name, is shown "is typing...". If multiple users are writing in the same moment, under each of their name is shown "is typing...".

The messages sent from the current user is displayed on the right, the messages send by other users are displayed on the left side. For each message is displayed the text and the time it was sent, the messages from the other users have also the username of the person that has send them.

To distinguish the users, each name has associated a color, and when a username is displayed, it is written with its associated color.

The chat application from the client size communicate with the web server

##### Home Page
The home page is a static page that comprehends an initial banner with a link to the chat and some images that represent the idea of the chat. Then there are written the main purposes and the characteristics of the chat. And in the bottom there are the 3 main steps to join and use the chat. 

##### About Page
The about page is a static page composed by containers that explain the important information about the chat: introduction, what you can do, online users' list, message text, joining the chat, leaving the chat, how it was developed.

##### Footer
At the end of the home and about page there is a footer, that uses the same method as the navbar: it uses the *footer.html*, *footer.js* files and the *<script>* tag.

## Extras
To scroll just single areas in the chat application is used a personalized scroll bar, which is hide when not needed, but it appear when there is no more space for all the elements. It is used in every page, and specifically in the users list and messages list in chat.html. It has personalized colors and shape, because it has a different border-radius.

To implement the username insertion, it is used the modal. The modal is a bootstrap component, that in this web site is used as input element. Before using the chat it is required to go through it.

To implement the chat joining is used the toast. The toast is a bootstrap component. When a new user joins the chat it shows for a specific time and it can be removed using the x. It is improved with some animations in the entrance and in the exit.

## Challenges I faced
The first challenge was to create a clear elements arrangement. To organize all the chat element in a page without scrolling. To do that I divided the screen in 3 parts: the sidebar with the users list, the chat history and the chat input.

Another challenge was to implement the casual color choosing for the username.

Another challenge was to manage the usernames in the cases the users decided to use spaces or let it start with a number. To solve that I used the id as identifier.

I tried the web site in different devices to verify its portability, and I tried to reduce and increase the page zoom to verify if the pages were still readable in different screen resolutions. The use of bootstrap let the page with a responsive layout and consistency of design.

## References
[Bootstrap](https://getbootstrap.com/)

