import { observable, configure, action, computed, autorun } from 'mobx';
import util from '../lib/util';

configure({ enforceActions: 'always' });

class AppState {
    constructor() {
        this.setView(util.getObject('view'));
    }

    @observable view = {};

    @observable counter = util.get('counter');

    @observable fingerprint = {};

    @action
    setView(view) {
        this.view = view;
        util.setObject('view', view);
    }

    @action
    setViewKey(key, value) {
        this.view[key] = value;
    }

    @action
    updateFingerprint(fingerprint) {
        this.fingerprint = fingerprint;
    }

    async loadFingerprint() {
        const fingerprint = util.getObject('fingerprint');
        const jwtToken = util.getJwtToken();
        if (!fingerprint || !jwtToken) {
            // Set to empty to get a better navigation feeling.
            const response = await util.fetchApi(`/api/fingerprint/`, { publish: false });
            if (response.status === 200) {
                this.updateFingerprint(response);
                util.setObject('fingerprint', response);
                util.setJwtToken(this.fingerprint.jwtToken);
            }
        }
    }
}

const store = new AppState();
export default store;
