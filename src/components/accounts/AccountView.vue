<template>
    <div id = "accounts-view">
        <AccountTable
            :accounts = "accountsArray"
            @edit = "editAccount"
            @delete = "deleteAccount"
        />
        <AccountModal
            :show = "isModalVisible"
            :accountToEdit = "accountToShow"
            @close = "closeModal"
            @save = "saveAccount"
        />
        <v-btn fab dark fixed bottom right color="indigo" id = "add-account-button" v-on:click = "showModal">
            <v-icon dark>add</v-icon>
        </v-btn>
    </div>
</template>

<script>
import AccountTable from './AccountTable.vue';
import AccountModal from './AccountModal.vue';
import AccountModel from '../../model/AccountModel.js';

export default {
    name: 'AccountView',
    components: {
        AccountTable,
        AccountModal
    },
    data() {
        return {
            isModalVisible: false,
            accountToShow: null,
        }
    },
    props: {
        accountModel: AccountModel,
        accountsArray: Array,
        logger: Object
    },
    methods: {
        showModal() {
            this.logger.debug('Opening the modal!');
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
            this.accountToShow = null;
        },
        async saveAccount(accountToSave) {
            this.isModalVisible = false;
            this.accountToShow = null;

            this.accountModel.saveAccount(accountToSave);
        },
        editAccount(idToEdit) {
            // eslint-disable-next-line
            this.accountToShow = this.accountsArray.find(account => account.id === idToEdit);

            this.isModalVisible = true;
        },
        deleteAccount(idToDelete) {
            // eslint-disable-next-line
            console.log('App is deleting an account: ' + idToDelete);

            this.accountModel.deleteAccount(idToDelete);
        }
    }
}
</script>

<style>
</style>