<script>
    var currency = 'USD';
    export default {
        name: 'NewTxModal',
        props: ['show', 'txToEdit', 'accounts'],
        data: function() {
            return {    
                transaction: {}
            }
        },
        methods: {
            close() {
                this.clearValues();
                this.$emit('close');
            },
            save() {
                this.transaction.amount = this.transaction.amount ? _localStringToNumber(this.transaction.amount) : '';
                //deep copy the value prior to emitting it
                this.$emit('save', JSON.parse(JSON.stringify(this.transaction)));
                this.clearValues();
            },
            clearValues() {
                this.transaction.transId = '';
                this.transaction.accountId = '';
                this.transaction.name = '';
                this.transaction.amount = 0;
                this.transaction.type = '';
                this.transaction.date = new Date().toISOString().slice(0,10);
                this.transaction.notes = '';
            },
            setCurrency() {
                  const options = {
                    maximumFractionDigits : 2,
                    currency              : currency,
                    style                 : "currency",
                    currencyDisplay       : "symbol"
                }

                this.transaction.amount = this.transaction.amount ? _localStringToNumber(this.transaction.amount).toLocaleString(undefined, options) : ''
            },
            onFocus(){
                this.transaction.amount = this.transaction.amount ? _localStringToNumber(this.transaction.amount) : '';
            }
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

    function _localStringToNumber( s ){
        return Number(String(s).replace(/[^0-9.-]+/g,""));
}
</script>
<template>
    <transition name = "modal">
        <div class = "modal-mask" v-show = "show">
            <div class = "modal-container">
                <div class = "modal-header">
                    <h3>New Transaction</h3>
                </div>
                <div class = "modal-body">
                    <form id = "transactionForm" @submit.prevent="save">
                        <div class = "form-group">
                            <label for="account">Account</label>
                            <select id = "accountId" v-model="transaction.accountId" class="form-control">
                                <option disble value="">Please Select</option>
                                <option v-for = "account in this.accounts" :key="account.id" :value="account.id">
                                    {{ account.name }}
                                </option>
                            </select>
                        </div>
                        <div class = "form-group">
                            <label for="name">Name</label>
                            <input id = "name" v-model="transaction.name" placeholder="Name of Trans" class = "form-control">
                        </div>
                        <div class = "form-group">
                            <label for = "amount">Amount $</label>
                            <input id = "amount" v-model.number="transaction.amount" placeholder="0" type="text" class = "form-control" v-on:blur="setCurrency()" v-on:focus="onFocus()">
                        </div>
                        <div class = "form-group">
                            <label for = "type">Type</label>
                            <select id = "type" v-model="transaction.type" class = "form-control">
                                <!--TODO: Eventually I don't want these to be all caps -->
                                <option disabled value="">Please Select</option>
                                <option>PLANNED</option>
                                <option>ESTIMATE</option>
                                <option>PENDING</option>
                                <option>CONFIRMED</option>
                                <option>FUTURE</option>
                            </select>
                        </div>
                        <div class = "form-group">
                            <label for = "date">Date</label>
                            <input id = "date" v-model="transaction.date" type="date" class = "form-control">
                        </div>
                        <div class = "form-group">
                            <label for = "notes">Notes</label>
                            <textarea id = "notes" v-model="transaction.notes" placeholder = "Notes" class = "form-control"></textarea>
                        </div>
                        <button type="button" class = "btn btn-primary" @click="close()" style="float: left">Cancel</button>
                        <button type="button" class = "btn btn-primary" @click="save()" style="float: right">Submit</button>
                    </form>
                </div>
                <div class = "modal-footer text-right">
                </div>
            </div>
        </div>
    </transition>
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