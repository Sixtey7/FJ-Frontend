class TransactionHelper {

    massageTransactions(transactionList) {
        
        if (typeof(transactionList) !== 'undefined') {
            transactionList.forEach(transaction => {
                transaction.date = new Date(transaction.date);
            });
        }


        return transactionList;
    } 
}

export default TransactionHelper;