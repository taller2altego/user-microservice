class InvalidRequestor extends Error {
  constructor(message = 'Requestor should be superadmin', code = 401) {
    super();
    this.message = message;
    this.statusCode = code;
  }
}

class UserAlreadyExists extends Error {
  constructor(message = 'El usuario ya existe', code = 403) {
    super();
    this.message = message;
    this.statusCode = code;
  }
}

class UserNotFound extends Error {
  constructor(message = 'No se pudo encontrar el usuario solicitado.', code = 404) {
    super();
    this.message = message;
    this.statusCode = code;
  }
}

class WrongPassword extends Error {
  constructor(message = 'Email o contraseña erronea, intentar nuevamente.', code = 402) {
    super();
    this.message = message;
    this.statusCode = code;
  }
}

class UnableToMatchEmail extends Error {
  constructor(message = 'El email indicado no coincide con el email del usuario.', code = 402) {
    super();
    this.message = message;
    this.statusCode = code;
  }
}

module.exports = { InvalidRequestor, UserAlreadyExists, UserNotFound, WrongPassword, UnableToMatchEmail };