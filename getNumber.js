const axios = require("axios");
const cheerio = require("cheerio");

const BASE_URL = "https://receive-smss.com/";

module.exports.getNumber = async (number) => {
    const response = await axios.get(`${BASE_URL}sms/${number}`);
    const html = response.data;
    const $ = cheerio.load(html);

    const from = [];
    const time = [];
    $(".table.table-bordered.wrptable.tbdif tbody tr").each((i, el) => {
        el.children.forEach((ch) => {
            if (ch.tagName === "td") {
                if (ch.children.length === 1 && ch.children[0].type == "text") {
                    from.push(ch.children[0].data);
                }
                if (ch.children.length === 2) {
                    ch.children.forEach((c) => {
                        if (c.name === "span") {
                            time.push(c.children[0].data);
                        }
                    });
                }

                // not implemented the message scrapping yet cuz the website that I chose is sooooo messy
            }
        });
    });

    return [from, time];

    // console.log(from);
    // console.log(time);
};
