<template>
    <div class = "trans-table">
        <v-data-table
            :items = "transactions"
            item-key = "id">
            <template v-slot:headers>
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
            </template>
            <template v-slot:items="props">
                <tr>
                    <StringCell :stringToShow="props.item.name" />
                    <MoneyCell :amount="props.item.amount" />
                    <MoneyCell :amount="props.item.balance" />
                    <StringCell :stringToShow="props.item.type" />
                    <DateCell :dateToShow="props.item.date" />
                    <StringCell :stringToShow="props.item.notes" />
                    <ButtonCell :id="props.item.id" @edit="editTx" @delete="deleteTx" />
                </tr>
            </template>
        </v-data-table>
    </div>
</template>


<script>
import DateCell from '../cells/DateCell.vue';
import MoneyCell from '../cells/MoneyCell.vue';
import StringCell from '../cells/StringCell.vue';
import ButtonCell from '../cells/ButtonCell.vue';

export default {
    name: "TransactionTable",
    components: {
        DateCell,
        MoneyCell,
        StringCell,
        ButtonCell
    },
    props: {
        transactions: Array,
        accounts: Array
    },
    methods: {
        editTx(txToEdit) {
            // eslint-disable-next-line
            console.log('editing a transaction: ' + txToEdit);
            this.$emit('edit', txToEdit);
        },
        deleteTx(txToDelete) {
            // eslint-disable-next-line
            console.log('deleting a transaction: ' + txToDelete);
            this.$emit('delete', txToDelete);
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