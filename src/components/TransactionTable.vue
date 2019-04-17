<template>
    <div class = "trans-table">
        <table class = "table table-bordered table-hover table-sm">
            <thead class = "thead-dark">
                <tr>
                    <th colspan="7">Transactions</th>
                </tr>
                <tr>
                    <th scope = "col">Name</th>
                    <th scope = "col">Amount</th>
                    <th scope = "col">Balance</th>
                    <th scope = "col">Type</th>
                    <th scope = "col">Date</th>
                    <th scope = "col">Notes</th>
                    <th scope = "col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for = "transaction in transactions" :key = "transaction.id">
                    <StringCell :stringToShow="transaction.name" />
                    <MoneyCell :amount="transaction.amount" />
                    <MoneyCell :amount="transaction.balance" />
                    <StringCell :stringToShow="transaction.type" />
                    <DateCell :dateToShow="transaction.date" />
                    <StringCell :stringToShow="transaction.notes" />
                    <td>
                        <ButtonCell :id="transaction.id" text="E" style = "margin-right: 5px;"/>
                        <ButtonCell :id="transaction.id" text="D" style = "margin-left: 5px;"/>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
import DateCell from './DateCell.vue';
import MoneyCell from './MoneyCell.vue';
import StringCell from './StringCell.vue';
import ButtonCell from './ButtonCell.vue';

export default {
    name: "TransactionTable",
    components: {
        DateCell,
        MoneyCell,
        StringCell,
        ButtonCell
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