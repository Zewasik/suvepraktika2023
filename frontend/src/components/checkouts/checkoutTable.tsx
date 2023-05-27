import { BorrowedBook } from "./checkouts"

interface TableProps {
    checkouts: BorrowedBook[],
}

export default function CheckoutTable({ checkouts }: TableProps) {
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
                {checkouts.map(checkout => (
                    <tr key={checkout.id}>
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
