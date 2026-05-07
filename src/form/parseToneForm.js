const {
  FORM_END_MARKER,
  FORM_START_MARKER,
} = require("./toneFormContract");
const { ToneFormError } = require("./ToneFormError");

function parseToneForm(text) {
  if (typeof text !== "string") {
    throw new ToneFormError("Nao consegui ler o formulario: o conteudo recebido nao e texto.");
  }

  const lines = text.split(/\r?\n/);
  const startIndexes = findMarkerIndexes(lines, FORM_START_MARKER);

  if (startIndexes.length === 0) {
    throw new ToneFormError(
      `Nao encontrei o inicio do formulario. O arquivo precisa conter uma linha com ${FORM_START_MARKER}.`
    );
  }

  if (startIndexes.length > 1) {
    throw new ToneFormError(
      `Encontrei mais de um bloco ${FORM_START_MARKER}. Neste MVP, coloque apenas um formulario por arquivo.`
    );
  }

  const startIndex = startIndexes[0];
  const endIndex = findEndMarkerIndex(lines, startIndex + 1);

  if (endIndex === -1) {
    throw new ToneFormError(
      `Nao encontrei o fim do formulario. O bloco precisa terminar com ${FORM_END_MARKER}.`
    );
  }

  const parsedForm = {};

  for (let index = startIndex + 1; index < endIndex; index += 1) {
    const lineNumber = index + 1;
    const line = lines[index].trim();

    if (line === "") {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      throw new ToneFormError(
        `A linha ${lineNumber} dentro do formulario nao esta no formato CAMPO=VALOR: "${line}".`
      );
    }

    const field = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (field === "") {
      throw new ToneFormError(
        `A linha ${lineNumber} tem um campo vazio antes do sinal de igual. Use o formato CAMPO=VALOR.`
      );
    }

    if (Object.prototype.hasOwnProperty.call(parsedForm, field)) {
      throw new ToneFormError(
        `O campo ${field} aparece mais de uma vez no formulario. Remova a duplicata para continuar.`,
        { field }
      );
    }

    parsedForm[field] = value;
  }

  return parsedForm;
}

function findMarkerIndexes(lines, marker) {
  const indexes = [];

  lines.forEach((line, index) => {
    if (line.trim() === marker) {
      indexes.push(index);
    }
  });

  return indexes;
}

function findEndMarkerIndex(lines, fromIndex) {
  for (let index = fromIndex; index < lines.length; index += 1) {
    if (lines[index].trim() === FORM_END_MARKER) {
      return index;
    }
  }

  return -1;
}

module.exports = {
  parseToneForm,
};
