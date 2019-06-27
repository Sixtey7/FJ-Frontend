<template>
  <div id="transaction-view">
    <div id = "add-button-div">
        <v-btn id = "transaction-add-button" color = "primary" dark @click="showModal">Add
            <v-icon dark right>add</v-icon>
        </v-btn>
    </div>
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
import AccountModel from '../../model/AccountModel';
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
    acctModel: AccountModel,
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

      let acctsToUpdate = await this.txModel.saveTx(transToSave);

      acctsToUpdate.forEach(acct => {
        //eslint-disable-next-line
          console.log('need to handle the account: ' + JSON.stringify(acct));
        this.acctModel.updateAccountInCache(acct);
      });

    },
    editTx(idToEdit) {
      // eslint-disable-next-line
      console.log('App is editing a transction: ---' + idToEdit + '---');
      this.txToShow = this.transArray.find(transaction => transaction.id === idToEdit);
      // eslint-disable-next-line
      console.log('filtered to the transaction: ' + this.txToShow.id);
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
#add-button-div {
    float: left;
    position: absolute;
    z-index: 100
}
</style>
