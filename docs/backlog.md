# Backlog - GT-1 Tone Maker

Este arquivo registra ideias e proximas etapas que ainda nao entraram em implementacao.

## Itens em aberto

### GTM-001 - Identidade visual textual do CLI
- `prioridade`: baixa
- `status`: todo
- `tipo`: UX futura
- `contexto`: o `GT-1 Tone Maker` ainda nao tem um CLI principal interativo pronto. Quando esse fluxo existir, a ferramenta deve receber uma identidade visual textual no mesmo padrao ja aplicado ao `Konvert2Snes` e ao `Kombat Kreator`.
- `objetivo`: adicionar ao futuro CLI um banner ASCII compacto, legivel e com assinatura `by J.Roitberg`, sem dependencia nova e sem atrapalhar o fluxo principal para usuario leigo.
- `direcao visual`: usar 3 cores ANSI simples quando o terminal permitir: `GT-1 Tone` em claro, um detalhe central em vermelho e `Maker`/assinatura em cinza, com fallback sem cor para `NO_COLOR` ou stdout nao TTY.
- `arquivos provaveis`: futuro entrypoint do CLI, futuro modulo de identidade visual, README caso o comportamento de abertura da ferramenta seja documentado.
- `validacao futura`: abrir a ferramenta sem argumentos, conferir banner uma vez antes do menu, validar `NO_COLOR=1` sem ANSI e confirmar que scripts de teste/parser continuam sem banner.
- `observacoes`: nao implementar antes de existir o CLI principal. Nao colocar banner em `scripts/test-parser.js`, porque ele e validacao tecnica e nao fluxo de usuario.

## Itens concluidos

Nenhum item concluido ainda.
