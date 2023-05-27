import { Book } from "./books";

interface TableProps {
    currentBooks: Book[],
}

export default function BookTable({ currentBooks }: TableProps) {
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
    )
}