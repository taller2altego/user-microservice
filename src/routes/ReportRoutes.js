// modules
const router = require('express').Router();

// controllers
const validateReport = require('../controller/reports/ReportValidate');
const reportController = require('../controller/reports/ReportController');

// utils
const logger = require('../../winston');

module.exports = app => {
  const handlerResponse = (req, res) => {
    const { statusCode, ...otherFields } = res.customResponse;
    logger.info(`response: ${JSON.stringify(otherFields, undefined, 2)}`);
    res.status(statusCode).send(otherFields);
  };

  const logInput = (req, res, next) => {
    if (req.query) {
      logger.info(`query: ${JSON.stringify(req.query, undefined, 2)}`);
    }

    if (req.params) {
      logger.info(`params: ${JSON.stringify(req.params, undefined, 2)}`);
    }

    if (req.body) {
      logger.info(`body: ${JSON.stringify(req.body, undefined, 2)}`);
    }
    next();
  };

  app.use('/reports', router);
  router.post('/', logInput, validateReport, reportController.createReport, handlerResponse);
};
