// controllers
const validateReport = require('../controller/reports/ReportValidate');
const reportController = require('../controller/reports/ReportController');

// utils
const { parseRole } = require('../utils/parsing');
const restrictToAdmin = require('../utils/restrictToAdmin');
const logger = require('../../winston');

// modules
const router = require('express').Router();

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
  router.get('/', logInput, reportController.getAllReports, handlerResponse);
  router.post('/', logInput, validateReport, reportController.createReport, handlerResponse);
};
