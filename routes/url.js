const express = require("express");
const {handleGenerateNewShortURL,handleRedirectOriginal,handleGetAnalytics,} = require("../controllers/url");
const router = express.Router();

router
.route("/")
.post(handleGenerateNewShortURL);


router
.route("/:shortId")
.get(handleRedirectOriginal);

router
.route("/analytics/:shortId")
.get(handleGetAnalytics);



module.exports = router;