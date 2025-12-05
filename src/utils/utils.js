const fs = require("fs");

const saveToDatabase = (DB) => {
  fs.writeFileSync("./src/database/db.json", JSON.stringify(DB, null, 2), {
    encoding: "utf8"
  })
}

function formatearFechaUS(fecha) {
  const [day, month, year] = fecha.split("/");
  return `${month}/${day}/${year}`;
}

module.exports = {
    saveToDatabase,
    formatearFechaUS
}