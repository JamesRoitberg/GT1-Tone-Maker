# Contrato GT1_TONE_FORM_V0_1

Este documento descreve o contrato do formulario `GT1_TONE_FORM_V0_1`, usado pelo GT-1 Tone Maker para receber parametros de timbre gerados por IA.

## Finalidade

O formulario serve como uma ponte simples entre uma referencia musical digitada pelo usuario e os parametros que serao usados para gerar um arquivo `.tsl` importavel no BOSS Tone Studio para a pedaleira BOSS GT-1.

Ele nao representa uma promessa de copia perfeita de timbres oficiais. O objetivo e gerar uma base musical coerente para ajuste fino no BOSS Tone Studio ou na propria pedaleira.

## Fluxo Planejado

1. O usuario informa uma referencia no GT-1 Tone Maker, como artista, banda, musica, album, guitarrista ou estilo.
2. O sistema injeta essa referencia no prompt interno usando a variavel `{{USER_REFERENCE}}`.
3. A IA responde diretamente com um formulario `GT1_TONE_FORM_V0_1`.
4. O formulario e salvo em `input/`.
5. O parser le o bloco do formulario e converte para um objeto JavaScript simples.
6. O normalizador aplica defaults seguros e conversoes tolerantes.
7. O validador confere campos obrigatorios, enums, ranges e formatos.
8. O JSON interno normalizado e salvo em `internal/`.
9. O gerador usa um `.tsl` base oficial e cria o patch final em `output/`.

## Decisao Central

A IA nao gera JSON.

A IA gera apenas formularios `GT1_TONE_FORM_V0_1`.

JSON sera apenas formato interno da ferramenta.

## Responsabilidades

### Parser

O parser deve:

- Localizar o bloco entre `GT1_TONE_FORM_V0_1` e `END_GT1_TONE_FORM`.
- Ignorar texto antes e depois do bloco.
- Ignorar linhas vazias dentro do bloco.
- Aceitar somente linhas no formato `CAMPO=VALOR`.
- Remover espacos no comeco e no fim de cada linha.
- Remover espacos no comeco e no fim de `CAMPO` e `VALOR`.
- Retornar um objeto JavaScript simples.
- Nao depender de JSON gerado pela IA.

### Validador

O validador deve:

- Rejeitar campos desconhecidos.
- Rejeitar campos duplicados.
- Exigir todos os campos obrigatorios.
- Validar enums.
- Validar ranges numericos.
- Validar formatos esperados.
- Gerar mensagens amigaveis e orientadas a solucao.

### Normalizador

O normalizador deve:

- Aplicar defaults seguros quando fizer sentido.
- Corrigir formatos simples quando possivel.
- Converter campos numericos com seguranca.
- Evitar falhas desnecessarias causadas por pequenas imperfeicoes da IA.
- Nao aceitar valores que possam quebrar o fluxo ou gerar patch inconsistente.

## Regras Gerais do Formulario

- O formulario comeca com a linha `GT1_TONE_FORM_V0_1`.
- O formulario termina com a linha `END_GT1_TONE_FORM`.
- Dentro do formulario, cada linha de campo deve usar o formato `CAMPO=VALOR`.
- Explicacoes adicionais podem existir depois de `END_GT1_TONE_FORM`, mas nao serao usadas pelo programa.
- O valor pode conter espacos.
- O nome do campo deve bater com um campo documentado neste contrato.
- Todos os campos documentados sao obrigatorios no MVP.
- Nao ha suporte inicial para reordenar a cadeia de efeitos.
- Nao ha suporte inicial para campos extras.
- Nao ha suporte inicial para multiplos patches no mesmo arquivo.
- Nao ha suporte inicial para multiplos blocos `GT1_TONE_FORM_V0_1` no mesmo arquivo.

## Campos Obrigatorios

### Identificacao

- `PATCH_NAME`: nome curto do patch.
- `REFERENCE`: resumo da referencia digitada pelo usuario.
- `GUITARIST`: guitarrista principal ou `UNKNOWN`.
- `BAND`: banda ou artista, ou `UNKNOWN`.
- `SONG`: musica especifica ou `GENERAL`.
- `ALBUM_OR_ERA`: album, fase, epoca ou estilo.
- `STYLE`: descricao curta do estilo musical.
- `TONE_TYPE`: intencao principal do timbre.
- `CONFIDENCE`: confianca da aproximacao, de `0.00` a `1.00`.
- `CHAIN`: cadeia de efeitos usada pelo MVP.

### Compressor

- `COMP_ON`
- `COMP_TYPE`
- `COMP_SUSTAIN`
- `COMP_ATTACK`
- `COMP_TONE`
- `COMP_LEVEL`

