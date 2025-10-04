const { setdb } = require("./pg");

async function initCollections() {
  const db = setdb();

  const collections = await db.listCollections().toArray();
  const names = collections.map(c => c.name);

  if (!names.includes("User")) {
    await db.createCollection("User");
    console.log("User collection created");
  }

  if (!names.includes("Book")) {
    await db.createCollection("Book");
    console.log("Book collection created");
  }

  if (!names.includes("Review")) {
    await db.createCollection("Review");
    console.log("Review collection created");
  }
}

module.exports = { initCollections };
