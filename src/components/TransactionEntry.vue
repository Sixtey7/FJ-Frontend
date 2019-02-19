<template>
    <div class = "trans-item">
        <h3>{{ name }}</h3>
        <p>Account \${{ amount }}</p>
        <input :value = "amount" type = "number" @input="$emit('update:amount', parseInt($event.target.value))">
        <p>Type: {{ type }}</p>
        <div v-if="date"><p>Date: {{ date }}</p></div>
        <div v-if="notes"><p>Notes: {{ notes }}</p></div>
    </div>
</template>

<script>
export default {
    name: 'TransactionEntry',
    props: {
        name: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            default: 0
        },
        type: {
            type: String,
            validator: function (value) {
                return ['Planned', 'Estimate', 'Pending', 'Confirmed', 'Future'].indexOf(value) !== -1;
            }
        },
        date: Date,
        notes: String
    }
}
</script>