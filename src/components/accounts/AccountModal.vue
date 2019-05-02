<script>
    //TODO: this should be pulled out to a common location
    var currency = 'USD';
    export default {
        name: 'AccountModal',
        props: ['show', 'accountToEdit'],
        data: function() {
            return {
                account: {}
            }
        },
        methods: {
            close() {
                this.clearValues();
                this.$emit('close');
            },
            save() {
                this.account.amount = this.account.amount ? _localStringToNumber(this.account.amount) : '';
                this.$emit('save', this.account);
                this.clearValues();
            },
            clearValues() {
                this.account.accountId = '';
                this.account.amount = '';
                this.account.dynamic = false;
                this.account.notes = '';
            },
            setCurrency() {
                //TODO: move this to a common location
                const options = {
                    maximumFractionDigits   : 2,
                    currency                : currency,
                    style                   : "currency",
                    currencyDisplay         : "symbol"
                }

                this.account.amount = this.account.amount ? _localStringToNumber(this.account.amount).toLocaleString(undefined, options) : '';
            },
            onFocus() {
                this.account.amount = this.account.amount ? _localStringToNumber(this.account.amount) : '';
            },
        },
        watch: {
            show: function (show) {
                if (show) {
                    //we'll want to set the values of the model if they were provided
                    if (this.accountToEdit) {
                        //TODO: this is a really hacky way to do the deep copy
                        this.account = JSON.parse(JSON.stringify(this.accountToEdit));
                    }
                    else {
                        this.clearValues();
                    }
                }
            }
        }
    }
    function _localStringToNumber( s ) {
        return Number(String(s).replace(/[^0-9.-]+/g, ""))
    }
</script>
<template>
    <transition name = "modal">
        <div class = "modal-mask" v-show = "show">
            <div class = "modal-container">
                <div class = "modal-header">
                    <h3>New Account</h3>
                </div>
                <div class = "modal-body">
                    <form id = "accountForm" @submit.prevent="save">
                        <div class = "form-group">
                            <label for = "name">Name</label>
                            <input name = "name" v-model = "account.name" placeholder = "Name of Account" class = "form-control">
                        </div>
                        <div class = "form-group" disabled = "this.account.dynamic">
                            <label for = "amount">Amount</label>
                            <input id = "amount" v-model.number="account.amount" placeholder="0" type="text" class = "form-control" v-on:blur="setCurrency()" v-on:focus="onFocus()">
                        </div>
                        <div class = "form-group">
                            <label for = "type">Type</label>
                            <select id = "type" v-model="account.dynamic" class = "form-control">
                                <option disabled value="">Please Select</option>
                                <option value = "false">Computed</option>
                                <option value = "true">Dynamic</option>
                            </select>
                        </div>
                        <div class = "form-group">
                            <label for = "notes">Notes</label>
                            <textarea name = "notes" v-model = "account.notes" placeholder = "Notes" class = "form-control"></textarea>
                        </div>
                        <button type = "button" class = "btn btn-primary" @click="close()" style = "float: left">Cancel</button>
                        <button type = "button" class = "btn btn-primary" @click="save()" style = "float: right">Submit</button>
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