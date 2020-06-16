import moment from 'moment';

class DateHelper {
    static formatDateForUI(dateToFormat) {
        return moment.utc(dateToFormat).format('YY-MM-DD');
    }
}

export default DateHelper;