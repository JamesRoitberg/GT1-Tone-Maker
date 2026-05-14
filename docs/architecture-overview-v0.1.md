# Visao geral da arquitetura v0.1

## Objetivo do projeto

O GT-1 Tone Maker e uma ferramenta para gerar patches da pedaleira BOSS GT-1 usando IA.

O objetivo principal e facilitar para usuarios leigos criarem timbres inspirados em artistas, bandas, musicas, albuns ou estilos.

O patch gerado deve servir como uma base util para ajuste fino, nao como uma copia oficial ou perfeita de um timbre existente.

## Filosofia do projeto

- UX simples.
- Fluxo guiado.
- Sem necessidade de editar JSON.
- Sem necessidade de entender BOSS Tone Studio.
- Robustez contra erros de IA.
- Fluxo simples para usuario leigo.
- Implementacao em passos pequenos e verificaveis.
- Sem dependencias externas enquanto a biblioteca padrao for suficiente.

## Fluxo principal planejado

1. Usuario abre o app.
2. Usuario escolhe "Criar distorcao/efeito".
3. Usuario digita artista, banda, musica, album ou estilo.
4. Sistema injeta a referencia em um prompt interno usando `{{USER_REFERENCE}}`.
5. IA responde com um formulario `GT1_TONE_FORM_V0_1`.
6. Formulario e salvo em `input/`.
7. Parser converte o formulario para um objeto interno JavaScript.
8. Normalizador aplica defaults e conversoes seguras.
9. Validador confere campos obrigatorios, enums, ranges e formatos.
10. JSON interno normalizado e salvo em `internal/`.
11. Gerador cria arquivo `.tsl`.
12. Patch final e salvo em `output/`.

## Decisao importante

A IA nao gera JSON.

A IA gera apenas formularios `GT1_TONE_FORM_V0_1`.

JSON sera apenas formato interno da ferramenta.

Essa decisao existe para manter o fluxo mais robusto para usuarios leigos e para reduzir a chance de erros causados por respostas imperfeitas da IA.

## Estrutura atual

### `input/`

Recebe formularios `.form.txt` gerados pela IA ou colados pelo usuario.

### `output/`

Recebe patches `.tsl` gerados pela ferramenta quando o gerador existir.

### `prompts/`

Guarda prompts usados pelo sistema para interacao com IAs.

### `base/`

Guarda o `.tsl` base oficial exportado do BOSS Tone Studio.

O arquivo base original nao deve ser apagado, sobrescrito ou modificado diretamente.

### `docs/`

Guarda contratos, arquitetura, backlog e especificacoes do projeto.

### `internal/`

Guarda JSON interno normalizado gerado a partir dos formularios.

Esse JSON e um detalhe interno da ferramenta e nao deve ser editado manualmente pelo usuario.

### `src/form/`

Contem o contrato em codigo, o parser inicial, o normalizador inicial, o validador inicial e erros relacionados ao formulario.

Por enquanto, parser, normalizador e validador ficam juntos em `src/form/` porque ainda sao pequenos e pertencem ao mesmo dominio. Se crescerem demais, podem ser separados depois em pastas mais especificas.

### `src/internal/`

Contem a escrita do JSON interno normalizado em `internal/`, com nome de arquivo seguro e sem sobrescrever arquivos existentes por padrao.

### `tests/fixtures/`

Guarda exemplos validos e invalidos usados pelo script manual de teste.

### `scripts/`

Guarda scripts auxiliares de validacao manual.

## Estrutura planejada

### `src/normalizer/` ou `src/form/`

Guardara a aplicacao de defaults, conversoes seguras e pequenos ajustes tolerantes.

A decisao de criar uma pasta propria deve depender do tamanho real da implementacao.

### `src/generator/`

Guardara a geracao do patch `.tsl`.

### `src/ui/`

Guardara menus e fluxo principal do usuario.

## Parser

O parser deve ler apenas o conteudo entre:

```text
GT1_TONE_FORM_V0_1
```

e:

```text
END_GT1_TONE_FORM
```

Texto antes ou depois desse bloco deve ser ignorado.

Linhas vazias dentro do bloco devem ser ignoradas.

Cada linha de campo deve usar o formato `CAMPO=VALOR`.

O parser retorna um objeto JavaScript simples e nunca depende de JSON gerado pela IA.

Estado atual: parser inicial implementado.

## Validador

O validador deve:

- Validar enums.
- Validar ranges.
- Validar campos obrigatorios.
- Validar formatos esperados.
- Gerar mensagens amigaveis, explicativas e orientadas a solucao.

Campos invalidos nao devem gerar erros tecnicos confusos para o usuario final.

Estado atual: validador inicial implementado.

## Normalizador

O normalizador deve:

- Aplicar defaults seguros.
- Corrigir formatos simples quando possivel.
- Converter campos numericos com seguranca.
- Evitar falhas desnecessarias causadas por pequenas imperfeicoes da IA.

O normalizador deve ser tolerante, mas nao deve aceitar valores que possam quebrar o fluxo ou gerar um patch inconsistente.

Estado atual: normalizador inicial implementado com defaults para campos vazios, conversoes simples de YES/NO e ON/OFF, enums, `CHAIN`, porcentagem, virgula decimal e unidades comuns.

## JSON Interno

O JSON interno deve:

- Ser gerado somente depois de parser, normalizador e validador.
- Ser salvo em `internal/`.
- Usar nome seguro para Windows, Linux e macOS.
- Evitar sobrescrever arquivo existente por padrao.
- Servir como formato intermediario da ferramenta, nao como arquivo que o usuario precise editar.

Estado atual: escrita inicial implementada em `src/internal/writeInternalToneJson.js`.

## Gerador TSL

O gerador deve:

- Usar um `.tsl` base oficial exportado do BOSS Tone Studio.
- Preservar dados desconhecidos.
- Modificar apenas o necessario para representar o patch gerado.
- Gerar arquivos compativeis com BOSS Tone Studio.
- Evitar alterar informacoes nao relacionadas ao patch gerado.

Qualquer manipulacao de `.tsl` deve ser feita com cuidado para manter compatibilidade com a pedaleira e com o BOSS Tone Studio.

Estado atual: pendente.

## Integracoes futuras

Versoes futuras poderao integrar APIs oficiais de IAs como:

- Gemini API.
- OpenAI API.
- Claude API.

Nao automatizar navegador ou sites de IA.

O modo manual com copiar e colar formulario deve continuar existindo como fallback.

## Proxima prioridade recomendada

A proxima prioridade tecnica recomendada e pesquisar a estrutura real de arquivos `.tsl` da BOSS GT-1.

Motivo: parser, normalizador, validador e escrita do JSON interno ja existem. Antes de gerar `.tsl`, o projeto precisa entender com seguranca a estrutura real exportada pelo BOSS Tone Studio.

Depois disso, a ordem sugerida e:

1. Definir estrategia segura de manipulacao do `.tsl`.
2. Implementar o gerador inicial.
3. Criar o fluxo principal do usuario.

## Estado atual

O projeto esta em fase inicial, mas ja passou da documentacao pura.

Ja existem parser, normalizador, validador e escrita de JSON interno com fixtures e scripts manuais de teste.

A implementacao deve continuar em passos pequenos e verificaveis.