### Overdrive/Distortion

- `OD_DS_ON`
- `OD_DS_TYPE`
- `OD_DS_DRIVE`
- `OD_DS_TONE`
- `OD_DS_BOTTOM`
- `OD_DS_EFFECT_LEVEL`
- `OD_DS_DIRECT_LEVEL`

### Preamp

- `PREAMP_ON`
- `PREAMP_TYPE`
- `PREAMP_GAIN`
- `PREAMP_LEVEL`
- `PREAMP_BASS`
- `PREAMP_MIDDLE`
- `PREAMP_TREBLE`
- `PREAMP_PRESENCE`
- `PREAMP_BRIGHT`

### Noise Suppressor

- `NS_ON`
- `NS_THRESHOLD`
- `NS_RELEASE`

### EQ

- `EQ_ON`
- `EQ_LOW`
- `EQ_MID`
- `EQ_HIGH`

### Delay

- `DELAY_ON`
- `DELAY_TYPE`
- `DELAY_TIME`
- `DELAY_FEEDBACK`
- `DELAY_LEVEL`

### Reverb

- `REVERB_ON`
- `REVERB_TYPE`
- `REVERB_TIME`
- `REVERB_LEVEL`

### Master

- `MASTER_LEVEL`
- `NOTES`

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
```

### TONE_TYPE

```text
base
lead
crunch
clean
metal
rock
fuzz
solo
outro
```

### OD_DS_TYPE

```text
MID BOOST
CLEAN BST
TREBLE BST
CRUNCH
NATURAL OD
WARM OD
FAT DS
LEAD DS
METAL DS
OCT FUZZ
A-DIST
BLUES OD
OD-1
T-SCREAM
TURBO OD
DISTORTION
RAT
GUV DS
DST+
METAL ZONE
60S FUZZ
MUFF FUZZ
```

### PREAMP_TYPE

```text
NATURAL CLEAN
FULL RANGE
COMBO CRUNCH
STACK CRUNCH
HiGAIN STACK
POWER DRIVE
EXTREME LEAD
CORE METAL
JC-120
TWEED
DELUXE CRUNCH
VO DRIVE
VO LEAD
MATCH DRIVE
BG LEAD
BG DRIVE
MS1959 I
MS1959 I+II
R-FIER VINTAGE
R-FIER MODERN
T-AMP LEAD
SLDN
5150 DRIVE
METAL LEAD
```

### COMP_TYPE

```text
BOSS
HI-BAND
LIGHT
D-COMP
ORANGE
FAT
MILD
STEREO
```

### REVERB_TYPE

```text
AMBIENCE
ROOM
HALL 1
HALL 2
PLATE
```

### DELAY_TYPE

```text
STANDARD
ANALOG
TAPE
MODULATE
REVERSE
```

## Ranges Numericos

- `CONFIDENCE`: 0 a 1.
- `COMP_SUSTAIN`: 0 a 100.
- `COMP_ATTACK`: 0 a 100.
- `COMP_TONE`: -50 a 50.
- `COMP_LEVEL`: 0 a 100.
- `OD_DS_DRIVE`: 0 a 120.
- `OD_DS_TONE`: -50 a 50.
- `OD_DS_BOTTOM`: -50 a 50.
- `OD_DS_EFFECT_LEVEL`: 0 a 100.
- `OD_DS_DIRECT_LEVEL`: 0 a 100.
- `PREAMP_GAIN`: 0 a 120.
- `PREAMP_LEVEL`: 0 a 100.
- `PREAMP_BASS`: 0 a 100.
- `PREAMP_MIDDLE`: 0 a 100.
- `PREAMP_TREBLE`: 0 a 100.
- `PREAMP_PRESENCE`: 0 a 100.
- `NS_THRESHOLD`: 0 a 100.
- `NS_RELEASE`: 0 a 100.
- `EQ_LOW`: -20 a 20.
- `EQ_MID`: -20 a 20.
- `EQ_HIGH`: -20 a 20.
- `DELAY_TIME`: 1 a 2000.
- `DELAY_FEEDBACK`: 0 a 100.
- `DELAY_LEVEL`: 0 a 100.
- `REVERB_TIME`: 0.1 a 10.0.
- `REVERB_LEVEL`: 0 a 100.
- `MASTER_LEVEL`: 0 a 100.

## Template Vazio

```text
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
```

## Exemplo Completo

```text
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

NOTES=Timbre inspirado no som cortante e pesado de Jim Martin, com ataque forte e ambiencia discreta.

END_GT1_TONE_FORM
```

## Estado de Implementacao

Ja existem parser, normalizador, validador e escrita de JSON interno para este contrato.

A geracao de `.tsl` ainda esta pendente.
