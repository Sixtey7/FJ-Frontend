<template>
  <div id="transaction-view">
    <button v-on:click = "showModal" type = "button" id="add-button" class="btn btn-success">
        Add Tx
    </button> 
    <TransactionTable
      :transactions = "transArray"
      :accounts = "accountsArray"
      @edit="editTx"
    />
    <TxModal
      :show="isModalVisible"
      :txToEdit="txToShow"
      :accounts = "accountsArray"
      @close="closeModal"
      @save="saveTx"
    />
  </div>
</template>

<script>
import TransactionTable from './TransactionTable.vue';
import TransactionHelper from '../../utils/TransactionHelper.js'; 
import TxModal from './TxModal.vue';


import axios from 'axios';

export default {
  name: 'TransactionView',
  components: {
    TransactionTable,
    TxModal
  },
  data() {
    return {
      transArray :null,
      accountsArray: null,
      txs: null  ,
      isModalVisible: false,
      txToShow: null
    }
  },
  mounted() {
    this.transArray = new Array();
    this.accountsArray = new Array();
    
    //get the data
    let txPromise = axios.get('http://localhost:8081/transactions');
    let accountPromise = axios.get('http://localhost:8081/accounts');

      Promise.all([txPromise, accountPromise])
        .then(responses => {
          this.transArray = new TransactionHelper().massageTransactions(responses[0].data);
          this.accountsArray = responses[1].data;
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
      //need to delete the empty transId to prevent the UI from trying to handle it
      delete transToPut.transId;
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
#add-button {
  float: right;
}
</style>
