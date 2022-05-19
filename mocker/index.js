const delay = require("mocker-api/utils/delay");
const common = require("./common");
const isMock = process.env.IS_MOCK;

const proxy = {
    ...common,
};
module.exports = delay(proxy, 100);

/**
'GET /api/get': (req, res) => {
    const { id } = req.query;
    res.json({
        test: '牛',
        id: id || '没传ID啊',
    });
},
'POST /api/post': (req, res) => {
    const { id } = req.body;
    console.log(req);
    res.json({
        test: '牛',
        id: id || '没传ID啊',
    });
},

fetch('/api/get?id=123');

fetch('/api/post', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: 111 }),
});
*/
