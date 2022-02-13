import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';

let socket;

const Chat = ({ location }) => {
    const ENDPOINT = 'localhost:5000';

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    useEffect(() => { 
        const { name, room } = queryString.parse(location.search);
        console.log(name, room);
        setName(name);
        setRoom(room);

        socket = io(ENDPOINT);
        socket.emit('join', { name, room }, () => {
            
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        };
    }, [ENDPOINT, location]);

    return (
        <h1>Chat</h1>
    );
};

export default Chat;