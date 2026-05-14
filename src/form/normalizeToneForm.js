const {
  ALLOWED_VALUES,
  MVP_CHAIN,
  NUMERIC_RANGES,
  REQUIRED_FIELD_SET,
  TEXT_FIELDS,
  YES_NO_FIELD_SET,
} = require("./toneFormContract");
const { ToneFormError } = require("./ToneFormError");

const TEXT_FIELD_SET = new Set(TEXT_FIELDS);

const DEFAULT_VALUES = {
  GUITARIST: "UNKNOWN",
  BAND: "UNKNOWN",
  SONG: "GENERAL",
  ALBUM_OR_ERA: "GENERAL",
  CONFIDENCE: "0.50",
  CHAIN: MVP_CHAIN,
  COMP_ON: "NO",
  COMP_TYPE: "BOSS",
  COMP_SUSTAIN: "0",
  COMP_ATTACK: "50",
  COMP_TONE: "0",
  COMP_LEVEL: "50",
  OD_DS_ON: "NO",
  OD_DS_TYPE: "OD-1",
  OD_DS_DRIVE: "0",
  OD_DS_TONE: "0",
  OD_DS_BOTTOM: "0",
  OD_DS_EFFECT_LEVEL: "0",
  OD_DS_DIRECT_LEVEL: "0",
  PREAMP_ON: "YES",
  PREAMP_TYPE: "NATURAL CLEAN",
  PREAMP_GAIN: "35",
  PREAMP_LEVEL: "50",
  PREAMP_BASS: "50",
  PREAMP_MIDDLE: "50",
  PREAMP_TREBLE: "50",
  PREAMP_PRESENCE: "50",
  PREAMP_BRIGHT: "OFF",
  NS_ON: "YES",
  NS_THRESHOLD: "30",
  NS_RELEASE: "30",
  EQ_ON: "NO",
  EQ_LOW: "0",
  EQ_MID: "0",
  EQ_HIGH: "0",
  DELAY_ON: "NO",
  DELAY_TYPE: "STANDARD",
  DELAY_TIME: "380",
  DELAY_FEEDBACK: "20",
  DELAY_LEVEL: "0",
  REVERB_ON: "YES",
  REVERB_TYPE: "ROOM",
  REVERB_TIME: "1.2",
  REVERB_LEVEL: "15",
  MASTER_LEVEL: "80",
  NOTES: "Patch gerado como base para ajuste fino.",
};

const TONE_TYPE_ALIASES = {
  RHYTHM: "base",
  RITMO: "base",
  BASE: "base",
  LEAD: "lead",
  SOLO: "solo",
  CRUNCH: "crunch",
  CLEAN: "clean",
  LIMPO: "clean",
  METAL: "metal",
  ROCK: "rock",
  FUZZ: "fuzz",
  OUTRO: "outro",
  OTHER: "outro",
};

function normalizeToneForm(parsedForm) {
  if (!parsedForm || typeof parsedForm !== "object" || Array.isArray(parsedForm)) {
    throw new ToneFormError("Nao consegui normalizar o formulario: os campos recebidos nao formam um objeto valido.");
  }

  const formWithNormalizedFields = normalizeFieldNames(parsedForm);
  applyDefaultsToBlankFields(formWithNormalizedFields);

  const normalizedForm = {};

  Object.entries(formWithNormalizedFields).forEach(([field, value]) => {
    normalizedForm[field] = normalizeFieldValue(field, value);
  });

  return normalizedForm;
}

function normalizeFieldNames(parsedForm) {
  const normalizedForm = {};

  Object.entries(parsedForm).forEach(([rawField, rawValue]) => {
    const field = String(rawField).trim().toUpperCase();

    if (Object.prototype.hasOwnProperty.call(normalizedForm, field)) {
      throw new ToneFormError(
        `O campo ${field} aparece mais de uma vez depois da normalizacao. Remova a duplicata para continuar.`,
        { field }
      );
    }

    normalizedForm[field] = normalizeRawValue(rawValue);
  });

  return normalizedForm;
}

