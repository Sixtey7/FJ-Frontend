<template>
    <td class="text-xs-center">{{ dateToShow | formatDate }}</td>
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
            return moment.utc(value).format('MMM DD, YYYY');
        }
    }
}
</script>