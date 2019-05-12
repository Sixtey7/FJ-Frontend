<template>
    <v-card height="350px">
      <v-navigation-drawer
        v-model="drawer"
        permanent
        absolute
      >
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>Finance Journal</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-list>
          <v-divider></v-divider>
          <!--v-list-group v-for="menuItem in menuItems" :value = "menuItem.active" :key = "menuItem.title"-->
            <v-list-tile v-for = "menuItem in menuItems"
              :key = "menuItem.title"
              :to = "menuItem.path == '#' ? '' : menuItem.path"
              :exact = "menuItem.exact"
              class = "yellow--text"
              active-class="red--text"
            >
              <v-list-tile-action>
                <v-icon>{{ menuItem.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ menuItem.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          <!--/v-list-group-->
        </v-list>
      </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-card>
</template>

<script>
/* eslint-disable */
//TODO Remove above
import TransactionView from './components/transactions/TransactionView.vue';
import AccountView from './components/accounts/AccountView.vue';
import AccountModel from './model/AccountModel.js';
import TxModel from './model/TxModel.js';
import Vue from 'vue';
import VueRouter from 'vue-router';


/*const routes = [
    {
      path: '/accounts', 
      component: AccountView,
      props: true
    },
    { 
      path: '/transactions', 
      component: TransactionView 
    }
]

const router = new VueRouter({
  routes
});
*/
function accountProps() {
  return this
}

export default {
  name: 'app',
  router: new VueRouter(),
  components: {
    TransactionView,
    AccountView
  },
  data() {
    return {
      logger: Vue.$log,
      accountModel: new AccountModel(Vue.$log),
      txModel: new TxModel(Vue.$log),
      drawer: true,
      menuItems: [
        { title: 'Accounts', icon: 'dashboard', action: 'accounts', path: '/accounts' },
        { title: 'Transactions', icon: 'question_answer', action: 'transactions', path :'/transactions'}
      ]
    }
  },
  created() {
    const self = this;
    self.$router.addRoutes([
    {
      path: '/accounts', 
      component: AccountView,
      props: (route) => ({
        accountModel: this.accountModel,
        accountsArray: this.accountModel.accountsArray,
        logger: this.logger
      })
    },
    {
      path: '/transactions', 
      component: TransactionView,
      props: (route) => ({
        accountsArray: this.accountModel.accountsArray,
        txModel: this.txModel,
        transArray: this.txModel.txArray,
        logger: this.logger
      }) 
    }
    
    ])
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