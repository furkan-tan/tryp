const fs = require("fs");
const flatted = require("flatted");

class BaseDatabase {
  constructor(model) {
    this.model = model;
    this.filename = model.name.toLowerCase();
  }

  save(objects) {
    fs.writeFileSync(
      `./${this.filename}.json`,
      flatted.stringify(objects, null, 2)
    );
  }

  load() {
    const file = fs.readFileSync(`./${this.filename}.json`, "utf-8");
    let objects = flatted.parse(file);
    return objects.map(this.model.create);
  }

  insert(object) {
    const objects = this.load();
    this.save(objects.concat(object));
  }

  remove(index) {
    const objects = this.load();
    objects.splice(index, 1);
    this.save(objects);
  }

  removeByName(name) {
    const objects = this.load();
    const index = objects.findIndex((o) => o.name === name);
    objects.splice(index, 1);
    this.save(objects);
  }

  findByName(name) {
    const objects = this.load();
    return objects.find((o) => o.name === name);
  }

  update(object) {
    const objects = this.load();
    const index = objects.findIndex((o) => o.id === object.id);
    objects.splice(index, 1, object);
    this.save(objects);
  }
}

module.exports = BaseDatabase;
