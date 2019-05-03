<template>
    <div class = "accounts-table">
        <table class = "table table-bordered table-hover table-sm">
            <thead class = "thead-dark">
                <tr>
                    <th colspan="5">Accounts</th>
                </tr>
                <tr>
                    <th scope = "col">Name</th>
                    <th scope = "col">Amount</th>
                    <th scope = "col">Type</th>
                    <th scope = "col">Notes</th>
                    <th scope = "col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for = "account in accounts" :key="account.id">
                    <StringCell :stringToShow="account.name" />
                    <MoneyCell :amount="account.amount" />
                    <BooleanCell :value="account.dynamic" :displayTrue="'Dynamic'" :displayFalse="'Computed'"/>
                    <StringCell :stringToShow="account.notes" />
                    <ButtonCell :id="account.id" @edit="editAccount" @delete="deleteAccount" />
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import StringCell from '../cells/StringCell.vue';
import MoneyCell from '../cells/MoneyCell.vue';
import ButtonCell from '../cells/ButtonCell.vue';
import BooleanCell from '../cells/BooleanCell.vue';

export default {
    name: "AccountTable",
    components: {
        StringCell,
        MoneyCell,
        ButtonCell,
        BooleanCell
    },
    props: {
        accounts: Array
    },
    methods: {
        editAccount(accountToEdit) {
            // eslint-disable-next-line
            console.log('editing an account: ' + accountToEdit);
            this.$emit('edit', accountToEdit);

        },
        deleteAccount(accountToDelete) {
            // eslint-disable-next-line
            console.log('deleting an account: ' + accountToDelete);
            this.$emit('delete', accountToDelete);
        }
    }
}
</script>

<style scoped>
html, body {
    margin: 5px;
    padding: 0;
}
</style>