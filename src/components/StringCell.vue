<template>
    <td>{{ stringToShow }}</td>
</template>

<script>
export default {
    name: "StringCell",
    props: {
        stringToShow: String
    }
}
</script>