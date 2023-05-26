import { useContext, useEffect, useState } from "react"
import { Status, StatusContext } from '../../App'
import { fetchHandlerWithToken } from "../fetchHandler"
import './main.css'
import Table from "./table"
import Filter from "./filter"

const BASE_URL = process.env.REACT_APP_HOSTNAME

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

export interface BorrowedBook {
    borrowedBook: Book,
    borrowerFirstName: string,
    borrowerLastName: string,
    checkedOutDate: string,
    dueDate: string,
    id: string
}

interface MainProp {
    status: Status
}

export interface PageParams {
    title: string | null
    author: string | null
    genre: string | null
    year: number | null
    filter: string | null
    page: number
}

const defaultPageParams: PageParams = {
    title: null,
    author: null,
    genre: null,
    year: null,
    filter: null,
    page: 0,
}

interface Pageable {
    first: boolean,
    last: boolean,
    number: number,
    numberOfElements: number,
    size: number,
    totalElements: number,
    totalPages: number
}

const defaultPageable: Pageable = {
    first: false,
    last: false,
    number: 0,
    numberOfElements: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0
}

export const api = {
    getBooks: 'book/getBooks',
    getBook: 'book/getBook',
    getCheckouts: 'checkout/getCheckouts',
    getCheckout: 'checkout/getCheckout'
}

function getSearchParams(params: PageParams): string {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
        if (value !== null) {
            searchParams.append(key, value.toString());
        }
    }

    return '?' + searchParams.toString();
}

export default function Main({ status }: MainProp) {
    const { token } = useContext(StatusContext)
    const [currentBooks, setBooks] = useState<Book[]>([])
    const [currentCheckouts, setCheckouts] = useState<BorrowedBook[]>([])
    const [pageable, setPageable] = useState<Pageable>(defaultPageable)
    const [endpoint, setEndpoint] = useState(api.getBooks)
    const changeEndpoint = () => {
        if (endpoint.includes(api.getBooks)) {
            setEndpoint(api.getCheckouts)
        } else {
            setEndpoint(api.getBooks)
        }
    }

    const [pageParams, setPageParams] = useState<PageParams>(defaultPageParams)

    useEffect(() => {
        fetchHandlerWithToken(`${BASE_URL}/api/${endpoint + getSearchParams(pageParams)}`, 'GET', token)
            .then(r => r.json())
            .then((r) => {
                if (endpoint.includes(api.getBooks)) {
                    setBooks(r.content)
                    const { first, last, number, numberOfElements, size, totalElements, totalPages } = r;
                    setPageable({ first, last, number, numberOfElements, size, totalElements, totalPages })
                }
                if (endpoint.includes(api.getCheckouts)) {
                    setCheckouts(r.content)
                    const { first, last, number, numberOfElements, size, totalElements, totalPages } = r;
                    setPageable({ first, last, number, numberOfElements, size, totalElements, totalPages })
                }
            })
    }, [endpoint, token, pageParams])

    const [searchText, setSearchText] = useState('')
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    return (
        <div className="main-page">
            <div className="main-page__container">
                {endpoint.includes(api.getBooks) ?
                    <form
                        className="main-page__search"
                        onSubmit={(e) => {
                            e.preventDefault()
                            setPageParams(
                                (prevVal) => {
                                    const temp = Object.assign({}, prevVal)
                                    temp.title = null
                                    if (searchText) temp.title = searchText
                                    return temp
                                }
                            )
                        }}>
                        <input
                            type="text"
                            className="search-input"
                            value={searchText}
                            onChange={handleInputChange}
                            placeholder="Search..."
                        />
                        <button type="submit" className="button switch-button">Search</button>
                    </form>
                    : null}
                <div className="main-page__buttons">
                    <input
                        type="button"
                        className="button switch-button"
                        onClick={() => {
                            if (!pageable.first) {
                                setPageParams(
                                    (prevVal) => {
                                        const temp = Object.assign({}, prevVal)
                                        temp.page = prevVal.page - 1
                                        return temp
                                    })
                            }
                        }}
                        value="Previous"
                    />
                    <input
                        type="button"
                        className="button switch-button"
                        onClick={() => {
                            setPageParams(defaultPageParams)
                            changeEndpoint()
                        }
                        }
                        value={endpoint.includes(api.getBooks) ? "To checkouts" : "To library"}
                    />
                    <input
                        type="button"
                        className="button switch-button"
                        onClick={() => {
                            if (!pageable.last) {
                                setPageParams(
                                    (prevVal) => {
                                        const temp = Object.assign({}, prevVal)
                                        temp.page = prevVal.page + 1
                                        return temp
                                    })
                            }
                        }}
                        value="Next"
                    />
                </div>
                {endpoint.includes(api.getBooks) ?
                    <Filter {...{ setPageParams }} />
                    : null}
            </div>
            <Table {...{ endpoint, currentBooks, currentCheckouts, setPageParams }} />
        </div>
    )
}
