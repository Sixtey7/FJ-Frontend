<template>
  <div id="app">
    <Button type = "button" id="add-button" class="btn btn-success">
        Add Tx
    </Button>
    <TransactionTable
      :transactions = "transArray"
    />
  </div>
</template>

<script>
import TransactionTable from './components/TransactionTable.vue';
import TransactionHelper from './utils/TransactionHelper.js'; 


import axios from 'axios';

export default {
  name: 'app',
  components: {
    TransactionTable
  },
  data() {
    return {
      transArray :null,
      txs: null  
    }
  },
  mounted () {
    this.transArray = new Array();
    axios
      .get('http://localhost:8081/transactions')
      .then(response => {
        this.transArray = new TransactionHelper().massageTransactions(response.data);
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

#add-button {
  float: right;
}
</style>
