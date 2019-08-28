<template>
  <div id="app" class="container">
    <div class="page-header">
      <h1>Vue.js 2 & Firebase Boilerplate</h1>
    </div>
    <hr>

    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Add Book</h3>
      </div>
      <div class="card-body">
        <form id="form" class="form-inline" @submit.prevent="addBook">
          <div class="form-group">
            <label for="book-title">Title:</label>
            <input type="text" id="book-title" class="form-control" v-model="newBook.title">
          </div>
          <div class="form-group">
            <label for="author">Author:</label>
            <input type="text" id="author" class="form-control" v-model="newBook.author">
          </div>
          <div class="form-group">
            <label for="url">URL:</label>
            <input type="text" id="url" class="form-control" v-model="newBook.url">
          </div>
          <input type="submit" class="btn btn-primary" value="Add Book">
        </form>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Books List</h3>
      </div>
      <div class="card-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book.id">
              <td>
                <a :href="book.url">{{book.title}}</a>
              </td>
              <td>{{book.author}}</td>
              <td>
                <span class="fas fa-trash" @click="deleteBook(book)"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'

let config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: "",
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
}

let app = Firebase.initializeApp(config)
let db = app.database()

export default {
  name: 'app',
  firebase: {
    books: db.ref('books')
  },
  data() {
    return {
      books: [],
      newBook: {
        title: '',
        author: '',
        url: ''
      }
    }
  },
  methods: {
    addBook() {
      db.ref('books').push(this.newBook)
      this.newBook = {
        title: '',
        author: '',
        url: ''
      }
    },
    deleteBook(book) {
      db.ref('books').child(book['.key']).remove()
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
