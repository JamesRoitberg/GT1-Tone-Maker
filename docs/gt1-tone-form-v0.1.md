# Contrato GT1_TONE_FORM_V0_1

Este documento descreve o contrato do formulário `GT1_TONE_FORM_V0_1`, usado pelo GT-1 Tone Maker para receber parâmetros de timbre gerados por IA.

## Finalidade

O formulário serve como uma ponte simples entre uma descrição musical feita por uma IA e os parâmetros que serão usados para gerar um arquivo `.tsl` importável no BOSS Tone Studio para a pedaleira BOSS GT-1.

Ele não representa uma promessa de cópia perfeita de timbres oficiais. O objetivo é gerar uma base musical coerente para ajuste fino no BOSS Tone Studio ou na própria pedaleira.

## Visão Geral do Fluxo

1. O usuário pede um timbre para uma IA.
2. A IA preenche um formulário `GT1_TONE_FORM_V0_1`.
3. O usuário salva esse formulário como `.txt` dentro da pasta `input/`.
4. O GT-1 Tone Maker lê o formulário.
5. A ferramenta valida os campos.
6. A ferramenta aplica os valores em um `.tsl` base.
7. O arquivo final é salvo na pasta `output/`.

## Regras Gerais de Parsing

- O formulário começa com a linha `GT1_TONE_FORM_V0_1`.
- O formulário termina com a linha `END_GT1_TONE_FORM`.
- O parser deve ler somente o conteúdo entre `GT1_TONE_FORM_V0_1` e `END_GT1_TONE_FORM`.
- Texto antes de `GT1_TONE_FORM_V0_1` deve ser ignorado pelo parser.
- Texto depois de `END_GT1_TONE_FORM` deve ser ignorado pelo parser.
- Explicações adicionais podem existir depois de `END_GT1_TONE_FORM`, mas não serão usadas pelo programa.
- Dentro do formulário, cada linha de campo deve usar o formato `CAMPO=VALOR`.
- Linhas vazias dentro do bloco do formulário devem ser ignoradas.
- O parser pode remover espaços no começo e no fim de cada linha.
- O parser pode remover espaços no começo e no fim de `CAMPO` e `VALOR`.
- O valor pode conter espaços.
- O nome do campo deve bater com um campo documentado neste contrato.
- Todos os campos documentados são obrigatórios.
- Campos não reconhecidos dentro do formulário devem gerar erro de validação.
- Campos duplicados dentro do formulário devem gerar erro de validação.
- Campos numéricos devem ser parseáveis como número.
- Campos de liga/desliga devem usar `YES` ou `NO`, exceto `PREAMP_BRIGHT`, que usa `ON` ou `OFF`.

## Regras de Validação do MVP

Para o MVP, o contrato deve ser rígido.

- O valor de `CHAIN` deve ser exatamente `COMP,OD_DS,PREAMP,NS,EQ,DELAY,REVERB`.
- Não há suporte inicial para reordenar a cadeia de efeitos.
- Não há suporte inicial para campos extras.
- Não há suporte inicial para múltiplos patches no mesmo arquivo.
- Não há suporte inicial para múltiplos blocos `GT1_TONE_FORM_V0_1` no mesmo arquivo.
- Caso existam múltiplos blocos, o validador deve tratar como erro.
- Campos textuais não devem ficar vazios.
- O campo `SONG` deve usar `GENERAL` quando não houver música específica.
- O campo `GUITARIST` pode usar `UNKNOWN` quando não houver informação confiável.
- O campo `BAND` pode usar `UNKNOWN` quando não houver banda ou artista definido.
- O campo `NOTES` deve conter uma frase curta de intenção do timbre.

## Campos Obrigatórios

### Identificação

- `PATCH_NAME`: nome curto do patch.
- `REFERENCE`: resumo do pedido original do usuário.
- `GUITARIST`: guitarrista principal ou `UNKNOWN` quando não houver informação confiável.
- `BAND`: banda ou artista, ou `UNKNOWN` quando não houver informação.
- `SONG`: música específica ou `GENERAL`.
- `ALBUM_OR_ERA`: álbum, fase, época ou estilo.
- `STYLE`: descrição curta do estilo musical.
- `TONE_TYPE`: intenção principal do timbre.
- `CONFIDENCE`: confiança da aproximação, de `0.00` a `1.00`.
- `CHAIN`: cadeia de efeitos usada pelo MVP.

### Compressor

- `COMP_ON`: liga ou desliga o compressor.
- `COMP_TYPE`: tipo de compressor.
- `COMP_SUSTAIN`: sustain do compressor.
- `COMP_ATTACK`: ataque do compressor.
- `COMP_TONE`: tonalidade do compressor.
- `COMP_LEVEL`: nível do compressor.

### Overdrive/Distortion

- `OD_DS_ON`: liga ou desliga o bloco de overdrive/distortion.
- `OD_DS_TYPE`: tipo de overdrive/distortion.
- `OD_DS_DRIVE`: quantidade de ganho/distorção.
- `OD_DS_TONE`: tonalidade do drive.
- `OD_DS_BOTTOM`: reforço ou corte de graves do drive.
- `OD_DS_EFFECT_LEVEL`: nível do efeito.
- `OD_DS_DIRECT_LEVEL`: nível do sinal direto.

### Preamp

