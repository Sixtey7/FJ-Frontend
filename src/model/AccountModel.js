import axios from 'axios';
import AccountHelper from '../utils/AccountHelper';

const urlSuffix = '/accounts/';

/**
 * Model class used to manage and interact with Account objects
 * 
 * Serves as the primary interaction point with the backend
 */
class AccountModel {

    accountsArray;
    accountsTotal;
    _accountHelper;
    _logger;

    constructor(logger, backendHost) {
        this._logger = logger;
        this._logger.debug('running accounds model constructor!');
        this.backendURL = 'http://' + backendHost + urlSuffix;
        this._accountHelper = new AccountHelper(logger);
        this.accountsArray = new Array();

        axios
            .get(this.backendURL)
            .then(response => {
                this.accountsArray = this._accountHelper.massageAccounts(response.data);
                
                this._logger.debug('got ' + this.accountsArray.length + ' accounts!');

                this.determineTotal();
            });
    }

    /**
     * Updates the cache of accounts and calls the backend to persist the Account
     * Also updates the total for the account based on the account's transactions
     * @param {Account} accountToSave The account to be saved
     */
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

    /**
     * Deletes the account with the provided UUID from the cache
     * Also calls the backend to remove the account
     * @param {String} idToDelete String contining the UUID to be deleted
     */
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

    /**
     * Helper method used to interact with the Backend's PUT method
     * @param {Account} accountToPut The account object to PUT to the backend
     * @private
     */
    async _putAccount(accountToPut) {
        //need to delete the empty id to prevent the backend from trying to handle it
        delete accountToPut.id;
        let accountJSON = JSON.stringify(accountToPut);

        let returnVal = '';
        await axios({
            method: 'put',
            url: this.backendURL,
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

    /**
     * Helper method used to interact with the Backend's POST object
     * @param {Account} accountToPost The account object to POST to the backend
     * @private
     */
    async _postAccount(accountToPost) {
        let accountJSON = JSON.stringify(accountToPost);

        let returnVal = false;
        await axios({
            method: 'post',
            url: this.backendURL + accountToPost.id,
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

    /**
     * Helper method used to interact with the Backend's DELETE method
     * @param {String} idToDelete String containing the UUID to be deleted
     * @private
     */
    async _deleteAccount(idToDelete) {
        this._logger.debug('Deleting account with id: ' + idToDelete);

        let returnVal = false;
        await axios({
            method: 'DELETE',
            url: this.backendURL + idToDelete
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

    /**
     * Takes in an account object and updates the account cache to contain that object
     * @param {Account} acctToUpdate Account to be merged into the account cache
     */
    async updateAccountInCache(acctToUpdate) {
        this.accountsArray = await this._accountHelper.mergeAccountIntoArray(acctToUpdate, this.accountsArray);
    }

    /**
     * Replaces the current account cache with the provided array
     * @param {Array} acctsToUpdate Array of Account objects to replace the account cache with
     */
    async clearAndUpdateCache(acctsToUpdate) {
        this.accountsArray = acctsToUpdate;
    }

    /**
     * Determines the total balance for all accounts in the cache
     */
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