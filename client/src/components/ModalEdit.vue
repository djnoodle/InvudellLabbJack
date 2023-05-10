<script setup lang="ts">
import { ref, defineEmits, watchEffect } from 'vue';
import axios from 'axios';

const props = defineProps({
  showDialog: Boolean,
  bookId: String,
  bookTitle: String,
  bookAuthorId: String,
  bookGenreId: String,
  year: Number,
});

const refShowDialog = ref(props.showDialog);
const refBookId = ref(props.bookId);
const refBookTitle = ref(props.bookTitle);
const refBookAuthorId = ref(props.bookAuthorId);
const refBookGenreId = ref(props.bookGenreId);
const refYear = ref(props.year);

watchEffect(() => {
  refShowDialog.value = props.showDialog;
  refBookId.value = props.bookId;
  refBookTitle.value = props.bookTitle;
  refBookAuthorId.value = props.bookAuthorId;
  refBookGenreId.value = props.bookGenreId;
  refYear.value = props.year;
});

const emit = defineEmits(['close']);

async function handleUpdateBook() {
  const book = {
    book_id: refBookId.value,
    title: refBookTitle.value,
    author_id: refBookAuthorId.value,
    genre_id: refBookGenreId.value,
    year: refYear.value,
  };

  await axios.put(`http://localhost:3000/book/update/${book.book_id}`, book);
  emit('close');
}
</script>

<template>
  <v-dialog v-model="refShowDialog" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit book</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Book ID*" v-model="refBookId" required disabled></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Title*" hint="Book title" v-model="refBookTitle" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Author ID*"
                hint="ID of book Author"
                required
                v-model="refBookAuthorId"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Genre ID*" required v-model="refBookGenreId"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Year*" type="number" required v-model="refYear"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="emit('close')"> Close </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="handleUpdateBook"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
