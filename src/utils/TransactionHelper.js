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
            //eslint-disable-next-line
            console.log('Determined {} less than {}', a.date, b.date);
            return -1;
        }
        else if (b.date < a.date) {
            return 1;
        }

        return 0;
    }

    _calculateBalance(transactionList) {
        transactionList.forEach(transaction => {
            transaction.balance = 0;
        })
    }
}

export default TransactionHelper;