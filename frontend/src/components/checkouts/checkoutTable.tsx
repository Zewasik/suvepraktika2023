import { ReactElement } from "react"
import { BorrowedBook } from "./checkouts"
import React from "react"
import { formatField } from "../../additional-functions/additional-functions"

interface TableProps {
    checkouts: BorrowedBook[],
    setContent: (value: ReactElement) => void
    setActive: (value: boolean) => void
}

export default function CheckoutTable({ checkouts, setActive, setContent }: TableProps) {
    return (
        <table className="main-page__book-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Borrower</th>
                    <th>Checked Out Date</th>
                    <th>Due Date</th>
                </tr>
            </thead>
            <tbody>
                {checkouts.map((checkout, i) => (
                    <tr
                        key={i}
                        onClick={() => {
                            setContent(
                                <div className="book-modal">
                                    {Object.entries(checkout).map(([k, v], i) => {
                                        if (!v || k == "id" || typeof v !== "string") return null
                                        return (
                                            <React.Fragment key={i}>
                                                <div className="book-modal__name">{formatField(k)}</div>
                                                <div className="book-modal__value">{v}</div>
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                            )
                            setActive(true)
                        }}
                    >
                        <td>{checkout.borrowedBook.title}</td>
                        <td>{`${checkout.borrowerFirstName} ${checkout.borrowerLastName}`}</td>
                        <td>{checkout.checkedOutDate}</td>
                        <td>{checkout.dueDate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
