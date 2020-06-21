import moment from 'moment';

/**
 * Class used to manupilate dats accross the frontend
 */
class DateHelper {
    /**
     * Formats the date into the format commonly used on the frontend (YY-MM-DD)
     * @param {Date} dateToFormat The date to be formatted
     */
    static formatDateForUI(dateToFormat) {
        return moment.utc(dateToFormat).format('YY-MM-DD');
    }
}

export default DateHelper;