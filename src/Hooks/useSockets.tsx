import { useCallback, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAuth } from './useAuth';

export const useSocket = (url: string = 'http://localhost:8000') => {
    const [socket, setSocket] = useState<Socket | null>(null); // Iniciar con null explícitamente
    const [online, setOnline] = useState(false);
    const { token } = useAuth();

    const connect = useCallback(() => {
        if (token) {  // Solo conectar si el token está disponible
            console.log('Conectando socket...', token);

            const socketInstance = io(url, {
                transports: ['websocket'],
                autoConnect: true,
                forceNew: true,
                query: {
                    "disruptiveToken": token, // Pasar el token como query param
                },
            });

            setSocket(socketInstance);
        } else {
            console.warn('No se puede conectar sin un token');
        }
    }, [url, token]);

    const disconnect = useCallback(() => {
        console.log("Estado del socket en disconnect:", socket); // Verificar si el socket está disponible
        if (socket) {
            console.log("Desconectando socket...");
            socket.disconnect();
        } else {
            console.warn("No hay socket activo para desconectar");
        }
    }, [socket]);

    useEffect(() => {
        console.log("Estado del socket actualizado:", socket); // Verificar cuándo cambia el estado del socket
        if (socket) {
            setOnline(socket.connected);
        }
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.on('connect', () => setOnline(true));
            socket.on('disconnect', () => setOnline(false));

            return () => {
                socket.off('connect');
                socket.off('disconnect');
            };
        }
    }, [socket]);

    return {
        socket,
        online,
        connect,
        disconnect,
    };
};
