import React, { useEffect, useState } from "react"
import Filter from "./filter"
import BookTable from "./bookTable"
import { useLocation, useNavigate } from "react-router"
import "./books.css"
import { fetchHandlerWithToken } from "../fetchHandler"
import { useModal } from "../modal/modal"

const BASE_URL = process.env.REACT_APP_HOSTNAME || "http://localhost:8080"

export interface Book {
    added: string,
    author: string,
    checkOutCount: number,
    dueDate: string,
    genre: string,
    id: string,
    status: string,
    title: string,
    year: number,
}

interface Response {
    content: Book[],
    first: boolean,
    last: boolean,
    number: number
}

const defaultResponse: Response = {
    content: [],
    first: true,
    last: true,
    number: 0
}

export default function Books() {
    const [response, setResponse] = useState<Response>(defaultResponse)
    const [modal, setContent, setActive] = useModal()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
            return
        }

        const queryParams = new URLSearchParams(location.search)

        fetchHandlerWithToken(`${BASE_URL}/api/book/getBooks?${queryParams.toString()}`, "GET", token)
            .then((r) => {
                if (r.status === 403) {
                    navigate("/login")
                    return
                }
                if (r.status === 200) {
                    return r.json()
                }
                throw `Unexpected status ${r.status}`
            }).then((r) => {
                setResponse(r)
            }).catch((err) => alert(err))
    }, [location.search, navigate])

    return (
        <div className="main-page">
            <div className="main-page__container">
                <form
                    className="main-page__search"
                    onSubmit={(e) => {
                        e.preventDefault()

                        const title = new FormData(e.currentTarget).get("title")

                        const queryParams = new URLSearchParams(location.search)
                        if (title !== null && title !== "") {
                            queryParams.set("title", title.toString())
                        } else {
                            queryParams.delete("title")
                        }

                        queryParams.delete("page")

                        navigate(`/books?${queryParams.toString()}`)
                    }}>
                    <input
                        type="text"
                        className="search-input"
                        name="title"
                        placeholder="Search..."
                    />
                    <button type="submit" className="button switch-button">Search</button>
                </form>
                <div className="main-page__buttons">
                    <input
                        type="button"
                        className={"button switch-button" + (response.first ? " switch-button_is-disabled" : "")}
                        onClick={() => {
                            if (!response.first) {
                                const queryParams = new URLSearchParams(location.search)
                                queryParams.set("page", String(response.number - 1))

                                navigate(`/books?${queryParams.toString()}`)
                            }
                        }}
                        value="Previous"
                    />
                    <input
                        type="button"
                        className="button switch-button"
                        onClick={() => {
                            navigate("/checkouts")
                        }}
                        value={"To checkouts"}
                    />
                    <input
                        type="button"
                        className={"button switch-button" + (response.last ? " switch-button_is-disabled" : "")}
                        onClick={() => {
                            if (!response.last) {
                                const queryParams = new URLSearchParams(location.search)
                                queryParams.set("page", String(response.number + 1))

                                navigate(`/books?${queryParams.toString()}`)
                            }
                        }}
                        value="Next"
                    />
                </div>
                <Filter navigate={navigate} />
            </div>
            {modal}
            <BookTable setActive={setActive} setContent={setContent} book={response.content} />
        </div>
    )
}