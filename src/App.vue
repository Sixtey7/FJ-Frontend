<template>
  <div id="app">
    <button v-on:click = "showModal" type = "button" id="add-button" class="btn btn-success">
        Add Tx
    </button> 
    <TransactionTable
      :transactions = "transArray"
      @edit="editTx"
    />
    <TxModal
      :show="isModalVisible"
      :txToEdit="txToShow"
      @close="closeModal"
      @save="saveTx"
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
      isModalVisible: false,
      txToShow: null
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
      this.txToShow = null;
    },
    saveTx(transToSave) {
      this.isModalVisible = false;
      this.txToShow = null;

      //determine if this a new tx or an edit
      if (transToSave.transId) {
        // eslint-disable-next-line
        console.log('Saving an edited transaction: ' + JSON.stringify(transToSave));
        this._postTransaction(transToSave);
      }
      else {
        // eslint-disable-next-line
        console.log('Adding a new transaction: ' + JSON.stringify(transToSave));
        this._putTransaction(transToSave);
      }
    },
    editTx(idToEdit) {
      // eslint-disable-next-line
      console.log('App is editing a transction: ---' + idToEdit + '---');
      this.txToShow = this.transArray.find(transaction => transaction.transId === idToEdit);
      // eslint-disable-next-line
      console.log('filtered to the transaction: ' + this.txToShow.transId);
      this.isModalVisible = true;
    },
    _putTransaction(transToPut) {
      transToPut.accountId = "c7f6892b-5767-422f-b33d-0dd9d01f4446";
      delete transToPut.transId;
      transToPut.transId = "c7f6892b-5767-422f-b33d-0dd9d01f4446";
      let transJSON = JSON.stringify(transToPut);
      axios({
        method: 'put',
        url: 'http://localhost:8081/transactions',
        headers: {
          'Content-type': 'application/json',
        },
        data: 
          transJSON
        
      })
      .then(response => {
          // eslint-disable-next-line
          console.log('got the response: ' + JSON.stringify(response));
        })
      .catch(error => {
        // eslint-disable-next-line
        console.log('got the error: ' + error);
      });
    },
    _postTransaction(transToPost) {
      // eslint-disable-next-line
      let transJSON = JSON.stringify(transToPost);
      axios({
        method: 'post',
        url: 'http://localhost:8081/transactions/' + transToPost.transId,
        headers: {
          'Content-type' : 'application/json'
        },
        data: 
          transJSON
      })
      .then(response => {
        // eslint-disable-next-line
        console.log('got the response: ' + JSON.stringify(response));
      })
      .catch(error => {
        // eslint-disable-next-line
        console.log('Got the error: ' + error);
      });
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
