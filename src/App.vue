<template>
  <div id = "app">
    <ul class="nav nav-pills nav-fill" id = "nav" role = "tablist">
      <li class="nav-item"><a class="nav-link active" href="#accounts" id = "accounts-tab" data-toggle="tab" role="tab">Accounts</a></li>
      <li class="nav-item"><a class="nav-link" href="#transactions" id = "transactions-tab" data-toggle="tab" role="tab">Transactions</a></li>
    </ul>

    <div class = "tab-content" id = "navContent">
      <div class = "tab-pane fade show active" id = "accounts" role = "tabpanel">
        <AccountView :accountModel = "accountModel" :accountsArray = "accountModel.accountsArray"  />
      </div>
      <div class = "tab-pane fade" id = "transactions" role = "tabpanel">
        <TransactionView />
      </div>
    </div>
  </div>
</template>

<script>
import TransactionView from './components/transactions/TransactionView.vue';
import AccountView from './components/accounts/AccountView.vue';
import AccountModel from './model/AccountModel.js';
import Vue from 'vue';

export default {
  name: 'app',
  components: {
    TransactionView,
    AccountView
  },
  data() {
    return {
      logger: Vue.$log,
      accountModel: new AccountModel(Vue.$log),
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
</style>