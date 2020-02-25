import { h, Component } from 'preact';
import { observer } from 'mobx-preact';

import util from '../../lib/util';
import style from './style.css';

const initialState = {};

@observer
class Frontpage extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.startup();
    }

    async startup() {
        const { articleno } = this.props;
        const { appState, productStore } = this.props.stores;
        await appState.loadFingerprint();
        productStore.addProductArticleno(articleno);
    }

    render() {
        const { productStore } = this.props.stores;
        const prod = productStore.getProduct(this.props.articleno);
        return (
            <div>
                <div>
                    <strong>
                        {this.props.prefix}
                    </strong> {util.getStockBadge(prod.availability, style, prod.preSaleDiscontinued)}
                </div>
            </div>
        );
    }
}

export default Frontpage;
