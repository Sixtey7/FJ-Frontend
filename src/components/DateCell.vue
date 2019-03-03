<template>
    <td>{{ dateToShow | formatDate }}</td>
</template>

<script>
import moment from 'moment';

export default {
    name: "DateCell",
    props: {
        dateToShow: Date
    },
    filters: {
        formatDate: function(value) {
            if (!value) {
                return;
            }
            return moment(value).format('MM/DD/YY');
        }
    }
}
</script>