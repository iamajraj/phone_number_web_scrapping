const { parentPort } = require("node:worker_threads");
const axios = require("axios");
const cheerio = require("cheerio");

const getNumbers = async () => {
    const response = await axios.get("https://receive-smss.com/");

    const html = response.data;

    const $ = cheerio.load(html);

    const numbers = [];

    $(".number-boxes-item .number-boxes-itemm-number").each((i, el) => {
        numbers.push(el.children[0].data);
    });

    parentPort.postMessage(numbers);
};

getNumbers();
