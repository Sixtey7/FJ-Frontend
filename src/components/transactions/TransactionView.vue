<template>
  <div id="transaction-view">
    <div id = "add-button-div">
        <v-btn id = "transaction-add-button" color = "primary" dark @click="showModal">Add
            <v-icon dark right>add</v-icon>
        </v-btn>
    </div>
    <div id="filter-div">
      <v-btn id = "transaction-filter-button" color = "primary" dark @click="showFilterModal">Filter
            <v-icon dark right>filter</v-icon>
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
    <TxFilter
      :show="isFilterModalVisible"
      @close="closeFilterModal"
      @save="saveFilter"
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
import TxFilter from '../../utils/TxFilter';

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
      isFilterModalVisible: false,
      txToShow: null,
      txHelper: new TransactionHelper(),
      transFilteredArray: new Array(),
      txFilter: new TxFilter(new Date(Date.now() - 12096e5), null)
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
    showFilterModal() {
      this.logger.debug('Gotta show that sweet filter model');
      this.isFilterModalVisible = true;
    },
    closeFilterModal() {
      this.isFilterModalVisible = false;
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
    async saveFilter(txFilter) {
      this.logger.debug('Got the filter: ' + JSON.stringify(txFilter));
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
        this.transFilteredArray = this.txHelper.filterTx(this.transArray, this.txFilter)
    }
  }
}

</script>

<style>
#add-button-div {
    float: left;
    position: absolute;
    z-index: 100;
}
#filter-div {
  position: absolute;
  z-index: 100;
  right: 0;
  margin-right:24px;
}
</style>
