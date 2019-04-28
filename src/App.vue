<template>
  <div id = "app">
    <TransactionView />
  </div>
</template>

<script>
import TransactionView from './components/transactions/TransactionView.vue';

export default {
  name: 'app',
  components: {
    TransactionView
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