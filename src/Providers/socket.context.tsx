import React, { createContext, useContext, useEffect } from 'react';
import { Socket} from 'socket.io-client';
import { Children } from '../types';
import { useSocket } from '../Hooks';
import { AuthContext } from './auth.context';

interface SocketContextType {
    socket: Socket | null;
    online: boolean;
    disconnect: () => void
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined);



export const SocketProvider: React.FC<Children> = ({ children }) => {

    const authInfo = useContext(AuthContext)

    const { socket, online, connect, disconnect } = useSocket();

    useEffect(() => {
        if (authInfo?.token) {
            connect()
        }

    }, [authInfo])

    useEffect(() => {
        if (!authInfo?.token) {
            disconnect()
        }

    }, [authInfo])

    //   useEffect(() => {
    //     if (user == initialUserState) {
    //       disconnect()
    //     }
    //   }, [user])
    return (
        <SocketContext.Provider value={{ socket, online, disconnect }}>
            {children}
        </SocketContext.Provider>
    );
};
