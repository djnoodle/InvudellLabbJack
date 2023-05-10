const pgp = require('pg-promise')()
const db = pgp('postgres://postgres:hello123@localhost:5432/Bibliotek')

async function selectAllBooks(keyword) {
    if (keyword) {
        let data = await db.many(`SELECT
    books.title,
    books.author_id,
    books.genre_id,
    books.year,
    books.book_id,
    authors.name AS author_name,
    genres.name AS genre_name
  FROM
    books
  INNER JOIN
    authors ON books.author_id = authors.author_id
  INNER JOIN
    genres ON books.genre_id = genres.genre_id
  WHERE
    books.title ILIKE '%${keyword}%'
  OR
    authors.name ILIKE '%${keyword}%'`)
        return data
    } else {
        let data = await db.many(`SELECT
      books.title,
      books.author_id,
      books.genre_id,
      books.year,
      books.book_id,
      authors.name AS author_name,
      genres.name AS genre_name
    FROM
      books
    INNER JOIN
      authors ON books.author_id = authors.author_id
    INNER JOIN
      genres ON books.genre_id = genres.genre_id;
    `)
        return data
    }
}

async function selectAllAuthors() {
    let data = await db.many(`SELECT * FROM authors`)
    return data
}

async function insertBook(book) {
    let result = await db.none(
        `INSERT INTO books (title, author_id, genre_id, year) VALUES('${book.title}', ${book.author_id}, ${book.genre_id}, ${book.year})`
    )

    return result
}

async function deleteBook(book_id) {
    let result = await db.none(`DELETE FROM books WHERE book_id = ${book_id}`)

    return result
}

async function updateBook(book) {
    let result = await db.query(`UPDATE books
SET title = '${book.title}', author_id = ${book.author_id}, genre_id = ${book.genre_id}, year = ${book.year}
WHERE book_id = ${book.book_id}
`)
    console.log({ result })

    return result
}

module.exports = {
    selectAllBooks,
    selectAllAuthors,
    insertBook,
    deleteBook,
    updateBook
}
