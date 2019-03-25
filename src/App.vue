<template>
  <div id="app">
    <TransactionTable
      :transactions = "transArray"
    />
  </div>
</template>

<script>
import TransactionTable from './components/TransactionTable.vue';
import axios from 'axios';

export default {
  name: 'app',
  components: {
    TransactionTable
  },
  data() {
    return {
      transArray :null /*[
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
      },
      {
        key: 3,
        name: 'Desktop Test',
        type: 'Future',
        amount: 1000,
        date: new Date()
      }
      ],*/,
      txs: null  
    }
  },
  mounted () {
    this.transArray = new Array();
    axios
      .get('http://localhost:8081/transactions')
      .then(response => {
        //TODO: we might want to massage this data at some point
        this.transArray = response.data;
      });
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
