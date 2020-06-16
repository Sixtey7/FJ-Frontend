import DateHelper from './DateHelper';
class TxFilter {
    isStartFilter;
    isEndFilter;
    startFilterDate;
    endFilterDate;

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

    startFilterAsDate() {
        if (this.isStartFilter) {
            return new Date(this.startFilterDate);
        }
        else {
            return null;
        }
    }

    endFilterAsDate() {
        if (this.isEndFilter) {
            return new Date(this.endFilterDate);
        }
        else {
            return null;
        }
    }

    static fromJSON(json) {
        return Object.assign(this, json);
    }
}

export default TxFilter;