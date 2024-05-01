'use client';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import Layout from '@/app/_components/Layout';
import VendorDetails from './_components/VendorDetails';
import Conversation from './_components/Conversation';
import Message from './_components/Message';
import { UserStore } from '@/store/userStore';

const Chat = () => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState<any | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [messageText, setMessageText] = useState<string>('');
    const [arrivalMessage, setArrivalMessage] = useState<any>(null);
    const socket = useRef<Socket | undefined>();
    const scrollRef = useRef<any>();
    const { user } = UserStore();

    useEffect(() => {
        socket.current = io('ws://https://tradetrove-backend.onrender.com');
        socket.current?.on('getMessage', (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        socket.current?.emit('addUser', user?.id!);
        socket.current?.on('getUsers', (users: any) => console.log(users));
    }, []);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(
                    `https://tradetrove-backend.onrender.com/api/v1/conversation/${user?.id!}`
                );
                setConversations(res.data.conversation);
            } catch (error) {
                console.log(error);
            }
        };
        getConversations();
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (currentChat) {
                    const res = await axios.get(
                        `https://tradetrove-backend.onrender.com/api/v1/message/${currentChat._id}`
                    );
                    setMessages(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchMessages();
    }, [currentChat, messages]);
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
    }, [messages]);
    const handleSubmit = async () => {
        if (messageText && currentChat) {
            socket.current?.emit('sendMessage', {
                senderId: user?.id!,
                receiverId: currentChat.members.find(
                    (memberId: string) => memberId !== user?.id
                ),
                text: messageText,
            });
            try {
                const res = await axios.post(
                    'https://tradetrove-backend.onrender.com/api/v1/message/send',
                    {
                        conversationId: currentChat._id,
                        sender: user?.id,
                        text: messageText,
                    }
                );
                setMessages([...messages, res.data]);
                setMessageText('');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Layout>
            <div className="sm:flex sm:flex-row h-[calc(100vh-100px)]">
                <div className="chatMenu">
                    <div className="p-4 h-[100%] bg-white rounded-md">
                        <div className="flex flex-row sm:flex-col">
                            {conversations.map((conversation: any) => (
                                <div
                                    className=""
                                    onClick={() => setCurrentChat(conversation)}
                                    key={conversation._id}
                                >
                                    <Conversation
                                        conversation={conversation}
                                        currentUser={user?.id!}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop h-full overflow-y-scroll pb-40 sm:pb-0">
                                    {messages.map((message: any, index) => (
                                        <div ref={scrollRef} key={index}>
                                            <Message
                                                message={message}
                                                own={
                                                    message.sender === user?.id
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="fixed bottom-0 right-0 left-0 bg-[#F6F8FF] sm:relative sm:bg-transparent p-2">
                                    <div className="flex items-center gap-4">
                                        <textarea
                                            value={messageText}
                                            onChange={(e) =>
                                                setMessageText(e.target.value)
                                            }
                                            placeholder="Type your message..."
                                            className="w-full h-[100px] bg-transparent border p-4 rounded-md"
                                        />
                                        <button
                                            onClick={handleSubmit}
                                            className="w-[20%] bg-blue-500 rounded-md text-white py-2"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="px-4 md:text-3xl lg:text-4xl">
                                    Open a conversation to start a chat
                                </p>
                            </>
                        )}
                    </div>
                </div>
                <div className="chatDetails hidden md:block">
                    <div className="p-4 h-[100%] bg-white rounded-md">
                        <VendorDetails />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Chat;
