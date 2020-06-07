class TransactionHelper {

    massageTransactions(transactionList) {
        
        if (typeof(transactionList) !== 'undefined') {
            transactionList.forEach(transaction => {
                transaction.date = new Date(transaction.date);
            });

            transactionList.sort(this._compareTx);
        }

        this._calculateBalance(transactionList);


        return transactionList;
    } 

     _compareTx(a, b) {
        if (a.date < b.date) {
            return -1;
        }
        else if (b.date < a.date) {
            return 1;
        }

        return 0;
    }

    _calculateBalance(transactionList) {
        let currentBalance = 0;
        transactionList.forEach(transaction => {
            currentBalance += transaction.amount;
            transaction.balance = currentBalance;
        })
    }

    /**
     * Filters the provided list of transactions and returns all transactions newer than the provided date
     * @param {Array} txList array containing the list of transactions
     * @param {Date} dateFilter the date that should be used in the filter
     */
    filterTxListFromDate(txList, dateFilter) {
        let returnArray = txList.filter(transaction => {
            return transaction.date > dateFilter
        });

        return returnArray;
    }

    /**
     * Filters the provided list of transactions and returns all of the transactions matching the filter
     * @param {Array} txList array containing the list of transactions
     * @param {TxFilter} txFilter the filter object to be used
     */
    filterTx(txList, txFilter) {
        // TODO - These conversions (new Date) feel bad, but they work for now
        let returnArray = txList;
        if (txFilter.isStartFilter && txFilter.isEndFilter) {
            let startFilterDate = new Date(txFilter.startFilterDate);
            let endFilterDate = new Date(txFilter.endFilterDate);
            returnArray = returnArray.filter(transaction => {
                return (transaction.date > startFilterDate && transaction.date < endFilterDate);
            });
        }
        else if (txFilter.isStartFilter) {
            let startFilterDate = new Date(txFilter.startFilterDate);
            returnArray = returnArray.filter(transaction => {
                //return transaction.date > txFilter.startFilterDate;
                return transaction.date > startFilterDate;
            });
        }
        else if (txFilter.isEndFilter) {
            let endFilterDate = new Date(txFilter.endFilterDate);
            returnArray = returnArray.filter(transaction => {
                return transaction.date < endFilterDate;
            });
        }

        return returnArray;
    }


}

export default TransactionHelper;