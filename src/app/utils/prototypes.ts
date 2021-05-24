// tslint:disable:no-string-literal
import * as moment from 'moment';

export class Prototypes {
    static init(): void {
        String.prototype['toDate'] = function(): Date {
            if (!this) { return null; }
            let format = '';
            if (this.indexOf('/') !== -1) {
                format = 'DD/MM/YYYY';
            } else if (this.indexOf('-') !== -1) {
                format = 'YYYY-MM-DD';
            }

            try {
                return moment(this, format).toDate();
            } catch (e) {
                return null;
            }
        };

        String.prototype['toDateTime'] = function(): Date {
            if (!this) { return null; }
            let format = '';
            if (this.indexOf('/') !== -1) {
                format = 'DD/MM/YYYY hh:mm:ss';
            } else if (this.indexOf('-') !== -1) {
                format = 'YYYY-MM-DD hh:mm:ss';
            }

            try {
                return moment(this, format).toDate();
            } catch (e) {
                return null;
            }
        };
    }
}
