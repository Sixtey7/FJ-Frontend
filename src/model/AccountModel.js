import axios from 'axios';
import AccountHelper from '../utils/AccountHelper';

const ACCOUNT_URL = 'http://localhost:8081/accounts/'

class AccountModel {

    accountsArray;
    accountsTotal;
    _accountHelper;
    _logger;

    constructor(logger) {
        this._logger = logger;
        this._logger.debug('running accounds model constructor!');
        this._accountHelper = new AccountHelper(logger);
        this.accountsArray = new Array();

        axios
            .get(ACCOUNT_URL)
            .then(response => {
                this.accountsArray = response.data;
                
                this._logger.debug('got ' + this.accountsArray.length + ' accounts!');

                this.determineTotal();
            });
    }

    async saveAccount(accountToSave) {
        //determine if this is an existing account or a new one
        if (accountToSave.id) {
            this._logger.debug('saving an edited account: ' + JSON.stringify(accountToSave));

            let returnVal = await this._postAccount(accountToSave);

            if (returnVal) {
                this.accountsArray = await this._accountHelper.mergeAccountIntoArray(accountToSave, this.accountsArray);

                this.determineTotal();
            }
            else {
                this._logger.error('failed to post the account!')
            }
        }
        else {
            this._logger.debug('adding a new account: ' + JSON.stringify(accountToSave));

            let returnVal = await this._putAccount(accountToSave);

            if (returnVal) {
                accountToSave.id = returnVal;
                this.accountsArray.push(accountToSave);

                this.determineTotal();
            }
            else {
                this._logger.error('failed to put the account for: ' + JSON.stringify(accountToSave));
            }
        }
    }

    async deleteAccount(idToDelete) {
        this._logger.debug('Deleting an account with id: ' + idToDelete);

        let returnVal = await this._deleteAccount(idToDelete);

        if (returnVal) {
            let index = this.accountsArray.findIndex(account => {
                return account.id === idToDelete;
            });

            if (index >= 0) {
                this._logger.debug('found the index: ' + index);
                this.accountsArray.splice(index, 1);

                this.determineTotal();
            }
            else {
                this._logger.warn('failed to find the index in the array for account: ' + idToDelete);
            }
        }
    }

    async _putAccount(accountToPut) {
        //need to delete the empty id to prevent the backend from trying to handle it
        delete accountToPut.id;
        let accountJSON = JSON.stringify(accountToPut);

        let returnVal = '';
        await axios({
            method: 'put',
            url: ACCOUNT_URL,
            headers: {
                'Content-type': 'application/json'
            },
            data:
                accountJSON
        })
        .then( response => {
            this._logger.debug('got the response from the put: ' + response.data);
            returnVal = response.data;
        })
        .catch(error => {
            this._logger.error('got the error from attempting to put an account: ' + error);
        });

        return returnVal;
    }

    async _postAccount(accountToPost) {
        let accountJSON = JSON.stringify(accountToPost);

        let returnVal = false;
        await axios({
            method: 'post',
            url: ACCOUNT_URL + accountToPost.id,
            headers: {
                'Content-type' : 'application/json'
            },
            data:
                accountJSON
        })
        .then (response => {
            this._logger.debug('Got the response: ' + JSON.stringify(response));
            if (response.status === 200) {
                this._logger.debug('Successfully posted the account!');
                returnVal = true;
            }
            else {
                this._logger.warn('got a negative status back from posting an account: ' + response.status);
            }
        })
        .catch (error => {
            this._logger.error('got an error when attempting to post an account: ' + error);
        });

        return returnVal;
    }

    async _deleteAccount(idToDelete) {
        this._logger.debug('Deleting account with id: ' + idToDelete);

        let returnVal = false;
        await axios({
            method: 'DELETE',
            url: ACCOUNT_URL + idToDelete
        })
        .then(response => {
            this._logger.debug('Got a return value of ' + response.data);
            if (response.data === 1) {
                returnVal = true;
            }
            else {
                this._logger.error('Failed to delete account with id: ' + idToDelete + ' response was: ' + response.data);
            }
        })
        .catch(error => {
            this._logger.error('Got an error attempting to delete account with id: ' + idToDelete + ' error was: ' + error);
        });

        return returnVal;
    }

    async updateAccountInCache(acctToUpdate) {
        this.accountsArray = await this._accountHelper.mergeAccountIntoArray(acctToUpdate, this.accountsArray);
    }

    async clearAndUpdateCache(acctsToUpdate) {
        this.accountsArray = acctsToUpdate;
    }

    async determineTotal() {
        this._logger.debug('Detemrining the total for all accounts');
        let total = 0;
        this.accountsArray.forEach(account => {
            total += account.amount;
        });

        this.accountsTotal = total.toFixed(2);
        this._logger.debug('Calculated the value: ' + this.accountsTotal);

    }
}

export default AccountModel;