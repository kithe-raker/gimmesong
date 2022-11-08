class PlayerError extends Error {
  constructor({ code, message }) {
    super(message);
    this.name = "PlayerError";
    this.code = code;
  }
}

class StreamingError extends Error {
  constructor({ code, message }) {
    super(message);
    this.name = "StreamingError";
    this.code = code;
  }
}

export { PlayerError, StreamingError };
