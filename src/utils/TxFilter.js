import moment from 'moment';
class TxFilter {
    isStartFilter;
    isEndFilter;
    startFilterDate;
    endFilterDate;

    constructor(startFilerDate, endFilterDate) {
        if (startFilerDate !== null) {
            this.isStartFilter = true;
            this.startFilterDate = moment.utc(startFilerDate).format('MMM DD, YYYY');
        }
        else {
            this.isStartFilter = false;
            this.startFilterDate = null;
        }

        if (endFilterDate !== null) {
            this.isEndFilter = true;
            this.endFilterDate = moment.utc(endFilterDate).format('MMM DD, YYYY');
        }
        else {
            this.isEndFilter = false;
            this.endFilterDate = null;
        }
    }
}

export default TxFilter;