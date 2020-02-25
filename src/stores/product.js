import { observable, configure, action, computed } from 'mobx';
import util from '../lib/util';

configure({ enforceActions: 'always' });

class ProductStore {
    @observable limit = 10;

    @observable products = [];

    @observable query = {};

    @observable articleno = '';

    @action
    updateTotal(total) {
        this.total = total;
    }

    @action
    updateArticleno(articleno) {
        this.articleno = articleno;
    }

    @action
    update(products) {
        this.products = products;
    }

    @action
    updateQuery(key, val) {
        if (typeof key === 'object') {
            this.query = key;
        } else {
            this.query[key] = val;
        }
    }

    async load(inputQuery = {}) {
        const finalQuery = {
            ...this.query,
            ...inputQuery,
        };
        finalQuery.extendedView = 1;
        finalQuery.limit = this.limit;

        // Set to empty to get a better navigation feeling.
        const response = await util.fetchApi(`/api/products/consumer/${this.articleno}`, { publish: true }, finalQuery);
        if (response.status === 200) {
            this.updateTotal(response.total);
            this.update(response.data);
        }
    }
}

// autorun(() => {
//         // Assuming that profile.asJson returns an observable Json representation of profile,
//         // send it to the server each time it is changed, but await at least 300 milliseconds before sending it.
//         // When sent, the latest value of profile.asJson will be used.
//         this.load();
//     }, { delay: 300 });

const store = new ProductStore();
export default store;
