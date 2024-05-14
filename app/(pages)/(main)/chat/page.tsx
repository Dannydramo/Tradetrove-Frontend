'use client';
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Layout from '@/app/_components/Layout';
import VendorDetails from './_components/VendorDetails';
import Conversation from './_components/Conversation';
import Message from './_components/Message';
import { UserStore } from '@/store/userStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Chat = () => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState<any | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [messageText, setMessageText] = useState<string>('');
    const [arrivalMessage, setArrivalMessage] = useState<any>(null);
    const socket = useRef<Socket | undefined>();
    const scrollRef = useRef<any>();
    const { user } = UserStore();
    const router = useRouter();
    useEffect(() => {
        router.refresh();
    }, []);
    useEffect(() => {
        socket.current = io('https://tradetrove-backend.onrender.com');
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
        socket.current?.emit('addUser', user?._id);
        socket.current?.on('getUsers', (users: any) => console.log(users));
    }, [user]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(
                    `https://tradetrove-backend.onrender.com/api/v1/conversation/${user?._id}`
                );
                setConversations(res.data.conversation);
            } catch (error) {
                console.log(error);
            }
        };
        getConversations();
    }, [user]);

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
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async () => {
        if (messageText && currentChat) {
            socket.current?.emit('sendMessage', {
                senderId: user?._id,
                receiverId: currentChat.members.find(
                    (memberId: string) => memberId !== user?._id
                ),
                text: messageText,
            });
            try {
                const res = await axios.post(
                    'https://tradetrove-backend.onrender.com/api/v1/message/send',
                    {
                        conversationId: currentChat._id,
                        sender: user?._id,
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
                        <h1 className="my-4 font-bold ml-4">Messages</h1>
                        <div className="flex flex-row overflow-x-auto sm:flex-col">
                            {conversations.map((conversation: any) => (
                                <div
                                    className=""
                                    onClick={() => setCurrentChat(conversation)}
                                    key={conversation._id}
                                >
                                    <Conversation
                                        conversation={conversation}
                                        currentUser={user?._id}
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
                                                    message.sender === user?._id
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
                                <div className="h-full flex justify-center items-center flex-col space-y-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 119 92"
                                        aria-hidden="true"
                                        data-testid="ipl-illustration-spot"
                                        className="h-[200px] w-[200px]"
                                    >
                                        <defs>
                                            <filter id="i6" x="0%" y="0%">
                                                <feTurbulence
                                                    baseFrequency="2.5"
                                                    numOctaves="4"
                                                    result="noise"
                                                    seed="14"
                                                ></feTurbulence>
                                                <feComponentTransfer
                                                    in="noise"
                                                    result="opacity"
                                                >
                                                    <feFuncA
                                                        slope="0.6"
                                                        type="linear"
                                                    ></feFuncA>
                                                </feComponentTransfer>
                                                <feBlend
                                                    in="opacity"
                                                    in2="SourceGraphic"
                                                    mode="overlay"
                                                    result="blend"
                                                ></feBlend>
                                            </filter>
                                            <filter
                                                id="i5"
                                                width="47.856"
                                                height="52.98"
                                                x="60.644"
                                                y="34.108"
                                                colorInterpolationFilters="sRGB"
                                                filterUnits="userSpaceOnUse"
                                            >
                                                <feFlood
                                                    floodOpacity="0"
                                                    result="BackgroundImageFix"
                                                ></feFlood>
                                                <feBlend
                                                    in="SourceGraphic"
                                                    in2="BackgroundImageFix"
                                                    result="shape"
                                                ></feBlend>
                                                <feColorMatrix
                                                    in="SourceAlpha"
                                                    result="hardAlpha"
                                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                ></feColorMatrix>
                                                <feOffset
                                                    dx="1"
                                                    dy="1"
                                                ></feOffset>
                                                <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
                                                <feComposite
                                                    in2="hardAlpha"
                                                    k2="-1"
                                                    k3="1"
                                                    operator="arithmetic"
                                                ></feComposite>
                                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"></feColorMatrix>
                                                <feBlend
                                                    in2="shape"
                                                    result="effect1_innerShadow_4373_3505"
                                                ></feBlend>
                                            </filter>
                                            <filter
                                                id="i4"
                                                width="63.352"
                                                height="70.169"
                                                x="12.477"
                                                y="0.986"
                                                colorInterpolationFilters="sRGB"
                                                filterUnits="userSpaceOnUse"
                                            >
                                                <feFlood
                                                    floodOpacity="0"
                                                    result="BackgroundImageFix"
                                                ></feFlood>
                                                <feBlend
                                                    in="SourceGraphic"
                                                    in2="BackgroundImageFix"
                                                    result="shape"
                                                ></feBlend>
                                                <feColorMatrix
                                                    in="SourceAlpha"
                                                    result="hardAlpha"
                                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                ></feColorMatrix>
                                                <feOffset
                                                    dx="1"
                                                    dy="1"
                                                ></feOffset>
                                                <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
                                                <feComposite
                                                    in2="hardAlpha"
                                                    k2="-1"
                                                    k3="1"
                                                    operator="arithmetic"
                                                ></feComposite>
                                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"></feColorMatrix>
                                                <feBlend
                                                    in2="shape"
                                                    result="effect1_innerShadow_4373_3505"
                                                ></feBlend>
                                            </filter>
                                            <linearGradient
                                                id="i3"
                                                x1="93.067"
                                                x2="85.442"
                                                y1="33.678"
                                                y2="86.377"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop stopColor="#E867A8"></stop>
                                                <stop
                                                    offset="1"
                                                    stopColor="#9D2B6B"
                                                ></stop>
                                            </linearGradient>
                                            <linearGradient
                                                id="i2"
                                                x1="31.237"
                                                x2="41.472"
                                                y1="0.524"
                                                y2="70.645"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop stopColor="#237EA3"></stop>
                                                <stop
                                                    offset="1"
                                                    stopColor="#1D465C"
                                                ></stop>
                                            </linearGradient>
                                            <clipPath id="i1">
                                                <path
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="#fff"
                                                    d="M74.763 29.962c-.802-12.218-8.851-23.313-21.19-27.398-16.246-5.377-33.776 3.433-39.154 19.678a30.84 30.84 0 00-.743 16.866l-2.23.334L.6 91.179h117.75l-9.148-66.374-34.44 5.157z"
                                                ></path>
                                            </clipPath>
                                            <pattern
                                                id="i0"
                                                width="50"
                                                height="40"
                                                x="0"
                                                y="0"
                                                patternTransform="scale(.3)"
                                                patternUnits="userSpaceOnUse"
                                            >
                                                <path
                                                    d="M0 0h50v40H0z"
                                                    filter="url(#i6)"
                                                ></path>
                                            </pattern>
                                        </defs>
                                        <g clipPath="url(#i1)">
                                            <path
                                                fill="#F5CB9D"
                                                d="M11.446 39.442l97.756-14.637 9.148 66.374H.6l10.846-51.737z"
                                            ></path>
                                            <g filter="url(#i5)">
                                                <path
                                                    fill="url(#i3)"
                                                    d="M95.7 77.499a23.381 23.381 0 01-4.447 2.006c-12.209 4.04-25.382-2.58-29.423-14.788-4.042-12.209 2.579-25.382 14.788-29.423 12.208-4.042 25.381 2.58 29.423 14.788 3.023 9.133.08 18.805-6.706 24.791 1.898 4.582 5.688 9.61 8.165 11.215 0 0-6.693-2.214-11.8-8.589z"
                                                ></path>
                                            </g>
                                            <g filter="url(#i4)">
                                                <path
                                                    fill="url(#i2)"
                                                    d="M28.179 58.726a31.118 31.118 0 005.918 2.669c16.246 5.377 33.776-3.433 39.153-19.678C78.628 25.47 69.818 7.942 53.572 2.564 37.327-2.813 19.797 5.997 14.42 22.242c-4.023 12.153-.106 25.024 8.923 32.99-2.526 6.097-7.57 12.788-10.865 14.923 0 0 8.907-2.946 15.702-11.43z"
                                                ></path>
                                            </g>
                                            <path
                                                fill="#fff"
                                                d="M77.563 57.264c-.165 1.422-1.43 2.443-2.825 2.282-1.396-.162-2.394-1.445-2.23-2.867.165-1.422 1.43-2.443 2.826-2.281 1.395.161 2.393 1.445 2.229 2.866zm9.197.022a2.591 2.591 0 11-5.147-.596 2.591 2.591 0 015.148.596zm9.448.335c-.165 1.422-1.43 2.443-2.825 2.282-1.396-.162-2.394-1.445-2.23-2.867.165-1.422 1.43-2.443 2.826-2.281 1.395.161 2.394 1.445 2.229 2.866zM52.315 31.802c.219 1.891 1.902 3.25 3.76 3.035 1.856-.215 3.184-1.923 2.965-3.814-.219-1.892-1.902-3.251-3.76-3.036-1.856.215-3.184 1.923-2.965 3.815zm-12.24.028a3.448 3.448 0 106.85-.793 3.448 3.448 0 00-6.85.794zm-8.811 3.483c-1.858.215-3.54-1.144-3.76-3.036-.219-1.892 1.11-3.6 2.966-3.814 1.858-.216 3.54 1.144 3.76 3.035.219 1.892-1.11 3.6-2.966 3.815z"
                                            ></path>
                                        </g>
                                        <rect
                                            clipPath="url(#i1)"
                                            width="100%"
                                            height="100%"
                                            fill="url(#i0)"
                                        ></rect>
                                    </svg>
                                    <p className="px-4 md:text-3xl lg:text-4xl">
                                        Open a conversation to start a chat
                                    </p>
                                </div>
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
