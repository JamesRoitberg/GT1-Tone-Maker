# CONTEXT.md

Glossario vivo do GT-1 Tone Maker. Este arquivo ajuda agentes futuros a usarem a mesma linguagem do projeto.

## Termos principais

**GT-1 Tone Maker**  
Ferramenta em Node.js para ajudar usuario leigo a transformar uma referencia musical em uma base util de patch para BOSS GT-1.

**Usuario leigo**  
Pessoa que sabe descrever o timbre desejado, mas nao quer editar JSON, entender parametros internos ou montar um `.tsl` manualmente.

**Fluxo criar patch**  
Fluxo principal planejado: usuario informa uma referencia musical, a IA preenche um formulario de timbre, o app normaliza e valida os dados, e futuramente gera um `.tsl` importavel.

**Referencia musical**  
Texto digitado pelo usuario, como artista, banda, musica, album, guitarrista, era ou estilo.

**Tone intent**  
Intencao musical principal do timbre. No formulario aparece como `TONE_TYPE`, usando valores como `base`, `lead`, `crunch`, `clean`, `metal`, `rock`, `fuzz`, `solo` ou `outro`.

**Formulario de timbre**  
Formato de texto simples `GT1_TONE_FORM_V0_1`. E a unica saida que a IA deve gerar para o fluxo principal.

**AI JSON**  
Termo legado ou interno. No fluxo principal desejado, a IA deve preencher o `GT1_TONE_FORM_V0_1`; o JSON deve ser tratado como representacao interna depois que o formulario for lido, normalizado e validado.

**Parser**  
Parte que encontra o bloco `GT1_TONE_FORM_V0_1`, ignora texto fora dele e transforma linhas `CAMPO=VALOR` em um objeto interno simples.

**Normalizer**  
Parte tolerante do fluxo. Aplica defaults seguros e corrige formatos simples, como maiusculas/minusculas, `sim/nao`, porcentagem, virgula decimal e unidades comuns.

**Validator**  
Parte rigida do fluxo. Confere campos obrigatorios, campos desconhecidos, enums, ranges e formatos antes de permitir que o dado siga adiante.

**Schema / contrato**  
Conjunto de campos, enums, ranges e regras do `GT1_TONE_FORM_V0_1`. A fonte principal fica em `docs/gt1-tone-form-v0.1.md` e no contrato em codigo.

**JSON interno**  
Representacao normalizada e validada salva em `internal/`. E um detalhe da ferramenta, nao um arquivo para o usuario editar.

**Patch conceitual**  
Base musical inspirada na referencia do usuario. Nao promete copiar timbre oficial nem reproduzir exatamente equipamentos, mixagem ou gravacao original.

**.tsl base**  
Arquivo `.tsl` oficial exportado do BOSS Tone Studio e guardado em `base/`. Deve ser preservado e nao modificado diretamente.

**Arquivo final**  
Arquivo `.tsl` gerado pela ferramenta e salvo em `output/`. Deve ser importavel no BOSS Tone Studio quando o gerador existir.

**BOSS Tone Studio**  
Software oficial usado para importar, exportar e ajustar patches/livesets da BOSS GT-1.

## Linguagem do projeto

Prefira dizer que o projeto gera uma base util para ajuste fino.

Evite prometer copia perfeita, timbre oficial ou equivalencia exata com equipamentos reais.

Quando houver duvida, mantenha a separacao: referencia musical -> intencao musical -> formulario -> JSON interno validado -> futuro `.tsl`.
