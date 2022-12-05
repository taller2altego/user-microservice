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
    res.status(statusCode).send(otherFields);
  };

  const logInput = (req, res, next) => {
    logger.info(JSON.stringify(req.body, undefined, 2));
    logger.info(JSON.stringify(req.query, undefined, 2));
    next();
  };

  app.use('/reports', router);
  router.post('/', logInput, validateReport, reportController.createReport, handlerResponse);
};
