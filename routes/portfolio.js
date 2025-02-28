const express = require("express");
const router = express.Router();

const portfolioItems = [
    { title: "專案 1", description: "這是專案 1 的簡介", link: "https://youtu.be/v01j28RecdQ?si=HZw49DKT_8Uf9CxA" },
    { title: "專案 2", description: "這是專案 2 的簡介", link: "https://youtu.be/3RILct-0ngI?si=wp_0POoDQeTcBvjS" },
    // { title: "專案 3", description: "這是專案 3 的簡介", link: "https://example.com/project3" }
];

router.get("/", (req, res) => {
    res.json(portfolioItems);
});

module.exports = router;