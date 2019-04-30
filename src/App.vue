<template>
  <div id = "app">
    <!--TransactionView /-->
    <AccountView />
  </div>
</template>

<script>
//import TransactionView from './components/transactions/TransactionView.vue';
import AccountView from './components/accounts/AccountView.vue';
export default {
  name: 'app',
  components: {
  //  TransactionView,
    AccountView
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