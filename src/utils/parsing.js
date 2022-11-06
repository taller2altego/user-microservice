const parseRoleId = res => {
  const roles = ['superadmin', 'admin', 'user', 'driver'];
  const response = { ...res, role: roles[res.roleId - 1] };
  delete response.roleId;
  return response;
}

const parseRole = (req, res, next) => {
  const roles = {
    superadmin: 1,
    admin: 2,
    user: 3,
    driver: 4
  };
  req.body.roleId = roles[req.body.role];
  delete req.body.role;
  next();
};

module.exports = { parseRoleId, parseRole };