import _ from 'lodash';

declare global {
    // Example global constant for libraries served via webpack externals. example webpack config:: externals: { _: 'lodash' }
    // This assumes lodash was already load in DOM for example in <head> via CDN link before main.js is loaded.
    const _: typeof _;
}