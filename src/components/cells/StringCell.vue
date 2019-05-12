<template>
    <td class="text-xs-center">{{ stringToShow }}</td>
</template>

<script>
export default {
    name: "StringCell",
    props: {
        stringToShow: String
    }
}
</script>