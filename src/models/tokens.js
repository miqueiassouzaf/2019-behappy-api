import JWT from "jsonwebtoken";

class Token {
  static secret = "NeverShareYourSecret";
  static data = new Map();

  static add(user, expiration = "24h") {
    const token = JWT.sign(user, Token.secret, { expiresIn: expiration });
    Token.data.set(user.email, token);
    return token;
  }

  static rm(user) {
    const token = Token.data.delete(user.email);
    return token;
  }

  static remove(user) {
    Token.rm(user);
  }

  static findByUser(user) {
    return Token.data.get(user.email);
  }
}

export default Token;
