const logger = require('../../../winston');
const ReportService = require('../../service/ReportService');
const handlerError = require('../../utils/handlerError');

class ReportController {
  async createReport(req, res, next) {
    return ReportService.createReport(req.body)
      .then(() => {
        res.customResponse = { statusCode: 200 };
        next();
      })
      .catch(err => {
        logger.error(JSON.stringify(err, undefined, 2));
        res.customResponse = handlerError(err);
        next();
      });
  }
}

module.exports = new ReportController();