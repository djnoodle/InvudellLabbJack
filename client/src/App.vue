<script setup>
import { onMounted, ref, watch, nextTick } from 'vue';
import axios from 'axios';
import ModalEdit from './components/ModalEdit.vue';
import ModalCreate from './components/ModalCreate.vue';
import Chat from './components/Chat.vue';

const books = ref([]);
const authors = ref([]);
const dialogEdit = ref(false);
const dialogCreate = ref(false);
const searchText = ref('');
const renderComponent = ref(true);

const bookId = ref('');
const bookTitle = ref('');
const bookAuthorId = ref('');
const bookGenreId = ref('');
const year = ref('');

const handleDeleteBook = async (id) => {
  await axios.delete(`http://localhost:3000/book/delete/${id}`);
  const response = await axios.get('http://localhost:3000/book/all');
  books.value = response.data;
};

const handleDeleteAuthor = async (id) => {
  await axios.delete(`http://localhost:3000/author/delete/${id}`);
  const response = await axios.get('http://localhost:3000/author/all');
  books.value = response.data;
};

const handleSearch = async () => {
  renderComponent.value = false;
  const response = await axios.get(`http://localhost:3000/book/all?keyword=${searchText.value}`);
  books.value = response.data;
  renderComponent.value = true;
};

function clearBookForm() {
  bookId.value = '';
  bookTitle.value = '';
  bookAuthorId.value = '';
  bookGenreId.value = '';
  year.value = '';
}

function setBookForm(book) {
  bookId.value = book.book_id;
  bookTitle.value = book.title;
  bookAuthorId.value = book.author_id;
  bookGenreId.value = book.genre_id;
  year.value = book.year;
}

function handleOpenEditModal(book) {
  setBookForm(book);
  dialogEdit.value = true;
}

onMounted(async () => {
  const [booksResponse, authorsResponse] = await Promise.all([
    axios.get('http://localhost:3000/book/all'),
    axios.get('http://localhost:3000/author/all'),
  ]);
  books.value = booksResponse.data;
  authors.value = authorsResponse.data;
});

watch(searchText, debounce(handleSearch, 500));

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
</script>

<template>
  <h1>Jacks Bibliotek</h1>
  <v-divider class="divider" color="#fff" />
  <div class="container">
    <div class="books-container">
      <h2>Books</h2>
      <v-btn color="green" size="x-small" @click="dialogCreate = true">Create</v-btn>
      <v-text-field placeholder="Search for a book or an author" v-model="searchText"></v-text-field>
      <v-list class="list">
        <div v-if="renderComponent" v-for="book in books" class="list-container">
          <v-list-item class="list-item" :title="book.title" :subtitle="book.genre_name" />
          <div class="buttons">
            <v-btn color="blue" size="x-small" @click="handleOpenEditModal(book)">Update</v-btn>
            <v-btn color="red" size="x-small" @click="handleDeleteBook(book.book_id)">Delete</v-btn>
          </div>
        </div>
      </v-list>
    </div>
    <div class="authors-container">
      <h2>Authors</h2>
      <v-list class="list">
        <div v-for="author in authors" class="list-container">
          <v-list-item class="list-item" :title="author.name" :subtitle="author.author_id" />
          <div class="buttons">
            <v-btn color="red" size="x-small" @click="handleDeleteAuthor(author.author_id)">Delete</v-btn>
          </div>
        </div>
      </v-list>
    </div>
  </div>

  <Chat />

  <ModalEdit
    v-model="dialogEdit"
    :book-id="bookId"
    :book-title="bookTitle"
    :book-author-id="bookAuthorId"
    :book-genre-id="bookGenreId"
    :year="year"
    @close="dialogEdit = false"
  />
  <ModalCreate v-model="dialogCreate" @close="dialogCreate = false" />
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  gap: 5rem;
  justify-content: center;
  align-items: flex-start;
  height: auto;
}

.divider {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.books-container,
.authors-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: transparent;
}

.list-item {
  text-align: left;
  color: white;
}

.list-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: fit-content;
  overflow-x: hidden;
}

.buttons {
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
}
</style>
