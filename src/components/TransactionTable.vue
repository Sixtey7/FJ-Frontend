<template>
    <div class = "trans-table">
        <table class = "table">
            <thead>
                <tr>
                    <th scope = "col">Name</th>
                    <th scope = "col">Amount</th>
                    <th scope = "col">Type</th>
                    <th scope = "col">Date</th>
                    <th scope = "col">Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for = "transaction in transactions" :key = "transaction.id">
                    <StringCell :stringToShow="transaction.name" />
                    <MoneyCell :amount="transaction.amount" />
                    <StringCell :stringToShow="transaction.type" />
                    <DateCell :dateToShow="transaction.date" />
                    <StringCell :stringToShow="transaction.notes" />
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
import DateCell from './DateCell.vue';
import MoneyCell from './MoneyCell.vue';
import StringCell from './StringCell.vue';

export default {
    name: "TransactionTable",
    components: {
        DateCell,
        MoneyCell,
        StringCell
    },
    props: {
        transactions: Array
    }
}
</script>

<style scoped>
html, body {
    margin: 5px;
    padding: 0;
}
</style>