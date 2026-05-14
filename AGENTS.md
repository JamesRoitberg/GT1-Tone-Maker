# AGENTS.md

Este documento define regras para qualquer agente, Codex ou colaborador automatico que trabalhe no projeto GT-1 Tone Maker.

## Regras Gerais

- O projeto principal deve ser em Node.js.
- Trabalhe em passos pequenos e verificaveis.
- Nao implemente codigo sem uma tarefa explicita pedindo implementacao.
- Nao crie dependencias, `package.json` ou estrutura de build sem necessidade clara.
- Priorize sempre uma experiencia simples para usuario leigo.
- O objetivo do patch gerado e dar uma base util para ajuste fino, nao copiar timbre oficial com perfeicao.
- O usuario nunca deve editar JSON manualmente.
- JSON sera apenas um formato interno da ferramenta.
- A IA deve gerar apenas formularios GT1_TONE_FORM_V0_1.
- O fluxo principal deve ser baseado em formularios em texto simples.
- O projeto deve tolerar respostas imperfeitas da IA sempre que possivel.
- O foco principal e robustez para usuario leigo.

## Backlog e Controle de Progresso

- O arquivo `docs/backlog.md` deve ser consultado antes de iniciar novas tarefas.
- O backlog deve ser tratado como fonte de verdade do planejamento atual.
- O backlog deve manter tarefas separadas em `TODO`, `DONE` e `FUTURE`.
- `TODO` deve conter tarefas pendentes do ciclo atual.
- `DONE` deve conter apenas tarefas realmente concluídas e verificaveis no repositorio.
- `FUTURE` deve conter ideias, melhorias e integracoes futuras que ainda nao fazem parte do ciclo atual.
- Ao concluir uma tarefa, mover ou marcar o item correspondente em `DONE`.
- Nao misturar ideias futuras com tarefas ativas.
- Se uma tarefa nova surgir durante o trabalho, adicionar em `TODO` ou `FUTURE`, sem implementar automaticamente.
- Antes de comecar implementacao, revisar tarefas `TODO`, tarefas `DONE` e proximas prioridades.
- Preferir tarefas pequenas e verificáveis.

## Documentacao e README

- Sempre que uma tarefa alterar fluxo de usuario, comandos, estrutura de pastas, arquivos gerados, contratos ou estado atual do projeto, verificar se o `README.md` precisa ser atualizado.
- Se o `README.md` estiver temporario, confuso ou desatualizado em relacao ao comportamento real do repositorio, melhorar o arquivo como parte da mesma tarefa quando isso for necessario para manter o projeto compreensivel.
- O `README.md` deve explicar o projeto para usuario leigo, sem exigir leitura de JSON ou detalhes internos antes do uso basico.
- Evite deixar o `README.md` prometendo recursos que ainda nao existem sem marcar claramente como planejado ou pendente.
- Atualizacoes de README devem continuar alinhadas ao `docs/backlog.md` e aos contratos em `docs/`.
- `CONTEXT.md` eh o glossario vivo curto do projeto; consulte quando houver duvida sobre termos como GT-1 Tone Maker, usuario leigo, fluxo criar patch, referencia musical, tone intent, formulario de timbre, `GT1_TONE_FORM_V0_1`, AI JSON, JSON interno, parser, normalizer, validator, schema, `.tsl` base, arquivo final e BOSS Tone Studio.
- `CONTEXT.md` nao substitui este `AGENTS.md`, o `README.md`, os docs existentes, schema/contrato nem documentacao tecnica detalhada.

## UX do Fluxo Principal

Usuario abre o app
- escolhe "Criar distorcao/efeito"
- digita artista, banda, musica, album ou estilo
- GT-1 Tone Maker injeta a referencia em um prompt interno
- IA retorna um formulario GT1_TONE_FORM_V0_1
- app salva o formulario em `input/`
- parser converte o formulario para um objeto interno
- normalizador ajusta defaults e valores seguros
- validador confere campos obrigatorios, enums, ranges e formatos
- app salva o JSON interno em `internal/`
- gerador cria o arquivo `.tsl`
- patch final e salvo em `output/`
- Evite CLI com flags para o fluxo principal do usuario.
- O usuario deve escolher com setas ou opcoes numeradas.
- O usuario so deve digitar texto quando for realmente necessario, como o nome do arquivo final.
- Mensagens de erro devem ser amigaveis, explicativas e orientadas a solucao.
- O fluxo principal deve funcionar ao abrir a ferramenta sem exigir argumentos de terminal.

O usuario nao deve precisar visualizar ou editar JSON.

## Pastas do Projeto

- `input/` recebe formularios `.form.txt` gerados pela IA ou colados pelo usuario.
- `internal/` guarda JSONs internos normalizados gerados pela ferramenta.
- `output/` recebe arquivos `.tsl` gerados pela ferramenta.
- `prompts/` guarda prompts usados para interacao com IAs.
- `base/` guarda o `.tsl` base exportado oficialmente do BOSS Tone Studio.
- `docs/` guarda contratos, arquitetura e especificacoes do projeto.

- Nao apague ou sobrescreva arquivos originais do usuario.
- Nao modifique o `.tsl` base original.
- Arquivos gerados devem ter nomes seguros para Windows, Linux e macOS.
- Se o arquivo de saida ja existir, pergunte antes de substituir.
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
- Texto fora desse bloco deve ser ignorado.
- O parser nunca deve depender de JSON gerado pela IA.
- O parser deve converter o formulario para um JSON interno padronizado.

- O validador deve ser rigido com:
  - campos obrigatorios
  - ranges
  - enums
  - formatos validos

- O normalizador deve:
  - aplicar defaults seguros
  - corrigir formatos simples quando possivel
  - evitar quebrar o fluxo por pequenos erros da IA

- Campos numericos devem ser convertidos com seguranca.
- Campos invalidos devem gerar mensagens amigaveis ao usuario.

## Futuras Integracoes de IA

Versoes futuras poderao integrar APIs oficiais de IAs como:
- Gemini
- OpenAI
- Claude

Nao automatizar navegadores ou interfaces web de IAs.

O modo manual com copiar/colar formulario deve continuar existindo como fallback.

## Manipulacao de TSL

- Ao manipular `.tsl` no futuro, preserve campos desconhecidos.
- Nao altere informacoes nao relacionadas ao patch gerado.
- Qualquer alteracao no `.tsl` deve ser feita com cuidado para manter compatibilidade com o BOSS Tone Studio.
