import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { io } from "socket.io-client";
import Chat from "./../pages/Chat";

export const ChatContext = createContext();

export let ChatContextProvider = ({ children, user }) => {
  let [userChats, setUserChats] = useState(null);
  let [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  let [userChatsError, setUserChatsError] = useState(null);
  let [potentialChats, setPotentialChats] = useState([]);
  let [currentChat, setCurrentChat] = useState(null);
  let [messages, setMessages] = useState(null);
  let [isMessagesLoading, setIsMessagesLoading] = useState(false);
  let [messagesError, setMessagesError] = useState(null);
  let [sendTextMessageError, setSendTextMessageError] = useState(null);
  let [newMessage, setNewMessage] = useState(null);
  let [socket, setSocket] = useState(null);
  let [onLineUsers, setOnLineUsers] = useState([]);

  console.log("onLineUsers", onLineUsers);

  //* initial socket
  useEffect(() => {
    let newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);
  //* add online Users
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnLineUsers", (res) => {
      setOnLineUsers(res);
    });

    return () => {
      socket.off("getOnLineUsers");
    };
  }, [socket]);

  //* send message to server
  useEffect(() => {
    if (socket === null) return;

    let recipientId = currentChat?.members.find((id) => id !== user?._id);

    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  //* receive message
  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;

      setMessages((prev) => [...prev, res]);
    });

    return () => {
      socket.off("getMessage");
    };
  }, [socket, currentChat]);
  //* ///////////////////////////////

  useEffect(() => {
    let getUsers = async () => {
      let response = await getRequest(`${baseUrl}/users`);

      if (response.error) {
        return console.log("Error Fetching users", response);
      }

      let pChats = response.filter((u) => {
        let isChatCreated = false;

        if (user?._id === u?._id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u?._id || chat.members[1] === u?._id;
          });
        }

        return !isChatCreated;
      });

      setPotentialChats(pChats);
    };

    getUsers();
  }, [userChats]);

  useEffect(() => {
    let getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);
        let response = await getRequest(`${baseUrl}/chats/${user?._id}`);

        setIsUserChatsLoading(false);

        if (response.error) {
          return setUserChatsError(response);
        }
        setUserChats(response);
      }
    };
    getUserChats();
  }, [user]);

  useEffect(() => {
    let getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);
      let response = await getRequest(
        `${baseUrl}/messages/${currentChat?._id}`
      );

      setIsMessagesLoading(false);

      if (response.error) {
        return setMessagesError(response);
      }
      setMessages(response);
    };
    getMessages();
  }, [currentChat]);

  let sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("You must Type Something...");

      let response = await postRequest(
        `${baseUrl}/messages`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender?._id,
          text: textMessage,
        })
      );

      if (response.error) {
        return setSendTextMessageError(response);
      }

      setNewMessage(response);
      setMessages((prev) => [...prev, response]);
      setTextMessage("");
    },
    []
  );

  let updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  let createChat = useCallback(async (firstId, seconedId) => {
    let response = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({
        firstId,
        seconedId,
      })
    );

    if (response.error) {
      return console.log("Error creating chat", response);
    }

    setUserChats((prev) => [...prev, response]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        sendTextMessage,
        currentChat,
        onLineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
