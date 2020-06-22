import DateHelper from './DateHelper';
/**
 * Class used to hold the details of a filter applied to Transactions
 */
class TxFilter {
    isStartFilter;
    isEndFilter;
    startFilterDate;
    endFilterDate;

    /**
     * 
     * @param {Date} startFilerDate the start of the filter (null if none)
     * @param {Date} endFilterDate the end of the filter (null if none)
     */
    constructor(startFilerDate, endFilterDate) {
        if (startFilerDate !== null) {
            this.isStartFilter = true;
            this.startFilterDate = DateHelper.formatDateForUI(startFilerDate);
        }
        else {
            this.isStartFilter = false;
            this.startFilterDate = null;
        }

        if (endFilterDate !== null) {
            this.isEndFilter = true;
            this.endFilterDate = DateHelper.formatDateForUI(endFilterDate);
        }
        else {
            this.isEndFilter = false;
            this.endFilterDate = null;
        }
    }

    /**
     * Returns the start filter the user has applied as a Date object (null if none)
     */
    startFilterAsDate() {
        if (this.isStartFilter) {
            return new Date(this.startFilterDate);
        }
        else {
            return null;
        }
    }

    /**
     * Returns the end filter the user has applied as a Date object (null if none)
     */
    endFilterAsDate() {
        if (this.isEndFilter) {
            return new Date(this.endFilterDate);
        }
        else {
            return null;
        }
    }

    /**
     * Constructs a TxFilter object out of the provided string
     * @param {String} json the TxFilter object as a json string
     */
    static fromJSON(json) {
        return Object.assign(this, json);
    }
}

export default TxFilter;