import axios from 'axios';
import TransactionHelper from '../utils/TransactionHelper';

const urlSuffix = '/transactions/';

/**
 * Model class used to manage and interact with Transcation objects
 * 
 * Serves as the primary interaction point with the backend
 */
class TxModel {
    txArray;
    _txHelper;
    _acctHelper;
    _logger;

    constructor(logger, backendHost) {
        this._logger = logger;
        this._logger.debug('standing up the Transaction Model!');
        this.backendURL = "http://" + backendHost + urlSuffix
        this._txHelper = new TransactionHelper();
        this.txArray = new Array();

        axios
            .get(this.backendURL)
            .then(response => {
                this.txArray = this._txHelper.massageTransactions(response.data);
            });
    }

    refreshTxs() {
        this.txArray = this._txHelper.massageTransactions(this.txArray);
    }

    /**
     * Updates the cache of transactions and calls the backend to persist the Transaction
     * @param {Transaction} txToSave The transaction to be saved
     */
    async saveTx(txToSave) {
        //determine if this is a new tx or a new one
        if (txToSave.id) {
            this._logger.debug('saving an edited tx: ' + JSON.stringify(txToSave));

            let returnVal = await this._postTx(txToSave);

            this._logger.debug('got the return data: ' + JSON.stringify(returnVal));

            if (returnVal.success) {
                returnVal.transactions.forEach(trans => {                        
                    let index = this.txArray.findIndex(trans => {
                        return trans.id === txToSave.id;
                    });

                    if (index >= 0) {
                        this._logger.debug('found the index: ' + index);
                        this.txArray.splice(index, 1, trans);

                    }
                    else {
                        this._logger.warn('failed to find the index in the array for the tx: ' + JSON.stringify(trans));
                    }

                });

                this.refreshTxs(); 

                return returnVal.accounts;
            }
            else {
                this._logger.error('failed to post the transaction!');
            }
        }
        else {
            this._logger.debug('adding a new transaction: ' + JSON.stringify(txToSave));

            let returnVal = await this._putTx(txToSave);

            if (returnVal.success) {
                txToSave.id = returnVal.transactions[0];
                this.txArray.push(txToSave);

                this.refreshTxs();
            }
            else {
                this._logger.error('failed to put the transaction for: ' + JSON.stringify(txToSave));
            }
        }
    }

    /**
     * Deletes the transaction with the provided UUID from the cache
     * Also calls the backend to remove the transaction
     * @param {String} idToDelete String containing the UUID of the transaction to be deleted
     */
    async deleteTx(idToDelete) {
        this._logger.debug('Deleting a transaction with id: ' + idToDelete);

        let returnVal = await this._deleteTx(idToDelete);

        if (returnVal) {
            let index = this.txArray.findIndex(tx => {
                return tx.id === idToDelete;
            });

            if (index >= 0) {
                this._logger.debug('found the index: ' + index);
                this.txArray.splice(index, 1);

                this.refreshTxs();
            }
            else {
                this._logger.warn('failed to find the index in the array for transaction: ' + idToDelete);
            }
        }
    }

    /**
     * Helper method used to interact with the Backend's PUT method
     * @param {Transaction} txToPut The transaction object to PUT to the backend
     */
    async _putTx(txToPut) {
        //need to delete the empty id to prevent the backend from trying to handle it
        delete txToPut.id;
        let txJSON = JSON.stringify(txToPut);

        let returnVal = '';
        await axios({
            method: 'put',
            url: this.backendURL,
            headers: {
                'Content-type': 'application/json'
            },
            data:
                txJSON
        })
        .then(response => {
            this._logger.debug('got the response back from the put: ' + response.data);
            returnVal = response.data
        })
        .catch(error => {
            this._logger.error('got the error from attempting to put a transaction: ' + error);
        });

        return returnVal;
    }

    /** 
    * Helper method used to interact with the Backend's POST method
    * @param {Transaction} txToPost The transaction object to POST to the backend
    */
    async _postTx(txToPost) {
        let txJSON = JSON.stringify(txToPost);

        let returnVal = undefined;

        await axios({
            method: 'post',
            url: this.backendURL + txToPost.id,
            headers: {
                'Content-type' : 'application/json'
            },
            data: 
                txJSON
        })
        .then(response => {
            this._logger.debug('Got the response: ' + JSON.stringify(response));
            if (response.status === 200) {
                this._logger.debug('Successfully posted the transaction!');
                returnVal = response.data;
            }
            else {
                this.logger.warn('got a negative status back from posting a transaction: ' + txJSON + ' status was: ' + response.status);
            }
        })
        .catch(error => {
            this._logger.error('got an error when attempting to post a transaction: ' + error);
        });

        return returnVal;
    }

    /**
     * Helper method used to ineract with the Backend's DELETE method
     * @param {String} idToDelete String containing the UUID to be deleted
     */
    async _deleteTx(idToDelete) {

        this._logger.debug('Deleting transaction with id: ' + idToDelete);

        let returnVal = false;

        await axios({
            method: 'delete',
            url: this.backendURL + idToDelete
        })
        .then(response => {
            this._logger.debug('got a return value of: ' + response.data);
            if (response.data === 1) {
                returnVal = true;
            }
            else {
                this._logger.error('failed to delete transaction with id: ' + idToDelete + ', return value was: ' + response.data);
            }
        })
        .catch(error => {
            this._logger.error('got an error attempting to delete transaction with id: ' + idToDelete + ' error was ' + error);
        });

        return returnVal;
    }

    /**
     * Replaces the current transaction cache with the provided array
     * @param {Array} newTxArray Array of Transaction objects to replace the transaction cache with
     */
    async clearAndUpdateCache(newTxArray) {
        this.txArray = this._txHelper.massageTransactions(newTxArray);
    }
}

export default TxModel;