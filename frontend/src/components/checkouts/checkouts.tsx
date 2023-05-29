import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Book } from "../books/books";
import CheckoutTable from "./checkoutTable";
import { fetchHandlerWithToken } from "../fetchHandler";
import { useModal } from "../modal/modal";

const BASE_URL = process.env.REACT_APP_HOSTNAME || "http://localhost:8080"

export interface BorrowedBook {
    borrowedBook: Book,
    borrowerFirstName: string,
    borrowerLastName: string,
    checkedOutDate: string,
    dueDate: string,
    id: string
}

interface Response {
    content: BorrowedBook[],
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

export default function Checkouts() {
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

        fetchHandlerWithToken(`${BASE_URL}/api/checkout/getCheckouts?${queryParams.toString()}`, "GET", token)
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
    }, [location.search])

    return (
        <div className="main-page">
            <div className="main-page__container">
                <div className="main-page__buttons">
                    <input
                        type="button"
                        className={"button switch-button" + (response.first ? " switch-button_is-disabled" : "")}
                        onClick={() => {
                            if (!response.first) {
                                const queryParams = new URLSearchParams(location.search)
                                queryParams.set("page", String(response.number - 1))

                                navigate(`/checkouts?${queryParams.toString()}`)
                            }
                        }}
                        value="Previous"
                    />
                    <input
                        type="button"
                        className="button switch-button"
                        onClick={() => {
                            navigate("/books")
                        }
                        }
                        value="To library"
                    />
                    <input
                        type="button"
                        className={"button switch-button" + (response.last ? " switch-button_is-disabled" : "")}
                        onClick={() => {
                            if (!response.last) {
                                const queryParams = new URLSearchParams(location.search)
                                queryParams.set("page", String(response.number + 1))

                                navigate(`/checkouts?${queryParams.toString()}`)
                            }
                        }}
                        value="Next"
                    />
                </div>
            </div>
            {modal}
            <CheckoutTable setActive={setActive} setContent={setContent} checkouts={response.content} />
        </div>
    )
}