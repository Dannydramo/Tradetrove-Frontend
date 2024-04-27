import React from 'react';

const Message = ({ message, own }: { message: any; own: boolean }) => {
    return (
        <div
            className={`flex text-sm flex-col ${
                own ? 'items-end' : 'items-start'
            }`}
        >
            <div>
                <p
                    className={`my-4 p-4 max-w-64 rounded-md ${
                        own ? 'bg-[#4F80E1] text-white' : 'bg-white'
                    }`}
                >
                    {message.text}
                </p>
            </div>
        </div>
    );
};

export default Message;
