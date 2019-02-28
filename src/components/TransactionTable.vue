<template>
    <div class = "trans-table">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for = "transaction in transactions" :key = "transaction.id">
                    <td>{{ transaction.name }}</td>
                    <MoneyCell :amount="transaction.amount" />
                    <td>{{ transaction.type }}</td>
                    <td>{{ transaction.date }}</td>
                    <td>{{ transaction.notes }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
import MoneyCell from './MoneyCell.vue';

export default {
    name: "TransactionTable",
    components: {
        MoneyCell
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