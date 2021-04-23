const router = require("express").Router();
const Transaction = require("../models/transaction.js");

router.post("/api/transaction", ({ body }, res) => {
  Transaction.create(
    body,
    { new: true, runValidators: true }
  )
  .then((dbTransaction) => {
    if (!dbTransaction.ok) {
        // error processing
        throw 'Error';
    }
    return res.json(dbTransaction)
})
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post("/api/transaction/bulk", ({ body }, res) => {
  Transaction.insertMany(
    body,
    { new: true, runValidators: true }
  )
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.get("/api/transaction", (req, res) => {
  Transaction.find({}).sort(
    { date: -1 }
    // sort only takes one arg
    // { new: true, runValidators: true }
  )
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

module.exports = router;