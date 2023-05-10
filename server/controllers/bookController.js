const {
    getAllBooks,
    addBook,
    removeBook,
    updateBook
} = require('../repositories/bookRepository')

async function get(req, res) {
    console.log(req)
    let data = await getAllBooks(req.query.keyword)

    return res.json(data)
}

async function add(req, res) {
    let data = await addBook(req.body)

    return res.json({ message: 'Saved' })
}

async function remove(req, res) {
    let data = await removeBook(req.params.id)

    return res.json({ message: 'Deleted' })
}

async function update(req, res) {
    let data = await updateBook(req.body)

    return res.json({ message: 'Updated' })
}

module.exports = {
    get,
    add,
    remove,
    update
}
