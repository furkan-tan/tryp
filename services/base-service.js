const fs = require("fs");
const flatted = require("flatted");

class BaseService {
  constructor(model) {
    this.model = model;
  }

  save(objects) {
    return this.model.insertMany(objects);
  }

  load() {
    return this.model.find({});
  }

  async insert(object) {
    return await this.model.create(object);
  }

  async removeBy(property, value) {
    return this.model.deleteOne({ [property]: value });
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

  async find(id) {
    return this.model.findById(id);
  }

  async query(obj) {
    return this.model.find(obj);
  }

  async update(id, object) {
    return this.model.findByIdAndUpdate(id, object);
  }

  async findBy(property, value) {
    return this.model.find({ [property]: value });
  }
}

module.exports = BaseService;
