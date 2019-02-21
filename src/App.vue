<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!--HelloWorld msg="Welcome to Your Vue.js App"/-->
    <TransactionEntry
      :key = "123"
      :amount = "1234"
      :type = "Planned"
      :name = "Hello"
    />
  </div>
</template>

<script>
import TransactionEntry from './components/TransactionEntry.vue';

export default {
  name: 'app',
  components: {
    TransactionEntry
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
