import { Book, BorrowedBook, PageParams, api } from "./main"

interface TableProps {
    endpoint: string,
    currentBooks: Book[],
    currentCheckouts: BorrowedBook[],
    setPageParams: React.Dispatch<React.SetStateAction<PageParams>>
}

export default function Table({ endpoint, currentBooks, currentCheckouts }: TableProps) {
    return (
        endpoint.includes(api.getBooks) ?
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
                    {currentBooks.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.genre}</td>
                            <td>{book.year}</td>
                        </tr>
                    ))}
                </tbody>
            </table >
            :
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
                    {currentCheckouts.map(check => (
                        <tr key={check.id}>
                            <td>{check.borrowedBook.title}</td>
                            <td>{`${check.borrowerFirstName} ${check.borrowerLastName}`}</td>
                            <td>{check.checkedOutDate}</td>
                            <td>{check.dueDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    )
}