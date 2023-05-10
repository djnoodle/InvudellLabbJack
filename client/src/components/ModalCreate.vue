<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import axios from 'axios';

const props = defineProps({
  showDialog: Boolean,
});

const refShowDialog = ref(false);
const refBookTitle = ref('');
const refBookAuthorId = ref('');
const refBookGenreId = ref('');
const refYear = ref('');

const emit = defineEmits(['close']);

async function handleCreateBook() {
  const book = {
    title: refBookTitle.value,
    author_id: refBookAuthorId.value,
    genre_id: refBookGenreId.value,
    year: refYear.value,
  };

  await axios.post('http://localhost:3000/book/create', book);
  emit('close');
}
</script>

<template>
  <v-dialog v-model="refShowDialog" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">Create book</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
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
        <v-btn color="blue-darken-1" variant="text" @click="handleCreateBook"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
