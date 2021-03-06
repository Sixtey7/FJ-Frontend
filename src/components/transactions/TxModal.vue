<script>
    export default {
        name: 'NewTxModal',
        props: ['show', 'txToEdit', 'accounts'],
        data: function() {
            return {    
                transaction: {},
                menu: false,
                amountRules: [
                    v => !!v || 'Amount is required',
                    v => /^-{0,1}[0-9.]+$/.test(v) || 'Amount must be a number'
                ]
            }
        },
        methods: {
            close() {
                this.clearValues();
                this.$emit('close');
            },
            save() {
                let transactionToEmit = JSON.parse(JSON.stringify(this.transaction));
                transactionToEmit.amount = transactionToEmit.amount ? parseFloat(transactionToEmit.amount) : '';
                transactionToEmit.date = new Date(transactionToEmit.date);
                //deep copy the value prior to emitting it
                this.$emit('save', transactionToEmit);
                this.clearValues();
            },
            clearValues() {
                this.transaction.id = '';
                this.transaction.accountId = '';
                this.transaction.name = '';
                this.transaction.type = '';
                this.transaction.date = new Date().toISOString().slice(0,10);
                this.transaction.notes = '';
            },
        },
        watch: {
            show: function(show) {
                if (show) {
                    //we'll want to set the values of the modal if another prop was provided
                    if (this.txToEdit) {
                        this.transaction = JSON.parse(JSON.stringify(this.txToEdit));
                        this.transaction.date = new Date(this.transaction.date).toISOString().slice(0,10);
                    }
                    else {
                        this.clearValues();
                    }
                }
            }
        }
    }
</script>
<template>
    <v-layout row justify-center>
        <v-dialog v-model="show" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class = "headline">New Transaction</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex  xs12>
                                <v-select
                                    :items="this.accounts"
                                    label="Account*"
                                    item-text="name"
                                    item-value="id"
                                    v-model="transaction.accountId"
                                    required>
                                </v-select>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field 
                                    label="Name" 
                                    v-model="transaction.name"
                                    required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-menu
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="transaction.date"
                                        label="Date"
                                        prepend-icon="event"
                                        readonly
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="transaction.date" @input="menu = false"></v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field 
                                    label="Amount" 
                                    prefix="$" 
                                    v-model = "transaction.amount"
                                    :rules = "amountRules"
                                    required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-select 
                                    :items="[
                                        'PLANNED',
                                        'ESTIMATE',
                                        'PENDING',
                                        'CONFIRMED',
                                        'FUTURE'
                                    ]"
                                    v-model="transaction.type"
                                    label="Type"
                                    required
                                ></v-select>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field 
                                    label="Notes"
                                    v-model="transaction.notes"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color = "blue darken-1" flat @click="close()">Close</v-btn>
                    <v-btn color = "blue darken-1" flat @click="save()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>
<style>
* {
    box-sizing: border-box;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
}

.modal-container {
    width: 300px;
    margin: 40px auto 0;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.text-right {
    text-align: right;
}

.form-label {
    display: block;
    margin-bottom: 1em;
}

.form-label > .form-control {
    margin-top: 0.5em;
}

.form-control {
    display: block;
    width: 100%;
    padding: 0.5em 1em;
    line-height: 1.5;
    border: 1px solid #ddd;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>