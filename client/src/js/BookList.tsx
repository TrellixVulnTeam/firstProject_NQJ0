import axios from "axios";
import React, { useEffect, useState } from "react"
import ReactDOM from 'react-dom';
import "../scss/BookList.scss";


interface IBook {
    ID: String;
    title: String;
    author: String;
}

interface IBookPage{
    books;
    page;
}

const BooksCountPerLoad = 100;
const BooksCountPerPage = BooksCountPerLoad / 10;

const BookDiv = () => {
    const [page, setPage] = useState(1);
    //한번에 로드하는 페이지
    const [load, setLoad] = useState(0);
    const [books, setBooks] = useState(null);
    useEffect(() => {
        axios.get(`/books?offset=${BooksCountPerLoad * (load)}&limit=${BooksCountPerLoad}`).then(res => {
            setBooks(res.data);
        })
    }, [load])

    return <>
    <div className="bookpage">{
        load != 0 ? <button onClick={e => setLoad(load - 1)}>{"<"}</button> : null
    }
    {
        books ? (new Array(Math.ceil(Object.keys(books).length / 10)).fill(0)).map((v, i) => <button onClick={e => setPage(i + 1)}>{(load * 10 + 1) + i}</button>) : null
    }{
        (books && Object.keys(books).length / 10 === 10) ? <button onClick={e => setLoad(load + 1)}>{">"}</button> : null
    }</div>
    <BookList books={books} page={page}/>
    </>
}

const BookList = ({books, page}: IBookPage) => {
    return <div className="booklist">{
        books ? books.slice(BooksCountPerPage * (page - 1), BooksCountPerPage * page - 1)
            .map((book: IBook) => <Book {...book}/>) : null
    }</div>
}

const Book = (book: IBook) => {
    const onClickBook = () => {
        location.href = `/books/pages/info/${book.ID}`
    }
    return <>
        <div className="book" onClick={onClickBook}>
            <p>{book.title}</p>
            <p>{book.author}</p>
        </div>
    </>
}

ReactDOM.render(<BookDiv/>, document.querySelector("#booklist"));