<template>
  <v-app dark style = "margin-top: 0px">
    <v-card height="100%">
      <v-navigation-drawer
        v-model="drawer"
        permanent
        absolute
        enable-resize-watcher app dark      >
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="./assets/logo.png">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>Finance Journal</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-list>
          <v-divider></v-divider>
            <v-list-tile v-for = "menuItem in menuItems"
              :key = "menuItem.title"
              :to = "menuItem.path == '#' ? '' : menuItem.path"
              :exact = "menuItem.exact"
              class = "white--text"
              active-class="yellow--text"
            >
              <v-list-tile-action>
                <v-icon>{{ menuItem.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ menuItem.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-content>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-card>
  </v-app>
</template>

<script>
import TransactionView from './components/transactions/TransactionView.vue';
import AccountView from './components/accounts/AccountView.vue';
import AdminView from './components/admin/AdminView.vue';
import AccountModel from './model/AccountModel.js';
import TxModel from './model/TxModel.js';
import Vue from 'vue';
import VueRouter from 'vue-router';

export default {
  name: 'app',
  router: new VueRouter(),
  data() {
    return {
      logger: Vue.$log,
      accountModel: new AccountModel(Vue.$log),
      txModel: new TxModel(Vue.$log),
      drawer: true,
      menuItems: [
        { title: 'Accounts', icon: 'dashboard', action: 'accounts', path: '/accounts' },
        { title: 'Transactions', icon: 'question_answer', action: 'transactions', path :'/transactions'},
        { title: 'Admin', icon: 'rowing', action: 'admin', path: '/admin'}
      ]
    }
  },
  created() {
    const self = this;
    self.$router.addRoutes([
    {
      path: '/accounts', 
      component: AccountView,
      props: () => ({
        accountModel: this.accountModel,
        accountsArray: this.accountModel.accountsArray,
        accountTotal: this.accountModel.accountsTotal,
        logger: this.logger
      })
    },
    {
      path: '/transactions', 
      component: TransactionView,
      props: () => ({
        accountsArray: this.accountModel.accountsArray,
        txModel: this.txModel,
        acctModel: this.accountModel,
        transArray: this.txModel.txArray,
        logger: this.logger
      }) 
    },
    {
        path: '/admin',
        component: AdminView,
        props: () => ({
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