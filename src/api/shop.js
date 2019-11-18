import instance from './http';

function getGoods(url,data) {
    return instance.post(url,data);
}
// function getCart(url) {
//     return instance.get(url);
// }
export {getGoods}