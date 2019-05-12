<template>
    <td class="text-xs-center">{{ amountToShow }}</td>
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
            //TODO: This guard code is likely eventually not needed, but today it is
            if (this.amount === null) {
                return (0).toLocaleString(undefined, options);
            }

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

