const db_context = require('../db_context')

async function getAllBooks(keyword) {
    return await db_context.selectAllBooks(keyword)
}

async function addBook(book) {
    let result = await db_context.insertBook(book)

    return result
}

async function removeBook(book_id) {
    let result = await db_context.deleteBook(book_id)

    return result
}

async function updateBook(book) {
    let result = await db_context.updateBook(book)

    return result
}

module.exports = {
    getAllBooks,
    addBook,
    removeBook,
    updateBook
}
