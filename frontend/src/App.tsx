import Login from "./components/auth/login";
import Registration from "./components/auth/registration";
import Books from "./components/books/books";
import Checkouts from "./components/checkouts/checkouts";
import './constants.css'
import React from "react";
import { Route, Routes, redirect } from "react-router-dom"

export default function App() {
    const token = localStorage.getItem('token')

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/books" element={<Books />} />
            <Route path="/checkouts" element={<Checkouts />} />
            <Route path="/*" element={
                token ?
                    <Books /> :
                    <Login />
            } />
            {/* <Route path="/ckecout/:checkoutId" element={<Checkout />} /> */}
            {/* <Route path="/book/:bookId" element={<Book />} /> */}

            <Route path="/*" element={<h1>Error 404</h1>} />
        </Routes>
    )
}