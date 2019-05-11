<template>
    <div class = "accounts-table">
        <v-data-table
            :items = "accounts"
            item-key = "id">
            <template v-slot:headers>
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
            </template>
            <template v-slot:items="props">
                <tr>
                    <StringCell :stringToShow="props.item.name" />
                    <MoneyCell :amount="props.item.amount" />
                    <BooleanCell :value="props.item.dynamic" :displayTrue="'Dynamic'" :displayFalse="'Computed'"/>
                    <StringCell :stringToShow="props.item.notes" />
                    <ButtonCell :id="props.item.id" @edit="editAccount" @delete="deleteAccount" />
                </tr>
            </template>
        </v-data-table>
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