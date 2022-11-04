const ReportRepository = require('../repository/ReportRepository');

class ReportService {
  findAllReports() {
    return ReportRepository.findAll();
  }

  createReport(body) {
    return ReportRepository.createReport(body);
  }
}

module.exports = new ReportService();