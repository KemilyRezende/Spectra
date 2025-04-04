# Spectra

Gerador de paletas de cores a partir da cor escolhida pelo usuário. Projeto responsivo.

## Sobre

  - **Frontend**: HTML, CSS, SASS
  - **Backend**: JavaScript (responsável pelos cálculos das paletas, mas sem armazenamento de dados)

### Funcionalidades

 - Escolha de cor via seletor HSL (Hue, Saturation, Lightness) com três inputs separados.
 - Geração de paletas baseadas na teoria das cores:
    - Monocromática
    - Análoga
    - Triádica
    - Complementar
    - Complementar partida
 - Possibilidade de transformar uma paleta gerada em Neon ou Pastel.
  

## Estrutura

### Frontend

  - `Home`: Apresentação inicial do gerador.
  - `ColorPalletes`: Explica e apresenta cada tipo de geração de paleta.
  - `Geradores`: Cada esquema de cor possui um arquivo separado, seguindo os princípios da teoria das cores.
  - **Responsividade**: O layout foi desenvolvido seguindo princípios de design responsivo, garantindo boa usabilidade em diferentes tamanhos de tela.

### Backend

Arquivo JavaScript contendo todas as funções necessárias para capturar, processar e exibir as paletas.

## Visualização

Acesse e utilize o projeto diretamente pelo link:

[link para o site](https://kemilyrezende.github.io/Spectra/index.html)

## Como executar

O projeto está hospedado e pode ser acessado diretamente pelo link acima. Não é necessário instalação ou configuração adicional. Caso queira rodar localmente:

1. Clone o repositório:
  ```sh
  git clone https://github.com/KemilyRezende/Spectra.git
  cd Spectra
  ```

2. Abra o arquivo `index.html` diretamente no navegador.
