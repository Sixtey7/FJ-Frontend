<template>
    <div class = "accounts-table">
        <table class = "table table-bordered table-hover table-sm">
            <thead class = "thead-dark">
                <tr>
                    <th colspan="4">Accounts</th>
                </tr>
                <tr>
                    <th scope = "col">Name</th>
                    <th scope = "col">Amount</th>
                    <th scope = "col">Dynamic</th>
                    <th scope = "col">Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for = "account in accounts" :key="account.id">
                    <StringCell :stringToShow="account.name" />
                    <MoneyCell :amount="account.amount" />
                    <StringCell :stringToShow="account.dynamic" />
                    <StringCell :stringToShow="account.notes" />
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import StringCell from '../cells/StringCell.vue';
import MoneyCell from '../cells/MoneyCell.vue';

export default {
    name: "AccountTable",
    components: {
        StringCell,
        MoneyCell
    },
    props: {
        accounts: Array
    }
}
</script>

<style scoped>
html, body {
    margin: 5px;
    padding: 0;
}
</style>