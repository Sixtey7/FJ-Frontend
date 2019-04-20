<template>
    <td>{{ amountToShow }}</td>
</template>

<script>
const options = {
    maximumFractionDigits : 2,
    currency              : "USD",
    style                 : "currency",
    currencyDisplay       : "symbol"
};

export default {
    name: "MoneyCell",
    props: {
        amount: Number
    },
    computed: {
        amountToShow: function() {
            if (this.amount < 0) {
                return "(" + Math.abs(this.amount).toLocaleString(undefined, options) + ")";
            }
            else {
                return this.amount.toLocaleString(undefined, options);
            }
        }
    }
}
</script>

