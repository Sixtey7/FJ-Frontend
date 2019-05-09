import axios from 'axios';
import TransactionHelper from '../utils/TransactionHelper';

const TX_URL = 'http://localhost:8081/transactions/';

class TxModel {
    txArray;
    _txHelper;
    _logger;

    constructor(logger) {
        this._logger = logger;
        this._logger.debug('standing up the Transaction Model!');
        this._txHelper = new TransactionHelper();
        this.txArray = new Array();

        axios
            .get(TX_URL)
            .then(response => {
                this.txArray = this._txHelper.massageTransactions(response.data);
            });
    }

    async saveTx(txToSave) {
        //determine if this is a new tx or a new one
        if (txToSave.transId) {
            this._logger.debug('saving an edited tx: ' + JSON.stringify(txToSave));

            let returnVal = await this._postTx(txToSave);

            if (returnVal) {
                let index = this.txArray.findIndex(tx => {
                    return tx.transId === txToSave.transId;
                });

                if (index >= 0) {
                    this._logger.debug('found the index: ' + index);
                    this.txArray.splice(index, 1, txToSave);
                }
                else {
                    this._logger.warn('failed to find the index in the array for the tx: ' + JSON.stringify(txToSave));
                }
            }
            else {
                this._logger.error('failed to post the transaction!');
            }
        }
        else {
            this._logger.debug('adding a new transaction: ' + JSON.stringify(txToSave));

            let returnVal = await this._putTx(txToSave);

            if (returnVal) {
                txToSave.transId = returnVal;
                this.txArray.push(txToSave);
            }
            else {
                this._logger.error('failed to put the transaction for: ' + JSON.stringify(txToSave));
            }
        }
    }

    async deleteTx(idToDelete) {
        this._logger.debug('Deleting a transaction with id: ' + idToDelete);

        let returnVal = await this._deleteTx(idToDelete);

        if (returnVal) {
            let index = this.txArray.findIndex(tx => {
                return tx.transId === idToDelete;
            });

            if (index >= 0) {
                this._logger.debug('found the index: ' + index);
                this.txArray.splice(index, 1);
            }
            else {
                this._logger.warn('failed to find the index in the array for transaction: ' + idToDelete);
            }
        }
    }

    async _putTx(txToPut) {
        //need to delete the empty id to prevent the backend from trying to handle it
        delete txToPut.transId;
        let txJSON = JSON.stringify(txToPut);

        let returnVal = '';
        await axios({
            method: 'put',
            url: TX_URL,
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

    async _postTx(txToPost) {
        let txJSON = JSON.stringify(txToPost);

        let returnVal = false;

        await axios({
            method: 'post',
            url: TX_URL + txToPost.transId,
            headers: {
                'Content-type' : 'application/json'
            },
            data: {
                txJSON
            }
        })
        .then(response => {
            this._logger.debug('Got the response: ' + JSON.stringify(response));
            if (response.status === 200) {
                this._logger.debug('Successfully posted the transaction!');
                returnVal = true;
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

    async _deleteTx(idToDelete) {

        this._logger.debug('Deleting transaction with id: ' + idToDelete);

        let returnVal = false;

        await axios({
            method: 'delete',
            url: TX_URL + idToDelete
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
}

export default TxModel;