import instance from './http';

function queryOrder(url) {
    return instance.get(url);
}
function payOrder(url,data) {
    return instance.put(url,data);
}


export {queryOrder,payOrder,}