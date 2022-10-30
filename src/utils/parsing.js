const parseRoleId = res => {
  const roles = ['superadmin', 'admin', 'user', 'driver'];
  const response = { ...res, role: roles[res.roleId - 1] };
  delete response.roleId;
  return response;
}

const isSuperadmin = id => {
  return id === 1;
}

const parseRole = (req, res, next) => {
  const roles = {
    superadmin: 1,
    admin: 2,
    driver: 3,
    user: 4
  };
  req.body.roleId = roles[req.body.role];
  delete req.body.role;
  next();
};

module.exports = { parseRoleId, parseRole, isSuperadmin };