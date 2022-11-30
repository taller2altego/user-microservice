const ReportModel = require('../model/ReportModel');

class ReportRepository {
  constructor() { }

  createReport(body) {
    return ReportModel
      .create(body)
      .then(report => report.toJSON());
  }

  findAll() {
    return ReportModel
      .findAll()
      .then(reports => reports.map(report => report.toJSON()))
  }

  findAllByDriverId(driverId) {
    return ReportModel
      .findAll({ where: { driverId } })
      .then(reports => reports.map(report => report.toJSON()));
  }
}

module.exports = new ReportRepository();