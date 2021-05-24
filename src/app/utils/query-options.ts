import * as moment from 'moment';

export interface QueryBuilder {
    toQueryMap: () => Map<string, string>;
    toQueryString: () => string;
}

export class QueryOptions implements QueryBuilder {
    public query!: {
        [key: string]: any
    };

    constructor() {}

    toQueryMap(): Map<string, string> {
        const queryMap = new Map<string, string>();
        if (this.query) {
            Object.keys(this.query).forEach(key => {
                queryMap.set(key, this.query[key]);
            });
        }
        return queryMap;
    }

    toQueryString(): string {
        let queryString = '';
        let index = 0;
        this.toQueryMap().forEach((value: any, key: string) => {
            if (value instanceof Date) {
                value = moment(value).format('YYYY-MM-DD');
            }
            if (value !== null && value !== 'null') {
                queryString = queryString.concat(`${index === 0 ? '?' : ''}${key}=${value}&`);
            }
            index++;
        });

        return queryString.substring(0, queryString.length - 1);
    }
}
