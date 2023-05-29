import { ReactElement } from "react";
import { Book } from "./books";
import { formatField } from "../../additional-functions/additional-functions";
import React from "react";

interface TableProps {
    book: Book[],
    setContent: (value: ReactElement) => void
    setActive: (value: boolean) => void
}

export default function BookTable({ book, setActive, setContent }: TableProps) {
    return (
        <table className="main-page__book-table">
            <thead>
                <tr>
                    <th><div className="cursor-pointer">Title</div></th>
                    <th><div className="cursor-pointer">Author</div></th>
                    <th><div className="cursor-pointer">Genre</div></th>
                    <th><div className="cursor-pointer">Year</div></th>
                </tr>
            </thead>
            <tbody>
                {book.map((book, i) => (
                    <tr
                        key={i}
                        onClick={() => {
                            setContent(
                                <div className="book-modal">
                                    {Object.entries(book).map(([k, v], i) => {
                                        if (k === "id" || k === "comment" || !v) return null
                                        return (<React.Fragment key={i}>
                                            <div className="book-modal__name">{formatField(k)}</div>
                                            <div className="book-modal__value">{v}</div>
                                        </React.Fragment>)
                                    })}
                                </div>
                            )
                            setActive(true)
                        }}
                    >
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.genre}</td>
                        <td>{book.year}</td>
                    </tr>
                ))}
            </tbody>
        </table >
    )
}