<script>
    export default {
        name: 'NewTxModal',
        props: ['show'],
        methods: {
            close() {
                this.$emit('close');
            },
            setCurrency() {
                // eslint-disable-next-line
                console.log("Make it look like dollars!");
            }
        }
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
                    <form id = "transactionForm" @submit.prevent="handleSubmit">
                        <div class = "form-group">
                            <label for="name">Name:</label>
                            <input id = "name" v-model="name" placeholder="Name of Trans" class = "form-control">
                        </div>
                        <div class = "form-group">
                            <label for = "amount">Amount $</label>
                            <input id = "amount" v-model.number="amount" placeholder="0" type="number" class = "form-control" step="0.01" v-on:blur="setCurrency()">
                        </div>
                        <div class = "form-group">
                            <label for = "type">Type</label>
                            <select v-model="type" class = "form-control">
                                <option disabled value="">Please Select</option>
                                <option>Planned</option>
                                <option>Estimate</option>
                                <option>Pending</option>
                                <option>Confirmed</option>
                                <option>Future</option>
                            </select>
                        </div>
                        <div class = "form-group">
                            <label for = "date">Date</label>
                            <input id = "date" v-model="date" type="date" class = "form-control">
                        </div>
                        <div class = "form-group">
                            <label for = "notes">Notes</label>
                            <textarea id = "notes" v-model="notes" placeholder = "Notes" class = "form-control"></textarea>
                        </div>
                        <button type="submit" class = "btn btn-primary" @click="close()">Submit</button>
                    </form>
                </div>
                <div class = "modal-footer text-right">
                    <button class = "modal-default-button" @click="close()">
                        Close!
                    </button>
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