<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!--HelloWorld msg="Welcome to Your Vue.js App"/-->
    <TransactionEntry
      v-for = "trans in transArray"
      :key = "trans.id"
      :amount = "trans.amount"
      :type = "trans.type"
      :name = "trans.name"
      :date = "trans.date"
    />

    <TransactionTable
      :transactions = "transArray"
    />
  </div>
</template>

<script>
import TransactionEntry from './components/TransactionEntry.vue';
import TransactionTable from './components/TransactionTable.vue';

export default {
  name: 'app',
  components: {
    TransactionEntry,
    TransactionTable
  },
  data() {
    return {
      transArray : [
      { 
        key: 1,
        name: 'Hello',
        type: 'Planned',
        amount: 1234,
        date: new Date(),
        notes: 'I\'m a note'
      },
      {
        key: 2,
        name: 'Goodbye',
        type: 'Future',
        amount: 2345,
        date: new Date()
      }
      ]  
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
