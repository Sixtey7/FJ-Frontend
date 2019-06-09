<template>
    <div class = "trans-table">
        <v-data-table
            :items = "transactions"
            item-key = "id"
            :rows-per-page-items="[10, 15, 30, 50, 100]"
            :pagination.sync="pagination">
            <template v-slot:headers>
                <tr>
                    <th colspan="7">Transactions</th>
                </tr>
                <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Balance</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Notes</th>
                    <th></th>
                </tr>
            </template>
            <template v-slot:items="props">
                <tr :key="props.item.id" v-bind:class="{ completeRow: props.item.type === 'CONFIRMED', pendingRow: props.item.type === 'PENDING' }">
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
    data() {
        return {
           pagination: {
            rowsPerPage: 15,
            page: 3
           }
        }
    },
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
    },
    updated: function() {
        //eslint-disable-next-line
        var page = Math.floor(this.transactions.length / 15);
        this.pagination.page=page;
    }
}
</script>

<style scoped>
html, body {
    margin: 5px;
    padding: 0;
}

.completeRow {
    background-color: rgba(152, 251, 152, 0.4);
}


.pendingRow {
     background-color: rgba(255, 255, 58, 0.4);
}
</style>