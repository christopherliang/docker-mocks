const Router = require("koa-router");
const transactionControllers = require("../controllers/transactions");
const prefixPath = '/rest/ecommerce/';

const {
    r81,
    r83,
    r8t,
    r8c,
    r8r
} = transactionControllers;

const router = new Router({ prefix: prefixPath });

router.post("r81", r81);
router.post("r83", r83);
router.post("r8t", r8t);
router.post("r8c", r8c);
router.post("r8r", r8r);

module.exports = router;