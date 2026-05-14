const fs = require("fs");
const os = require("os");
const path = require("path");

const {
  createSafeFileBaseName,
  normalizeToneForm,
  parseToneForm,
  validateToneForm,
  writeInternalToneJson,
} = require("../src");

const fixturePath = path.join(__dirname, "..", "tests", "fixtures", "valid-tolerant-normalization.txt");
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "gt1-tone-maker-internal-"));

try {
  const text = fs.readFileSync(fixturePath, "utf8");
  const parsed = parseToneForm(text);
  const normalized = normalizeToneForm(parsed);
  const validated = validateToneForm(normalized);

  const firstWrite = writeInternalToneJson(validated, { internalDir: tempDir });
  const secondWrite = writeInternalToneJson(validated, { internalDir: tempDir });

  assertFileName(firstWrite.fileName, "FNM-Normalized.json");
  assertFileName(secondWrite.fileName, "FNM-Normalized-2.json");
  assertSafeFileBaseName();

  const savedJson = JSON.parse(fs.readFileSync(firstWrite.filePath, "utf8"));

  assertValue(savedJson.PATCH_NAME, "FNM Normalized", "PATCH_NAME");
  assertValue(savedJson.CONFIDENCE, 0.85, "CONFIDENCE");
  assertValue(savedJson.OD_DS_TYPE, "GUV DS", "OD_DS_TYPE");

  console.log("PASS JSON interno normalizado foi salvo com nome seguro e sem sobrescrever.");
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

function assertFileName(actual, expected) {
  if (actual !== expected) {
    throw new Error(`Nome de arquivo inesperado. Esperado: ${expected}. Recebido: ${actual}.`);
  }
}

function assertValue(actual, expected, field) {
  if (actual !== expected) {
    throw new Error(`${field} inesperado no JSON interno. Esperado: ${expected}. Recebido: ${actual}.`);
  }
}

function assertSafeFileBaseName() {
  const safeName = createSafeFileBaseName("CON: Timbre/Forte?");

  if (safeName !== "CON-Timbre-Forte") {
    throw new Error(`Nome seguro inesperado. Recebido: ${safeName}.`);
  }
}