function normalizeRawValue(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function applyDefaultsToBlankFields(form) {
  Object.entries(DEFAULT_VALUES).forEach(([field, value]) => {
    if (!REQUIRED_FIELD_SET.has(field)) {
      return;
    }

    if (Object.prototype.hasOwnProperty.call(form, field) && form[field] === "") {
      form[field] = value;
    }
  });
}

function normalizeFieldValue(field, value) {
  if (YES_NO_FIELD_SET.has(field)) {
    return normalizeYesNoValue(value);
  }

  if (field === "PREAMP_BRIGHT") {
    return normalizeOnOffValue(value);
  }

  if (field === "CHAIN") {
    return normalizeChainValue(value);
  }

  if (field === "TONE_TYPE") {
    return normalizeToneTypeValue(value);
  }

  if (Object.prototype.hasOwnProperty.call(ALLOWED_VALUES, field)) {
    return normalizeAllowedValue(field, value);
  }

  if (Object.prototype.hasOwnProperty.call(NUMERIC_RANGES, field)) {
    return normalizeNumericValue(field, value);
  }

  if (TEXT_FIELD_SET.has(field)) {
    return normalizeTextValue(value);
  }

  return value;
}

function normalizeYesNoValue(value) {
  const key = normalizeToken(value);

  if (["YES", "Y", "SIM", "S", "TRUE", "1", "ON", "LIGADO"].includes(key)) {
    return "YES";
  }

  if (["NO", "N", "NAO", "FALSE", "0", "OFF", "DESLIGADO"].includes(key)) {
    return "NO";
  }

  return value;
}

function normalizeOnOffValue(value) {
  const key = normalizeToken(value);

  if (["ON", "YES", "Y", "SIM", "S", "TRUE", "1", "LIGADO"].includes(key)) {
    return "ON";
  }

  if (["OFF", "NO", "N", "NAO", "FALSE", "0", "DESLIGADO"].includes(key)) {
    return "OFF";
  }

  return value;
}

function normalizeChainValue(value) {
  const parts = value.split(",").map((part) => normalizeChainToken(part));

  if (parts.join(",") === MVP_CHAIN) {
    return MVP_CHAIN;
  }

  return value;
}

function normalizeToneTypeValue(value) {
  const key = normalizeToken(value);

  if (Object.prototype.hasOwnProperty.call(TONE_TYPE_ALIASES, key)) {
    return TONE_TYPE_ALIASES[key];
  }

  return normalizeAllowedValue("TONE_TYPE", value);
}

function normalizeAllowedValue(field, value) {
  const allowedValues = ALLOWED_VALUES[field];
  const valueKey = normalizeEnumKey(value);
  const match = allowedValues.find((allowedValue) => normalizeEnumKey(allowedValue) === valueKey);

  return match || value;
}

function normalizeNumericValue(field, value) {
  const trimmedValue = value.trim();
  const percentMatch = trimmedValue.match(/^([+-]?\d+(?:[.,]\d+)?)\s*%$/);

  if (percentMatch) {
    const percentNumber = Number(normalizeDecimalSeparator(percentMatch[1]));

    if (Number.isFinite(percentNumber)) {
      if (field === "CONFIDENCE") {
        return formatNumberString(percentNumber / 100);
      }

      return formatNumberString(percentNumber);
    }
  }

  const unitMatch = trimmedValue.match(/^([+-]?\d+(?:[.,]\d+)?)\s*(ms|s|sec|seg|segundo|segundos|db|hz)$/i);

  if (unitMatch) {
    return normalizeDecimalSeparator(unitMatch[1]);
  }

  return normalizeDecimalSeparator(trimmedValue);
}

function normalizeTextValue(value) {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeDecimalSeparator(value) {
  if (/^[+-]?\d+,\d+$/.test(value)) {
    return value.replace(",", ".");
  }

  return value;
}

function formatNumberString(value) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(6)));
}

function normalizeToken(value) {
  return removeDiacritics(String(value))
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .toUpperCase();
}

function normalizeChainToken(value) {
  return removeDiacritics(String(value))
    .trim()
    .replace(/[\s-]+/g, "_")
    .toUpperCase();
}

function normalizeEnumKey(value) {
  return normalizeToken(value);
}

function removeDiacritics(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

module.exports = {
  DEFAULT_VALUES,
  normalizeToneForm,
};
