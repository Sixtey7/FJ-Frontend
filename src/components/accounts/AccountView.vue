<template>
    <div id = "accounts-view">
        <button v-on:click = "showModal" type = "button" id = "add-account-button" class = "btn btn-success">
            Add Account
        </button>
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
    </div>
</template>

<script>
import AccountTable from './AccountTable.vue';
import AccountModal from './AccountModal.vue';

import axios from 'axios';

export default {
    name: 'AccountView',
    components: {
        AccountTable,
        AccountModal
    },
    data() {
        return {
            accountsArray: null,
            isModalVisible: false,
            accountToShow: null
        }
    },
    mounted() {
        this.accountsArray = new Array();

        axios
            .get('http://localhost:8081/accounts')
            .then(response => {
                this.accountsArray = response.data;
        });
    },
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
            this.accountToShow = null;
        },
        async saveAccount(accountToSave) {
            this.isModalVisible = false;
            this.accountToShow = null;

            //determine if this is a new account or an edit
            if (accountToSave.id) {
                // eslint-disable-next-line
                console.log('Saving an edited account: ' + JSON.stringify(accountToSave));

                let returnVal = await this._postAccount(accountToSave);
                // eslint-disable-next-line
                console.log('got the reponse from posting: ' + returnVal);
                if (returnVal) {
                    // eslint-disable-next-line
                    console.log('got true back from posting!');

                    let index = this.accountsArray.findIndex(account => {
                         return account.id === accountToSave.id;
                    });
                    if (index >= 0) {
                        // eslint-disable-next-line
                        console.log('found the index: ' + index);
                        // eslint-disable-next-line
                        console.log('updating the account ' + JSON.stringify(accountToSave));
                        this.accountsArray.splice(index,1,accountToSave);
                    }
                    else {
                        // eslint-disable-next-line
                        console.log('failed to find the index in the array!');
                    }
                }
                else {
                    // eslint-disable-next-line
                    console.log('failed to post the transaction!');
                }
            }
            else {
                // eslint-disable-next-line
                console.log('Adding a new account: ' + JSON.stringify(accountToSave));

                let returnVal = await this._putAccount(accountToSave);
                
                // eslint-disable-next-line
                console.log('got the response from posting: ' + returnVal);
                if (returnVal) {
                    // eslint-disable-next-line
                    console.log('got true back from posting!');
                    // eslint-disable-next-line
                    console.log('Account to save is now: ' + JSON.stringify(accountToSave));

                    accountToSave.id = returnVal;
                    this.accountsArray.push(accountToSave);
                }
                else {
                    // eslint-disable-next-line
                    console.log('failed to put the transaction!');
                }
            }
        },
        editAccount(idToEdit) {
            // eslint-disable-next-line
            this.accountToShow = this.accountsArray.find(account => account.id === idToEdit);

            this.isModalVisible = true;
        },
        deleteAccount(idToDelete) {
            // eslint-disable-next-line
            console.log('App is deleting an account: ' + idToDelete);
            this._deleteAccount(idToDelete);
        },
        async _putAccount(accountToPut) {
            //need to delete the empty id to prevent th UI from trying to handle it
            delete accountToPut.id;
            let accountJSON = JSON.stringify(accountToPut);

            let returnVal = '';
            await axios({
                method: 'put',
                url: 'http://localhost:8081/accounts',
                headers: {
                    'Content-type': 'application/json'
                },
                data:
                    accountJSON
            })
            .then(response => {
                // eslint-disable-next-line
                console.log('got the response: ' + response.data);
                returnVal = response.data;
           
            })
            .catch(error => {
                // eslint-disable-next-line
                console.log('got the error: ' + error);
            });

            return returnVal;
        },
        async _postAccount(accountToPost) {
            // eslint-disable-next-line
            let accountJSON = JSON.stringify(accountToPost);

            let returnVal = false;
            await axios({
                method: 'post',
                url: 'http://localhost:8081/accounts/' + accountToPost.id,
                headers: {
                    'Content-type': 'application/json'
                },
                data:
                    accountJSON
            })
            .then(response => {
                // eslint-disable-next-line
                console.log('Got the response: ' + JSON.stringify(response));
                if (response.status === 200) {
                    // eslint-disable-next-line
                    console.log('successfully posted the transaction!');
                    returnVal = true;
                }
                else { 
                    // eslint-disable-next-line
                    console.log('Got a negative status back: ' + response.status);
                }
            })
            .catch(error => {
                // eslint-disable-next-line
                console.log('got the error: ' + error);
            });

            return returnVal;
        },
        _deleteAccount(idToDelete) {
            axios({
                method: 'DELETE',
                url: 'http://localhost:8081/accounts/' + idToDelete
            })
            .then(response => {
                if (response.data === 1) {
                    // eslint-disable-next-line
                    console.log('successfully deleted an account!');
                }
                else {
                    // eslint-disable-next-line
                    console.log('got the response data: ' + JSON.stringify(response.data));
                }
            })
            .catch(error => {
                // eslint-disable-next-line
                console.log('got an error: ' + error);
            });
        }
    }
}
</script>

<style>
#add-account-button {
  float: right;
}
</style>