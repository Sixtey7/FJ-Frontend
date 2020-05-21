<template>
  <div id="transaction-view">
    <div id = "add-button-div">
        <v-btn id = "transaction-add-button" color = "primary" dark @click="showModal">Add
            <v-icon dark right>add</v-icon>
        </v-btn>
    </div>
    <TransactionTable
      :transactions = "transFilteredArray"
      :accounts = "accountsArray"
      :logger = "logger"
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
import Vue from 'vue';
import TransactionHelper from '../../utils/TransactionHelper';

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
      txToShow: null,
      txHelper: new TransactionHelper(),
      transFilteredArray: new Array(),
      filerDate:  new Date(Date.now() - 12096e5)
    }
  },
  props: {
    accountsArray: Array,
    txModel: TxModel,
    acctModel: AccountModel,
    transArray: Array,
    logger: Vue.log
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

      //call the model to perform the update
      let acctsToUpdate = await this.txModel.saveTx(transToSave);

      //update the accounts that were affected by the transaction change
      if (typeof acctsToUpdate !== 'undefined') {
        acctsToUpdate.forEach(acct => {
          this.logger.debug('need to handle the account: ' + JSON.stringify(acct));
          this.acctModel.updateAccountInCache(acct);
        });
      }
    },
    editTx(idToEdit) {
      this.logger.debug('App is editing a transction: ---' + idToEdit + '---');
      this.txToShow = this.transArray.find(transaction => transaction.id === idToEdit);

      this.logger.debug('filtered to the transaction: ' + this.txToShow.id);
      this.isModalVisible = true;
    },
    deleteTx(idToDelete) {
      this.logger.debug('App is deleting a transaction: ' + idToDelete);
      this.txModel.deleteTx(idToDelete);
    }
  },
  watch: {
    transArray: function() {
        this.transFilteredArray = this.txHelper.filterTxListFromDate(this.transArray, this.filerDate)
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
