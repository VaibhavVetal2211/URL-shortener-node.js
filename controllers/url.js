const express = require("express");
const {nanoid }= require("nanoid");

const URL = require("../models/url");


async function handleGenerateNewShortURL(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error:"URL not provided"});
    const shortID = nanoid(8);
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],

        createdBy : req.user._id,
    });
    return res.render("home",{
        id:shortID,
    });
   
}

async function handleRedirectOriginal(req,res) {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate({shortId},
         {
             $push:{
             visitHistory:{
                 timestamp: Date.now(),
             },
     },
         }
     );
     res.redirect(entry.redirectURL)
}

async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId;

    const result = await URL.findOne({shortId});

    return res.json({totalClicks:result.visitHistory.length , analystics:result.visitHistory});
}

module.exports = {
    handleGenerateNewShortURL,
    handleRedirectOriginal,
    handleGetAnalytics,
};