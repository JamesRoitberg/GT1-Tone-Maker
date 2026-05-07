# GT-1 Tone Maker

GT-1 Tone Maker é uma ferramenta em Node.js para transformar um formulario de timbre gerado por IA em um arquivo de patch/liveset importavel no BOSS Tone Studio para a pedaleira BOSS GT-1.

O projeto resolve um problema simples: muitas pessoas conseguem descrever o timbre que querem, mas nao sabem traduzir essa ideia para parametros da GT-1 ou para um arquivo `.tsl`. A ferramenta pretende fazer essa ponte de forma guiada, usando um formulario de texto preenchido por IA como ponto de partida.

## Prompt Para Usar nas IAs

O prompt que o usuario deve colar em outras IAs fica em um lugar de facil acesso:

`prompts/ai-tone-form-prompt-v0.1.md`

Esse arquivo contem as instrucoes para a IA perguntar qual timbre o usuario deseja e devolver o formulario `GT1_TONE_FORM_V0_1` no formato esperado pelo GT-1 Tone Maker.

## Fluxo Basico

1. O usuario cola um prompt em qualquer IA.
2. A IA pergunta qual timbre ele quer criar.
3. A IA devolve um formulario chamado `GT1_TONE_FORM_V0_1`.
4. O usuario salva esse formulario como arquivo `.txt` dentro da pasta `input/`.
5. O GT-1 Tone Maker lista os formularios encontrados.
6. O usuario escolhe um formulario em uma interface simples.
7. A ferramenta converte o formulario em um arquivo `.tsl`.
8. O arquivo final e salvo na pasta `output/`.
9. O usuario importa o `.tsl` no BOSS Tone Studio.

## Estrutura Inicial

- `input/`: onde o usuário coloca os formulários `.txt` gerados pela IA.
- `output/`: onde a ferramenta salva os arquivos `.tsl` gerados.
- `base/`: onde fica o `.tsl` base exportado pelo BOSS Tone Studio.
- `prompts/`: onde ficam os prompts para usar em outras IAs.
- `docs/`: documentação técnica do projeto.

## Objetivo do MVP

O objetivo inicial do MVP e gerar um arquivo `.tsl` a partir de:

- um formulario de timbre criado por IA;
- um arquivo `.tsl` base exportado oficialmente pelo BOSS Tone Studio.

A ideia e produzir uma base musical util para ajuste fino na propria pedaleira ou no BOSS Tone Studio. O resultado nao precisa copiar um timbre oficial com perfeicao.

## Simplicidade Para o Usuario

O usuário final não deve precisar entender Node.js, terminal, dependências, comandos ou estrutura interna do projeto.

No futuro, a ferramenta podera ser empacotada como um ZIP portatil, com tudo pronto para uso.
