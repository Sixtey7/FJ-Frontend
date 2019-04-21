<template>
  <div id="app">
    <button v-on:click = "showModal" type = "button" id="add-button" class="btn btn-success">
        Add Tx
    </button> 
    <TransactionTable
      :transactions = "transArray"
    />
    <TxModal
      :show="isModalVisible"
      @close="closeModal"
    />
  </div>
</template>

<script>
import TransactionTable from './components/TransactionTable.vue';
import TransactionHelper from './utils/TransactionHelper.js'; 
import TxModal from './components/TxModal.vue';


import axios from 'axios';

export default {
  name: 'app',
  components: {
    TransactionTable,
    TxModal
  },
  data() {
    return {
      transArray :null,
      txs: null  ,
      isModalVisible: false
    }
  },
  mounted () {
    this.transArray = new Array();
    axios
      .get('http://localhost:8081/transactions')
      .then(response => {
        this.transArray = new TransactionHelper().massageTransactions(response.data);
      });
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
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

#add-button {
  float: right;
}
</style>
