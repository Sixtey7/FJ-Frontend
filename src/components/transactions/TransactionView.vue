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
import TxModal from './TxModal.vue';
import TxModel from '../../model/TxModel.js';

export default {
  name: 'TransactionView',
  components: {
    TransactionTable,
    TxModal
  },
  data() {
    return {
      txs: null  ,
      isModalVisible: false,
      txToShow: null
    }
  },
  props: {
    accountsArray: Array,
    txModel: TxModel,
    transArray: Array
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

      this.txModel.saveTx(transToSave);
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
      this.txModel.deleteTx(idToDelete);
    }
  }
}

</script>

<style>
#add-button {
  float: right;
}
</style>
