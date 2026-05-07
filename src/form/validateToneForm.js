const {
  ALLOWED_VALUES,
  MVP_CHAIN,
  NUMERIC_RANGES,
  REQUIRED_FIELDS,
  REQUIRED_FIELD_SET,
  TEXT_FIELDS,
  YES_NO_FIELDS,
} = require("./toneFormContract");
const { ToneFormError } = require("./ToneFormError");

function validateToneForm(parsedForm) {
  if (!parsedForm || typeof parsedForm !== "object" || Array.isArray(parsedForm)) {
    throw new ToneFormError("Nao consegui validar o formulario: os campos recebidos nao formam um objeto valido.");
  }

  const normalizedForm = {};

  validateUnknownFields(parsedForm);
  validateRequiredFields(parsedForm);
  validateTextFields(parsedForm, normalizedForm);
  validateYesNoFields(parsedForm, normalizedForm);
  validateAllowedValues(parsedForm, normalizedForm);
  validateChain(parsedForm, normalizedForm);
  validateNumericRanges(parsedForm, normalizedForm);

  return orderByContract(normalizedForm);
}

function validateUnknownFields(parsedForm) {
  const unknownFields = Object.keys(parsedForm).filter((field) => !REQUIRED_FIELD_SET.has(field));

  if (unknownFields.length > 0) {
    throw new ToneFormError(
      `O formulario tem campo desconhecido: ${unknownFields.join(", ")}. Remova esse campo ou confira o nome no contrato GT1_TONE_FORM_V0_1.`,
      { fields: unknownFields }
    );
  }
}

function validateRequiredFields(parsedForm) {
  const missingFields = REQUIRED_FIELDS.filter((field) => !Object.prototype.hasOwnProperty.call(parsedForm, field));

  if (missingFields.length > 0) {
    throw new ToneFormError(
      `O formulario esta incompleto. Campo obrigatorio ausente: ${missingFields.join(", ")}.`,
      { fields: missingFields }
    );
  }
}

function validateTextFields(parsedForm, normalizedForm) {
  TEXT_FIELDS.forEach((field) => {
    const value = parsedForm[field];

    if (value === "") {
      throw new ToneFormError(
        `O campo ${field} nao pode ficar vazio. Preencha com um texto curto; use UNKNOWN ou GENERAL quando o contrato permitir.`,
        { field }
      );
    }

    normalizedForm[field] = value;
  });
}

function validateYesNoFields(parsedForm, normalizedForm) {
  YES_NO_FIELDS.forEach((field) => {
    const value = parsedForm[field];

    if (value !== "YES" && value !== "NO") {
      throw new ToneFormError(
        `O campo ${field} deve usar somente YES ou NO. Valor recebido: "${value}".`,
        { field, value }
      );
    }

    normalizedForm[field] = value;
  });
}

function validateAllowedValues(parsedForm, normalizedForm) {
  Object.entries(ALLOWED_VALUES).forEach(([field, allowedValues]) => {
    const value = parsedForm[field];

    if (!allowedValues.includes(value)) {
      throw new ToneFormError(
        `O campo ${field} tem um valor nao permitido: "${value}". Valores aceitos: ${allowedValues.join(", ")}.`,
        { field, value, allowedValues }
      );
    }

    normalizedForm[field] = value;
  });
}

function validateChain(parsedForm, normalizedForm) {
  if (parsedForm.CHAIN !== MVP_CHAIN) {
    throw new ToneFormError(
      `O campo CHAIN deve ser exatamente "${MVP_CHAIN}" neste MVP. Valor recebido: "${parsedForm.CHAIN}".`,
      { field: "CHAIN", value: parsedForm.CHAIN }
    );
  }

  normalizedForm.CHAIN = parsedForm.CHAIN;
}

function validateNumericRanges(parsedForm, normalizedForm) {
  Object.entries(NUMERIC_RANGES).forEach(([field, range]) => {
    const rawValue = parsedForm[field];

    if (rawValue === "") {
      throw new ToneFormError(
        `O campo ${field} nao pode ficar vazio. Ele precisa ser um numero entre ${range.min} e ${range.max}.`,
        { field }
      );
    }

    const value = Number(rawValue);

    if (!Number.isFinite(value)) {
      throw new ToneFormError(
        `O campo ${field} precisa ser um numero simples entre ${range.min} e ${range.max}. Valor recebido: "${rawValue}".`,
        { field, value: rawValue }
      );
    }

    if (range.integer && !Number.isInteger(value)) {
      throw new ToneFormError(
        `O campo ${field} precisa ser um numero inteiro entre ${range.min} e ${range.max}. Valor recebido: "${rawValue}".`,
        { field, value: rawValue }
      );
    }

    if (value < range.min || value > range.max) {
      throw new ToneFormError(
        `O campo ${field} esta fora do range permitido. Use um valor de ${range.min} a ${range.max}; recebido: ${rawValue}.`,
        { field, value, min: range.min, max: range.max }
      );
    }

    normalizedForm[field] = value;
  });
}

function orderByContract(normalizedForm) {
  const orderedForm = {};

  REQUIRED_FIELDS.forEach((field) => {
    orderedForm[field] = normalizedForm[field];
  });

  return orderedForm;
}

module.exports = {
  validateToneForm,
};
