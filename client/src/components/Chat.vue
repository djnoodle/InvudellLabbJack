<script setup>
import { ref, reactive } from 'vue';
import { io } from 'socket.io-client';

const state = reactive({
  connected: false,
  messages: [],
  message: '',
});
// const messages = ref([]);
// const message = ref('');

const socket = io('http://localhost:3001');

socket.on('connect', () => {
  state.connected = true;
  console.log('connected');
});

socket.on('disconnect', () => {
  state.connected = false;
  console.log('disconnected');
});

socket.on('chat message', (msg) => {
  console.log(msg);
  state.messages.push(msg);
});

socket.on('server message', (msg) => {
  state.messages.push({ id: new Date().getTime(), text: msg });
});

function sendMessage() {
  if (state.message.trim() !== '') {
    socket.emit('chat message', { id: new Date().getTime(), text: state.message });
    state.message = '';
  }
}
</script>

<template>
  <div class="chat">
    <div class="chat-container">
      <div class="chat-window">
        <div class="message" v-for="msg in state.messages" :key="msg.id">
          {{ msg.text }}
        </div>
      </div>
      <div class="chat-input">
        <v-text-field v-model="state.message" @keyup.enter="sendMessage" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.class {
  width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 20rem;
}

.chat-window {
  flex-grow: 1;
  border: 1px solid #ddd;
  padding: 10px;
  overflow-y: scroll;
  margin-bottom: 10px;
}

.message {
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}

.chat-input {
  flex-shrink: 0;
}
</style>
