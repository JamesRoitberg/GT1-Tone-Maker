# GT-1 Tone Maker

GT-1 Tone Maker e uma ferramenta em Node.js para transformar uma referencia musical em um patch/liveset importavel no BOSS Tone Studio para a pedaleira BOSS GT-1.

O projeto resolve um problema simples: muitas pessoas conseguem descrever o timbre que querem, mas nao sabem traduzir essa ideia para parametros da GT-1 ou para um arquivo `.tsl`. A ferramenta pretende fazer essa ponte de forma guiada, usando IA para preencher um formulario de texto controlado.

O resultado gerado deve ser uma base musical util para ajuste fino, nao uma copia oficial ou perfeita de timbres existentes.

## Fluxo Planejado

1. O usuario abre o app.
2. O usuario escolhe "Criar distorcao/efeito".
3. O usuario digita artista, banda, musica, album ou estilo.
4. O sistema injeta essa referencia no prompt interno em `{{USER_REFERENCE}}`.
5. A IA responde diretamente com um formulario `GT1_TONE_FORM_V0_1`.
6. O formulario e salvo em `input/`.
7. O parser le o formulario e gera um objeto interno.
8. O normalizador aplica defaults e conversoes seguras.
9. O validador confere campos obrigatorios, enums e ranges.
10. O JSON interno normalizado e salvo em `internal/`.
11. O gerador cria o arquivo `.tsl`.
12. O patch final e salvo em `output/`.

## Decisao Central

A IA nao deve gerar JSON.

A IA deve gerar apenas formularios `GT1_TONE_FORM_V0_1`.

JSON sera usado apenas como formato interno da ferramenta, depois que o formulario for lido, normalizado e validado.

Essa separacao existe para deixar o projeto mais robusto contra respostas imperfeitas da IA e mais simples para usuarios leigos.

## Prompt Interno

O prompt usado pelo sistema fica em:

`prompts/ai-tone-form-prompt-v0.1.md`

Esse arquivo funciona como um template interno. O app substitui `{{USER_REFERENCE}}` pela referencia digitada pelo usuario antes de enviar o prompt para a IA.

O modo manual com copiar e colar formulario deve continuar existindo como fallback.

## Estrutura Atual

- `input/`: formularios `.form.txt` gerados pela IA ou colados pelo usuario.
- `internal/`: JSONs internos normalizados gerados pela ferramenta.
- `output/`: arquivos `.tsl` gerados.
- `base/`: `.tsl` base oficial exportado pelo BOSS Tone Studio.
- `prompts/`: prompts usados pelo sistema.
- `docs/`: contratos, arquitetura e backlog.
- `src/form/`: contrato em codigo, parser, normalizador e validador iniciais do formulario.
- `src/internal/`: escrita do JSON interno normalizado.
- `tests/fixtures/`: fixtures usadas nos testes manuais.
- `scripts/`: scripts auxiliares de validacao manual.

## Estado Atual

Ja existem:

- contrato documental inicial do formulario;
- prompt interno com `{{USER_REFERENCE}}`;
- overview de arquitetura;
- parser inicial do bloco `GT1_TONE_FORM_V0_1`;
- normalizador inicial com defaults seguros e conversoes tolerantes;
- validador inicial de campos obrigatorios, enums e ranges;
- escrita de JSON interno normalizado em `internal/`;
- fixtures e scripts manuais de teste do formulario e do JSON interno.

Ainda faltam:

- pesquisa e estrategia de manipulacao segura de `.tsl`;
- gerador `.tsl`;
- fluxo principal de usuario.

## Teste Manual Disponivel

O projeto ainda nao tem `package.json` nem dependencias externas.

Os testes manuais atuais podem ser executados com Node.js:

```sh
node scripts/test-parser.js
node scripts/test-internal-json.js
```

## Documentacao Principal

- `docs/backlog.md`: controle de progresso.
- `docs/architecture-overview-v0.1.md`: visao geral da arquitetura.
- `docs/gt1-tone-form-v0.1.md`: contrato do formulario.

Antes de iniciar novas tarefas, consulte `docs/backlog.md`.
