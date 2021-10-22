const cheerio = require("cheerio");
const request = require("request-promise");
// const fs = require('fs-extra');
require("./connection");

const User = require("./User");

async function init() {
  const $ = await request({
    uri: "https://es.wikipedia.org/wiki/Anexo:Cuentas_de_Instagram_con_m%C3%A1s_seguidores",
    transform: (body) => cheerio.load(body),
  });

  $("table.wikitable tbody tr")
    .next()
    .each((i, e) => {
      if (!isNaN(parseInt($(e).find("td:first-of-type").text().trim()))) {
        const rank = $(e).find("td:first-of-type");
        const username = $(rank).next();
        const owner = $(username).next();
        const followers = $(owner).next();
        const occupation = $(followers).next();


        var user = new User({
          rank: parseInt(rank.text().trim()),
          username: username.text().trim(),
          owner: owner.text().trim(),
          followers: parseFloat(followers.text().trim()),
          occupation: occupation.text().trim(),
        });
        user.save();
      }
    });
}

init();
