<template>
    <div id = "accounts-view">
        <div id = "add-button-div">
            <v-btn id = "account-add-button" color = "primary" dark @click="showModal">Add
                <v-icon dark right>add</v-icon>
            </v-btn>
        </div>
        <AccountTable
            :accounts = "accountsArray"
            :logger = "logger"
            @edit = "editAccount"
            @delete = "deleteAccount"
        />
        <h3 id = "totalHeader">Total: ${{ accountTotal }}</h3>
        <AccountModal
            :show = "isModalVisible"
            :accountToEdit = "accountToShow"
            @close = "closeModal"
            @save = "saveAccount"
        />
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
        accountTotal: String,
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
            this.accountToShow = this.accountsArray.find(account => account.id === idToEdit);

            this.isModalVisible = true;
        },
        deleteAccount(idToDelete) {
            this.logger.debug('App is deleting an account: ' + idToDelete);

            this.accountModel.deleteAccount(idToDelete);
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

#totalHeader {
    float: right;
    margin-right: 50px;
}
</style>