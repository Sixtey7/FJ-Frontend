<template>
    <div id = "accounts-view">
        <AccountTable
            :accounts = "accountsArray"
        />
    </div>
</template>

<script>
import AccountTable from './AccountTable.vue';

import axios from 'axios';

export default {
    name: 'AccountView',
    components: {
        AccountTable
    },
    data() {
        return {
            accountsArray: null
        }
    },
    mounted() {
        this.accountsArray = new Array();

        axios
            .get('http://localhost:8081/accounts')
            .then(response => {
                this.accountsArray = response.data;
        });
    }
}
</script>

<style>

</style>