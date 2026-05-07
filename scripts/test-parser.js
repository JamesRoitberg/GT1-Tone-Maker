const fs = require("fs");
const path = require("path");

const { parseToneForm, validateToneForm } = require("../src");

const fixturesDir = path.join(__dirname, "..", "tests", "fixtures");

const cases = [
  { file: "valid-fnm-real-thing.txt", shouldPass: true },
  { file: "invalid-missing-field.txt", shouldPass: false },
  { file: "invalid-unknown-field.txt", shouldPass: false },
  { file: "invalid-duplicate-field.txt", shouldPass: false },
  { file: "invalid-out-of-range.txt", shouldPass: false },
  { file: "invalid-multiple-blocks.txt", shouldPass: false },
];

let failures = 0;

cases.forEach(({ file, shouldPass }) => {
  const filePath = path.join(fixturesDir, file);
  const text = fs.readFileSync(filePath, "utf8");

  try {
    const parsed = parseToneForm(text);
    validateToneForm(parsed);

    if (shouldPass) {
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

console.log("\nTodos os testes manuais do parser passaram.");
