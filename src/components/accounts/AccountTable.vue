<template>
    <div class = "accounts-table">
        <v-data-table
            :items = "accounts"
            item-key = "id"
            :rows-per-page-items="[5, 10, 15, 20]"
            :pagination.sync="pagination">
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
                <tr @click="editAccount(props.item.id)">
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
import Vue from 'vue';

export default {
    name: "AccountTable",
    data() {
        return {
            pagination: {
                rowsPerPage: 5
            }
        }
    },
    components: {
        StringCell,
        MoneyCell,
        ButtonCell,
        BooleanCell
    },
    props: {
        accounts: Array,
        logger: Vue.log
    },
    methods: {
        editAccount(accountToEdit) {
            this.logger.info('editing an account: ' + accountToEdit);
            this.$emit('edit', accountToEdit);

        },
        deleteAccount(accountToDelete) {
            this.logger.info('deleting an account: ' + accountToDelete);
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