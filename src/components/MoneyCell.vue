<template>
    <td>{{ amountToShow }}</td>
</template>

<script>
export default {
    name: "MoneyCell",
    props: {
        amount: Number
    },
    computed: {
        amountToShow: function() {
            if (this.amount < 0) {
                return "($" + (-1 * this.amount.toFixed(2)) + ")";
            }
            else {
                return "$" + this.amount.toFixed(2);
            }
        }
    }
}
</script>

