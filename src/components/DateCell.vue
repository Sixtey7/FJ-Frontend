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
            //value = new Date(value);
            return moment(value).format('MMM DD, YYYY');
        }
    }
}
</script>