<template>
  <div id="transaction-view">
    <button v-on:click = "showModal" type = "button" id="add-button" class="btn btn-success">
        Add Tx
    </button> 
    <TransactionTable
      :transactions = "transArray"
      :accounts = "accountsArray"
      @edit="editTx"
      @delete="deleteTx"
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
      txs: null  ,
      isModalVisible: false,
      txToShow: null
    }
  },
  props: {
    accountsArray: Array
  },
  mounted() {
    this.transArray = new Array();
    
    //get the data
    axios.get('http://localhost:8081/transactions')
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
    async saveTx(transToSave) {
      this.isModalVisible = false;
      this.txToShow = null;

      //determine if this a new tx or an edit
      if (transToSave.transId) {
        // eslint-disable-next-line
        console.log('Saving an edited transaction: ' + JSON.stringify(transToSave));

        let returnValue = await this._postTransaction(transToSave);

        if (returnValue) {
          // eslint-disable-next-line
          console.log('got true back from posting!');

          let index = this.transArray.findIndex(trans => {
            return trans.transId === transToSave.transId;
          });

          // eslint-disable-next-line
          console.log('got the index: ' + index);
          if (index >= 0) {
            this.transArray.splice(index,1,transToSave);

            //TODO we might want to do this smarter, rather than redoing the entire array
            this.transArray = new TransactionHelper().massageTransactions(this.transArray);
          }
        }
      }
      else {
        // eslint-disable-next-line
        console.log('Adding a new transaction: ' + JSON.stringify(transToSave));

        let returnValue = await this._putTransaction(transToSave);

        if (returnValue) {
          transToSave.transId = returnValue;
          this.transArray.push(transToSave);
          //TODO we might want to do this smarter, rather than redoing the entire array
          this.transArray = new TransactionHelper().massageTransactions(this.transArray);
        }
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
    deleteTx(idToDelete) {
      // eslint-disable-next-line
      console.log('App is deleting a transaction: ' + idToDelete);
      this._deleteTransaction(idToDelete);
    },
    async _putTransaction(transToPut) {
      //need to delete the empty transId to prevent the UI from trying to handle it
      delete transToPut.transId;
      let transJSON = JSON.stringify(transToPut);

      let returnValue = '';
      await axios({
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
          returnValue = response.data;
        })
      .catch(error => {
        // eslint-disable-next-line
        console.log('got the error: ' + error);
      });

      return returnValue;
    },
    async _postTransaction(transToPost) {
      // eslint-disable-next-line
      let transJSON = JSON.stringify(transToPost);

      let returnValue = false;
      await axios({
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

        if (response.status === 200) {
          returnValue = true;
        }
      })
      .catch(error => {
        // eslint-disable-next-line
        console.log('Got the error: ' + error);
      });

      return returnValue;
    },
    _deleteTransaction(idToDelete) {
      axios({
        method: 'DELETE',
        url: 'http://localhost:8081/transactions/' + idToDelete
      })
      .then(response => {
        if (response.data === 1) {
          // eslint-disable-next-line
          console.log('successfully deleted a transaction!');
        }
        else {
          // eslint-disable-next-line
          console.log('got the response data: ' + JSON.stringify(response.data));
        }
      })
      .catch(error => {
        // eslint-disable-next-line
        console.log('Got the error: ' + error);
      })
    }
  }
}

</script>

<style>
#add-button {
  float: right;
}
</style>