- `PREAMP_ON`: liga ou desliga o preamp.
- `PREAMP_TYPE`: tipo de preamp.
- `PREAMP_GAIN`: ganho do preamp.
- `PREAMP_LEVEL`: nível do preamp.
- `PREAMP_BASS`: graves do preamp.
- `PREAMP_MIDDLE`: médios do preamp.
- `PREAMP_TREBLE`: agudos do preamp.
- `PREAMP_PRESENCE`: presença do preamp.
- `PREAMP_BRIGHT`: chave bright do preamp.

### Noise Suppressor

- `NS_ON`: liga ou desliga o noise suppressor.
- `NS_THRESHOLD`: limiar de atuação.
- `NS_RELEASE`: tempo de liberação.

### EQ

- `EQ_ON`: liga ou desliga o EQ.
- `EQ_LOW`: ajuste de graves.
- `EQ_MID`: ajuste de médios.
- `EQ_HIGH`: ajuste de agudos.

### Delay

- `DELAY_ON`: liga ou desliga o delay.
- `DELAY_TYPE`: tipo de delay.
- `DELAY_TIME`: tempo de delay.
- `DELAY_FEEDBACK`: feedback do delay.
- `DELAY_LEVEL`: nível do delay.

### Reverb

- `REVERB_ON`: liga ou desliga o reverb.
- `REVERB_TYPE`: tipo de reverb.
- `REVERB_TIME`: tempo de reverb.
- `REVERB_LEVEL`: nível do reverb.

### Master

- `MASTER_LEVEL`: volume final sugerido para o patch.
- `NOTES`: frase curta explicando a intenção do timbre.

## Valores Permitidos

### Campos YES/NO

Os campos abaixo aceitam somente `YES` ou `NO`:

- `COMP_ON`
- `OD_DS_ON`
- `PREAMP_ON`
- `NS_ON`
- `EQ_ON`
- `DELAY_ON`
- `REVERB_ON`

### Campo ON/OFF

O campo abaixo aceita somente `ON` ou `OFF`:

- `PREAMP_BRIGHT`

### CHAIN

No MVP, `CHAIN` deve ser exatamente:

```text
COMP,OD_DS,PREAMP,NS,EQ,DELAY,REVERB

### Template Vazio 

GT1_TONE_FORM_V0_1

PATCH_NAME=
REFERENCE=
GUITARIST=
BAND=
SONG=
ALBUM_OR_ERA=
STYLE=
TONE_TYPE=
CONFIDENCE=

CHAIN=COMP,OD_DS,PREAMP,NS,EQ,DELAY,REVERB

COMP_ON=
COMP_TYPE=
COMP_SUSTAIN=
COMP_ATTACK=
COMP_TONE=
COMP_LEVEL=

OD_DS_ON=
OD_DS_TYPE=
OD_DS_DRIVE=
OD_DS_TONE=
OD_DS_BOTTOM=
OD_DS_EFFECT_LEVEL=
OD_DS_DIRECT_LEVEL=

PREAMP_ON=
PREAMP_TYPE=
PREAMP_GAIN=
PREAMP_LEVEL=
PREAMP_BASS=
PREAMP_MIDDLE=
PREAMP_TREBLE=
PREAMP_PRESENCE=
PREAMP_BRIGHT=

NS_ON=
NS_THRESHOLD=
NS_RELEASE=

EQ_ON=
EQ_LOW=
EQ_MID=
EQ_HIGH=

DELAY_ON=
DELAY_TYPE=
DELAY_TIME=
DELAY_FEEDBACK=
DELAY_LEVEL=

REVERB_ON=
REVERB_TYPE=
REVERB_TIME=
REVERB_LEVEL=

MASTER_LEVEL=

NOTES=

END_GT1_TONE_FORM


### Ex de Template Completo

GT1_TONE_FORM_V0_1

PATCH_NAME=FNM Real Thing
REFERENCE=Faith No More The Real Thing
GUITARIST=Jim Martin
BAND=Faith No More
SONG=The Real Thing
ALBUM_OR_ERA=The Real Thing (1989)
STYLE=Funk Metal / Alternative Metal
TONE_TYPE=metal
CONFIDENCE=0.85

CHAIN=COMP,OD_DS,PREAMP,NS,EQ,DELAY,REVERB

COMP_ON=YES
COMP_TYPE=BOSS
COMP_SUSTAIN=25
COMP_ATTACK=50
COMP_TONE=5
COMP_LEVEL=50

OD_DS_ON=YES
OD_DS_TYPE=GUV DS
OD_DS_DRIVE=45
OD_DS_TONE=10
OD_DS_BOTTOM=5
OD_DS_EFFECT_LEVEL=40
OD_DS_DIRECT_LEVEL=0

PREAMP_ON=YES
PREAMP_TYPE=MS1959 I+II
PREAMP_GAIN=85
PREAMP_LEVEL=55
PREAMP_BASS=55
PREAMP_MIDDLE=40
PREAMP_TREBLE=65
PREAMP_PRESENCE=70
PREAMP_BRIGHT=ON

NS_ON=YES
NS_THRESHOLD=40
NS_RELEASE=30

EQ_ON=YES
EQ_LOW=3
EQ_MID=-2
EQ_HIGH=6

DELAY_ON=NO
DELAY_TYPE=STANDARD
DELAY_TIME=380
DELAY_FEEDBACK=20
DELAY_LEVEL=25

REVERB_ON=YES
REVERB_TYPE=ROOM
REVERB_TIME=1.2
REVERB_LEVEL=15

MASTER_LEVEL=85

NOTES=Timbre inspirado no som cortante e pesado de Jim Martin, com ataque forte e ambiência discreta.

END_GT1_TONE_FORM