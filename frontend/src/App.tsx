import { useState } from "react";
import Login from "./components/login-registration/login";
import Registration from "./components/login-registration/registration";
import Main from "./components/main/main";
import './constants.css'
import React from "react";

const defaultStatus = { isLogged: false, role: '', token: '' }

export interface Status {
    isLogged: boolean,
    role: string,
    token: string
}

export const StatusContext = React.createContext<Status>(defaultStatus);

export default function App() {
    const [status, setStatus] = useState<Status>(defaultStatus);

    const [isLoginPage, setPage] = useState(true);
    const changePage = () => { setPage(!isLoginPage) }

    return (
        <StatusContext.Provider value={status}>
            {status.isLogged ?
                <Main {...{ status }} /> : isLoginPage ?
                    <Login {...{ setStatus, changePage }} /> : <Registration {...{ setStatus, changePage }} />}
        </StatusContext.Provider>
    )
}