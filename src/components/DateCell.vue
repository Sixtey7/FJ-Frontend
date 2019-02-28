<template>
    <td>{{ dateToShow }}</td>
</template>

<script>
export default {
    name: "DateCell",
    props: {
        dateToShow: Date
    }
}
</script>