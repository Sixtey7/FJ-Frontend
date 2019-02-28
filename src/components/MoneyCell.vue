<template>
    <td>${{ amount }}</td>
</template>

<script>
export default {
    name: "MoneyCell",
    props: {
        amount: Number
    }
}
</script>

