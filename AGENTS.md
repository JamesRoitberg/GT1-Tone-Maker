# AGENTS.md

Este documento define regras para qualquer agente, Codex ou colaborador automatico que trabalhe no projeto GT-1 Tone Maker.

## Regras Gerais

- O projeto principal deve ser em Node.js.
- Trabalhe em passos pequenos e verificaveis.
- Nao implemente codigo sem uma tarefa explicita pedindo implementacao.
- Nao crie dependencias, `package.json` ou estrutura de build sem necessidade clara.
- Priorize sempre uma experiencia simples para usuario leigo.
- O objetivo do patch gerado e dar uma base util para ajuste fino, nao copiar timbre oficial com perfeicao.

## UX do Fluxo Principal

- Evite CLI com flags para o fluxo principal do usuario.
- O fluxo principal deve listar arquivos e opcoes.
- O usuario deve escolher com setas ou opcoes numeradas.
- O usuario so deve digitar texto quando for realmente necessario, como o nome do arquivo final.
- Mensagens de erro devem ser amigaveis, explicativas e orientadas a solucao.
- O fluxo principal deve funcionar ao abrir a ferramenta sem exigir argumentos de terminal.

## Pastas do Projeto

- `input/` recebe formularios `.txt` criados pelo usuario.
- `output/` recebe arquivos `.tsl` gerados pela ferramenta.
- `base/` guarda o `.tsl` base exportado oficialmente do BOSS Tone Studio.
- Nao apague ou sobrescreva arquivos originais do usuario.
- Nao modifique o `.tsl` base original.
- Arquivos gerados devem ter nomes seguros para Windows, Linux e macOS.
- Se o arquivo de saída já existir, pergunte antes de substituir.

## Estilo de Implementação

- Prefira código simples, legível e modular.
- Evite abstrações complexas antes de existir necessidade real.
- Separe parser, validador, normalizador e gerador de saída em módulos diferentes quando a implementação começar.
- Não misture lógica de interface com lógica de parsing/validação.
- Sempre que possível, crie funções puras para parsing e validação.

## Git e Commits

- Use Conventional Commits nas mensagens de commit.
- Prefira commits pequenos, com uma mudança clara por vez.
- Exemplos de mensagens: `docs: add initial project documentation`, `feat: add tone form parser`, `test: add parser fixtures`.

## Parser e Validador

- O parser deve ser tolerante com texto antes e depois do formulario.
- O parser deve ler somente o bloco entre `GT1_TONE_FORM_V0_1` e `END_GT1_TONE_FORM`.
- Texto fora desse bloco deve ser ignorado pelo parser.
- O validador deve ser rigido com campos obrigatorios, ranges e valores permitidos.
- Campos numericos devem ser validados como numeros reais ou inteiros conforme o contrato.
- Campos ON/OFF devem seguir exatamente o contrato do formulario.

## Manipulacao de TSL

- Ao manipular `.tsl` no futuro, preserve campos desconhecidos.
- Nao altere informacoes nao relacionadas ao patch gerado.
- Qualquer alteracao no `.tsl` deve ser feita com cuidado para manter compatibilidade com o BOSS Tone Studio.
