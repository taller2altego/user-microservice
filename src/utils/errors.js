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

class BlockedAccount extends Error {
  constructor(message = 'La cuenta ha sido bloqueada', code = 403) {
    super();
    this.message = message;
    this.statusCode = code;
  }
}

class InsufficientFunds extends Error {
  constructor(message = 'No posee los fondos suficientes para realizar la extraccion.', code = 400) {
    super();
    this.message = message;
    this.statusCode = code;
  }
}


module.exports = { UserAlreadyExists, UserNotFound, WrongPassword, UnableToMatchEmail, BlockedAccount, InsufficientFunds };