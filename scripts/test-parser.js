const fs = require("fs");
const path = require("path");

const { normalizeToneForm, parseToneForm, validateToneForm } = require("../src");

const fixturesDir = path.join(__dirname, "..", "tests", "fixtures");

const cases = [
  { file: "valid-fnm-real-thing.txt", shouldPass: true },
  {
    file: "valid-tolerant-normalization.txt",
    shouldPass: true,
    expected: {
      CHAIN: "COMP,OD_DS,PREAMP,NS,EQ,DELAY,REVERB",
      COMP_ON: "YES",
      CONFIDENCE: 0.85,
      DELAY_ON: "NO",
      DELAY_TIME: 380,
      OD_DS_TYPE: "GUV DS",
      PREAMP_BRIGHT: "ON",
      PREAMP_TYPE: "HiGAIN STACK",
      REVERB_TIME: 1.2,
      TONE_TYPE: "metal",
    },
  },
  { file: "invalid-missing-field.txt", shouldPass: false },
  { file: "invalid-unknown-field.txt", shouldPass: false },
  { file: "invalid-duplicate-field.txt", shouldPass: false },
  { file: "invalid-out-of-range.txt", shouldPass: false },
  { file: "invalid-multiple-blocks.txt", shouldPass: false },
];

let failures = 0;

cases.forEach(({ file, shouldPass, expected }) => {
  const filePath = path.join(fixturesDir, file);
  const text = fs.readFileSync(filePath, "utf8");

  try {
    const parsed = parseToneForm(text);
    const normalized = normalizeToneForm(parsed);
    const validated = validateToneForm(normalized);

    if (shouldPass) {
      assertExpectedValues(file, validated, expected);
      console.log(`PASS ${file}`);
      return;
    }

    failures += 1;
    console.error(`FAIL ${file}: era para falhar, mas foi aceito.`);
  } catch (error) {
    if (!shouldPass) {
      console.log(`PASS ${file}: rejeitado como esperado.`);
      console.log(`  ${error.message}`);
      return;
    }

    failures += 1;
    console.error(`FAIL ${file}: era para passar, mas falhou.`);
    console.error(`  ${error.message}`);
  }
});

if (failures > 0) {
  console.error(`\n${failures} teste(s) falharam.`);
  process.exit(1);
}

console.log("\nTodos os testes manuais do formulario passaram.");

function assertExpectedValues(file, validated, expected = {}) {
  Object.entries(expected).forEach(([field, expectedValue]) => {
    if (validated[field] !== expectedValue) {
      throw new Error(
        `${file}: esperado ${field}=${expectedValue}, recebido ${validated[field]}.`
      );
    }
  });
}
