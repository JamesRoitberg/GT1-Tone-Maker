const fs = require("fs");
const path = require("path");

const { ToneFormError } = require("../form/ToneFormError");

const DEFAULT_INTERNAL_DIR = path.join(__dirname, "..", "..", "internal");
const WINDOWS_RESERVED_NAMES = new Set([
  "CON",
  "PRN",
  "AUX",
  "NUL",
  "COM1",
  "COM2",
  "COM3",
  "COM4",
  "COM5",
  "COM6",
  "COM7",
  "COM8",
  "COM9",
  "LPT1",
  "LPT2",
  "LPT3",
  "LPT4",
  "LPT5",
  "LPT6",
  "LPT7",
  "LPT8",
  "LPT9",
]);

function writeInternalToneJson(validatedForm, options = {}) {
  if (!validatedForm || typeof validatedForm !== "object" || Array.isArray(validatedForm)) {
    throw new ToneFormError("Nao consegui salvar o JSON interno: o formulario validado nao e um objeto valido.");
  }

  const internalDir = options.internalDir || DEFAULT_INTERNAL_DIR;
  const baseName = options.baseName || validatedForm.PATCH_NAME || "tone-patch";
  const safeBaseName = createSafeFileBaseName(baseName);
  const filePath = options.overwrite
    ? path.join(internalDir, `${safeBaseName}.json`)
    : createUniqueFilePath(internalDir, safeBaseName);

  fs.mkdirSync(internalDir, { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(validatedForm, null, 2)}\n`, "utf8");

  return {
    fileName: path.basename(filePath),
    filePath,
  };
}

function createUniqueFilePath(internalDir, safeBaseName) {
  let attempt = 1;

  while (true) {
    const suffix = attempt === 1 ? "" : `-${attempt}`;
    const filePath = path.join(internalDir, `${safeBaseName}${suffix}.json`);

    if (!fs.existsSync(filePath)) {
      return filePath;
    }

    attempt += 1;
  }
}

function createSafeFileBaseName(value) {
  const withoutDiacritics = String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  let safeName = withoutDiacritics
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[.-]+|[.-]+$/g, "")
    .slice(0, 80);

  if (safeName === "") {
    safeName = "tone-patch";
  }

  if (WINDOWS_RESERVED_NAMES.has(safeName.toUpperCase())) {
    safeName = `${safeName}-patch`;
  }

  return safeName;
}

module.exports = {
  DEFAULT_INTERNAL_DIR,
  createSafeFileBaseName,
  writeInternalToneJson,
};
