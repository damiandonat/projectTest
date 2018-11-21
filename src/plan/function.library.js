const debug = require('debug')("Project::functions.library");
const sanitize = require('mongo-sanitize');
const Plan = require('./plan.schema');

let method = {
  validate: function (params) {


    let promise = new Promise((resolve, reject) => {
      if (!params.name) {
        reject('check the name');
      }

      if (!params.description) {
        reject('check the description');
      }

      if (!params.price) {
        reject('check the price');
      }

      if (!params.img) {
        reject('check the img url');
      }

      let object = {
        name: sanitize(params.name),
        description: sanitize(params.description),
        price: sanitize(params.price),
        img: sanitize(params.img)
      }

      debug(object);
      resolve(object)
    })

    return promise;

  },
  listPlan: function () {

    let promise = new Promise((resolve, reject) => {
      Plan.find({})
      .then((p) => {
        resolve(p);
      })
      .catch((e) => {
        reject(e);
      });
    });

    return promise;
  },
  plan: function (id) {
    let promise = new Promise((resolve, reject) => {

      let idPlan = sanitize(id);

      Plan.findOne( { _id: idPlan } )
      .then((p) => {
        resolve(p);
      })
      .catch((e) => {
        reject(e);
      });
    });

    return promise;
  },
  validateBudgetCustomer: function (params) {
    let promise = new Promise((resolve, reject) => {
      if (!params.name) {
        reject('Check name');
      }

      if (!params.surname) {
        reject('Check surname');
      }

      if (!params.email) {
        reject('Check email');
      }

      if (!params.idPhone || !Array.isArray(params.idPhone) || params.idPhone.length <= 0) {
        reject('Check phone id');
      }

      let object = {
        name: sanitize(params.name),
        surname: sanitize(params.surname),
        email: sanitize(params.email),
        idPhone: sanitize(params.idPhone)
      }

      debug(object);
      resolve(object)
    })

    return promise;
  },
  multiplePlan: function (params) {

    let promise = new Promise((resolve, reject) => {

      Plan.find( { '_id': { $in: params} } )
      .then((p) => {
        resolve(p);
      })
      .catch((e) => {
        reject(e);
      });
    });

    return promise;

  }
}

module.exports = method;
