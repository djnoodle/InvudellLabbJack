const {
    getAllAuthors,
    addAuthor,
    removeAuthor
} = require('../repositories/authorRepository')

async function get(req, res) {
    let data = await getAllAuthors()
    console.log({ data })

    return res.json(data)
}

async function add(req, res) {
    let data = await addAuthor(req.body.postedData, 90)

    return res.json({ message: 'Saved' })
}

async function remove(req, res) {
    let data = await removeAuthor(req.params.id)

    return res.json({ message: 'Deleted' })
}

module.exports = {
    get,
    add,
    remove
}
