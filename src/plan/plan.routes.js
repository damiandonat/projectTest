/*
* Node Modules
*/
const debug = require('debug')('Project::ProductRoute');
const express = require('express');
const router = express.Router();
const moment = require('moment');
const sanitize = require('mongo-sanitize');
const _ = require('underscore');

/*
* Models
*/
const Plan = require('./plan.schema');

/*
* Utils
* libraries
* module tpv
*/
const functionLibrary = require('./function.library');

/*
* Config
*/
const ymConfig = require('../config/config');

/*
* Endpoints api rest json
*/
router.post('/plan', function (req, res) {

  if (req.body.id) {
    functionLibrary.plan(req.body.id)
    .then((p) => {

      if (p) {


        res.status(200);
        res.send( { error: false, message: p } );
        return;
      }

      res.status(404);
      res.send( { error: false, message: 'No se ha encontrado la tarfia' } );
      return;
    })
    .catch((e) => {
      res.status(500);
      res.send( { error: true, message: e.toString() } );
      return;
    });
  }else {
    functionLibrary.listPlan()
    .then((p) => {

      if (p) {
        res.status(200);
        res.send( { error: false, message: p } );
        return;
      }

      res.status(404);
      res.send( { error: false, message: 'No se han encontrado tarfias' } );
      return;
    })
    .catch((e) => {
      res.status(500);
      res.send( { error: true, message: e.toString() } );
      return;
    });
  }

});

router.post('/budget', function (req, res) {

  /*
  * receives and order that contains the customer information name, surname, and email
  */
  functionLibrary.validateBudgetCustomer(req.body)
  .then((budget) => {
    functionLibrary.multiplePlan(budget.idPhone)
    .then((p) => {

      debug('------------------');
      debug(p);

      if (!p || !Array.isArray(p)) {
        debug('Phone(s) not found');
        res.status(404);
        res.send( { error: true, message: 'Phone(s) not found' } );
        return;
      }

      let total = 0;
      _.map(p, function(phone){
        return total += phone.price;
      });

      let object = {};
      object.total = total;
      object.phone = p;
      object.name = budget.name;
      object.surname = budget.surname;
      object.email = budget.email;

      res.status(200);
      res.send( { error: false, message: object } );
      return;

    })
    .catch((e) => {
      res.status(500);
      res.send( { error: true, message: e.toString() } );
      return;
    });
  })
  .catch((e) => {
    res.status(500);
    res.send( { error: true, message: e.toString() } );
    return;
  });

});

// router.post('/add', function (req, res) {
//
//   functionLibrary.validate(req.body)
//   .then((success) => {
//
//     let plan = new Plan( {
//       name: success.name,
//       description: success.description,
//       price: success.price,
//       img: success.img,
//     } )
//
//     plan.save()
//     .then((p) => {
//       res.status(200);
//       res.send( { error: false, message: p } );
//     })
//     .catch((e) => {
//       res.status(500);
//       res.send( { error: true, message: e.toString() } );
//     });
//   })
//   .catch((e) => {
//
//   });
//
// });

module.exports = router;
