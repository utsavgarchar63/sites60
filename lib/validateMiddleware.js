export default function validateMiddleware(validations, validationResult) {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // console.log("Errors>>>>", errors);

    res.status(422).json({ errors: errors.array() });
  };
}
