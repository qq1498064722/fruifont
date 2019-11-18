import instance from './http'
//register
function addCart(url,data) {
    return instance.post(url,data);
}
function getCart(url) {
    return instance.get(url);
}
function reduceCart(url,data) {
    return instance.post(url,data);
}
function toggleGoodsStatus(url,obj) {
    return instance.put(url,obj);
}
function insertOrder(url) {
    return instance.post(url);
}
// async function insertOrder(url) {
//     let result = await instance.post(url);
//      return result
// }

export {addCart,getCart,reduceCart,toggleGoodsStatus,insertOrder}