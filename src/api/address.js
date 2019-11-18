import instance from './http';

function queryAddress(url) {
    return instance.get(url);
}

export {queryAddress}