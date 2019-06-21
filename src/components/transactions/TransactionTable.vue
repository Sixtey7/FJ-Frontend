<template>
    <div class = "trans-table">
        <v-data-table
            :items = "transactions"
            item-key = "id"
            hide-actions
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
                <tr :key="props.item.id" v-bind:class="{ completeRow: props.item.type === 'CONFIRMED', pendingRow: props.item.type === 'PENDING' }" @click="editTx(props.item.id)">
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
        <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
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
            rowsPerPage: 30
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
        },
        goToLastPage() {
            var page = Math.ceil(this.transactions.length / this.pagination.rowsPerPage);
            this.pagination.page=page;
        }
    },
    computed: {
        pages () {
            if (this.pagination.rowsPerPage == null || this.transactions.length == 0) {
                return 0; 
            } 

            return Math.ceil(this.transactions.length / this.pagination.rowsPerPage)
      }
    },
    watch: {
        transactions: function() {
            this.goToLastPage();
        }
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