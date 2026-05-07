class ToneFormError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = "ToneFormError";
    this.details = details;
  }
}

module.exports = {
  ToneFormError,
};
