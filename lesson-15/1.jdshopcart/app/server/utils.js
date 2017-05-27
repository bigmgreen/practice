var uuidV1 = require('uuid/v1');
module.exports = function (goodsData, recommendList, cartData) {

    return {
        /**
         * 查询商品信息
         * @param shopId 店铺id
         * @param id 商品id
         * @param data 数据源
         */
        query: function (shopId, id, data) {
            var _data = JSON.parse(JSON.stringify(data));
            var temp = null;
            _data.forEach(function (item) {
                if (item.shopId == shopId) {
                    item.item.forEach(function (_item) {
                        if (_item.id == id) {
                            _item.shopId = shopId;
                            temp = _item;
                        }
                    });
                }
            });
            return temp;
        },

        /**
         * 更新或者编辑商品信息
         * @param shopId 店铺id
         * @param id 商品id
         * @param data 数据源
         * @param goods 新数据
         * @param isUpdate 操作类型
         */
        save: function (shopId, id, data, goods, isUpdate) {
            goodsData.forEach(function (item) {
                if (item.shopId == shopId) {
                    var isFind = false;
                    data.forEach(function (cart) {
                        if (cart.shopId == shopId) {
                            cart.item.forEach(function (_item, index) {
                                if (_item.id == id) {

                                    if (isUpdate) {
                                        cart.item[index] = goods;
                                    } else {
                                        var isColorSame = (_item.specifications[0] == goods.specifications[0]);
                                        var isVersionSame = (_item.specifications[1] == goods.specifications[1]);
                                        if (isColorSame && isVersionSame) {
                                            cart.item[index].count += goods.count;
                                        } else {
                                            goods.id = uuidV1();
                                            cart.item.push(goods);
                                        }
                                    }

                                }
                            });
                            isFind = true;
                        }
                    });

                    if (!isFind) {
                        var tempItem = JSON.parse(JSON.stringify(item));
                        tempItem.item = [];
                        item.item.forEach(function (_item) {
                            if (_item.id == id) {
                                tempItem.item.push(goods);
                            }
                        });
                        data.push(tempItem);
                    }
                }
            });

            return data;
        },

        /**
         * 删除操作
         * @param ids 需要删除的id集合
         */
        del: function (ids) {
            cartData.forEach(function (item, index) {
                var temp = item.item;
                temp.forEach(function (_item, _index) {
                    ids.forEach(function (id) {
                        if (id == _item.id) {
                            temp.splice(_index, 1);

                            if (temp.length == 0) {
                                cartData.splice(index, 1);
                            }
                        }
                    });
                });
            });
            return cartData;
        }
    };
};