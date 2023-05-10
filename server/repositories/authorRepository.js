const db_context = require('../db_context')

async function getAllAuthors() {
    return await db_context.selectAllAuthors()
}

async function addAuthor(author_id) {
    let result = await db_context.insertAuthor(author_id)

    return result
}

async function removeAuthor(author_id) {
    let result = await db_context.deleteBook(author_id)

    return result
}

module.exports = {
    getAllAuthors,
    addAuthor,
    removeAuthor
}
