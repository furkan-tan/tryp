const fs = require("fs");
const flatted = require("flatted");

const save = (filename, objects) => {
  fs.writeFileSync(`./${filename}.json`, flatted.stringify(objects, null, 2));
};

const load = (filename) => {
  const file = fs.readFileSync(`./${filename}.json`, "utf-8");
  return flatted.parse(file);
};

const insert = (filename, object) => {
  const objects = load(filename);
  save(filename, objects.concat(object));
};

const remove = (filename, index) => {
  const objects = load(filename);
  objects.splice(index, 1);
  save(filename, objects);
};

const removeByName = (filename, name) => {
  const objects = load(filename);
  return objects.findIndex((o) => o.name === name);
};

module.exports = { save, load, insert, remove };

/**
 * class BaseDatabase {
  save() {}

  load() {
      const file = fs.readFileSync(`${__dirname}/${this.filename}.json`,"utf-8");
    return file
  }
}
 */
