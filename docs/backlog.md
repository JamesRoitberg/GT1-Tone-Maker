# Backlog GT-1 Tone Maker

Este arquivo e o controle principal de progresso do projeto.

Antes de iniciar novas tarefas, o agente principal deve consultar este backlog, confirmar o que ja esta em `DONE` e escolher apenas itens pendentes de `TODO`, a menos que o usuario peca outra coisa explicitamente.

## TODO

- [ ] Pesquisar a estrutura real de arquivos `.tsl` da BOSS GT-1.
- [ ] Definir estrategia segura para modificar `.tsl` preservando campos desconhecidos.
- [ ] Implementar geracao inicial de `.tsl`.
- [ ] Criar fluxo principal do app sem exigir argumentos de terminal.
- [ ] Adicionar identidade visual textual ao futuro CLI.
- [ ] Garantir que arquivos gerados usem nomes seguros para Windows, Linux e macOS.
- [ ] Definir comportamento quando o arquivo de saida ja existir.

## DONE

- [x] Criar `AGENTS.md` inicial.
- [x] Definir decisao de usar formulario `GT1_TONE_FORM_V0_1` em vez de JSON gerado por IA.
- [x] Definir que JSON sera apenas formato interno da ferramenta.
- [x] Criar contrato inicial do `GT1_TONE_FORM_V0_1` em `docs/gt1-tone-form-v0.1.md`.
- [x] Criar prompt inicial para IA em `prompts/ai-tone-form-prompt-v0.1.md`.
- [x] Atualizar prompt principal para funcionar como template interno com `{{USER_REFERENCE}}`.
- [x] Criar visao geral da arquitetura em `docs/architecture-overview-v0.1.md`.
- [x] Criar estrutura inicial de pastas do projeto com `input/`, `output/`, `base/`, `docs/` e `prompts/`.
- [x] Implementar parser inicial do formulario `GT1_TONE_FORM_V0_1`.
- [x] Implementar validador inicial de campos obrigatorios, enums e ranges.
- [x] Criar fixtures e script manual de teste do parser/validador.
- [x] Adicionar secao "Backlog e Controle de Progresso" ao `AGENTS.md`.
- [x] Organizar `docs/backlog.md` em `TODO`, `DONE` e `FUTURE`.
- [x] Atualizar README para o novo fluxo interno com `{{USER_REFERENCE}}`.
- [x] Atualizar o contrato `docs/gt1-tone-form-v0.1.md` para refletir o novo fluxo em que o app coleta a referencia antes da IA.
- [x] Separar responsabilidades de parser, validador e normalizador na documentacao.
- [x] Atualizar overview de arquitetura para refletir parser e validador ja implementados.
- [x] Adicionar regra permanente para revisar e atualizar o `README.md` quando necessario.
- [x] Limpar `docs/gt1-tone-form-spec-v0.1.md` para apontar para o contrato oficial sem duplicar especificacao.
- [x] Implementar normalizador inicial com defaults seguros e conversoes tolerantes.
- [x] Gerar JSON interno normalizado em `internal/`.

## FUTURE

- [ ] Integracao com Gemini API.
- [ ] Integracao com OpenAI API.
- [ ] Integracao com Claude API.
- [ ] Modo manual com copiar e colar formulario como fallback permanente.
- [ ] Interface grafica.
- [ ] Historico de patches.
- [ ] Preview resumido do timbre antes de gerar patch.
- [ ] Empacotamento portatil para usuarios leigos.

## Notas de TODO

### GTM-001 - Identidade visual textual do CLI

- `prioridade`: baixa.
- `status`: todo.
- `tipo`: UX.
- `contexto`: o `GT-1 Tone Maker` ainda nao tem um CLI principal interativo pronto. Quando esse fluxo existir, a ferramenta deve receber uma identidade visual textual no mesmo padrao ja aplicado ao `Konvert2Snes` e ao `Kombat Kreator`.
- `objetivo`: adicionar ao futuro CLI um banner ASCII compacto, legivel e com assinatura `by J.Roitberg`, sem dependencia nova e sem atrapalhar o fluxo principal para usuario leigo.
- `direcao visual`: usar 3 cores ANSI simples quando o terminal permitir: `GT-1 Tone` em claro, um detalhe central em vermelho e `Maker`/assinatura em cinza, com fallback sem cor para `NO_COLOR` ou stdout nao TTY.
- `arquivos provaveis`: futuro entrypoint do CLI, futuro modulo de identidade visual, README caso o comportamento de abertura da ferramenta seja documentado.
- `validacao futura`: abrir a ferramenta sem argumentos, conferir banner uma vez antes do menu, validar `NO_COLOR=1` sem ANSI e confirmar que scripts de teste/parser continuam sem banner.
- `observacoes`: nao implementar antes de existir o CLI principal. Nao colocar banner em `scripts/test-parser.js`, porque ele e validacao tecnica e nao fluxo de usuario.
