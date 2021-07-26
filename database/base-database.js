const fs = require("fs");
const flatted = require("flatted");

class BaseDatabase {
  constructor(model) {
    this.model = model;
    this.filename = model.name.toLowerCase();
  }

  save(objects) {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        `${__dirname}/${this.filename}.json`,
        flatted.stringify(objects, null, 2),
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  }

  load() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        `${__dirname}/${this.filename}.json`,
        "utf-8",
        (err, file) => {
          if (err) return reject(err);
          const objects = flatted.parse(file);
          resolve(objects.map(this.model.create));
        }
      );
    });
  }

  async insert(object) {
    const objects = await this.load();

    if (!(object instanceof this.model)) {
      object = this.model.create(object);
    }
    await this.save(objects.concat(object));
    return object;
  }

  async remove(index) {
    const objects = await this.load();
    objects.splice(index, 1);
    return this.save(objects);
  }

  async removeBy(property, value) {
    const objects = await this.load();
    const index = objects.findIndex((o) => o[property] === value);
    objects.splice(index, 1);
    return this.save(objects);
  }

  async removeByName(name) {
    const objects = await this.load();
    const index = objects.findIndex((o) => o.name === name);
    objects.splice(index, 1);
    return this.save(objects);
  }

  async findByName(name) {
    const objects = await this.load();
    return objects.find((o) => o.name === name);
  }

  async update(object) {
    const objects = await this.load();
    const index = objects.findIndex((o) => o.id === object.id);
    objects.splice(index, 1, object);
    return this.save(objects);
  }

  async findBy(property, value) {
    const objects = await this.load();
    return objects.find((o) => o[property] === value);
  }
}

module.exports = BaseDatabase;
