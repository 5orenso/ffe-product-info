import { observable, configure, action, computed } from 'mobx';
import util from '../lib/util';

configure({ enforceActions: 'always' });

class ProductStore {
    @observable limit = 500;

    @observable httpStatus;

    @observable productRef = {};

    @observable product = {};

    @observable products = [];

    @observable articleno = '';

    @observable articlenos = [];

    getProduct(articleno) {
        return this.products.find(e => e.articleno === articleno) || {};
    }

    @action
    updateTotal(total) {
        this.total = total;
    }

    @action
    updateHttpStatus(httpStatus) {
        this.httpStatus = httpStatus;
    }

    @action
    update(products) {
        const productsForInsertion = products.filter(p => this.products.findIndex(e => e.articleno !== p.articleno));
        this.products = this.products.concat(productsForInsertion);
    }

    @action
    addProductArticleno(articleno) {
        this.articlenos.push(articleno);
        clearTimeout(this.loadTimer);
        this.loadTimer = setTimeout(() => this.load(), 500);
    }

    async load() {
        // if (inputQuery.articleno && this.productRef[inputQuery.articleno]) {
        //     return this.productRef[inputQuery.articleno];
        // }

        // Set to empty to get a better navigation feeling.
        const response = await util.fetchApi('/api/products/consumer/',
            { publish: false, method: 'POST' },
            {
                limit: this.limit,
                articlenoin: this.articlenos,
            });
        if (response.status === 200) {
            this.updateTotal(response.total);
            this.update(response.data);
            return response.data[0];
        }
        this.updateHttpStatus(response.status);
        return undefined;
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
