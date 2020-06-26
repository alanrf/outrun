# outrun
Simple project using JS P5 library to create a game similar to an arcade Outrun.


Done:
==========
11/03/2018
- Desenhar pista (grama, borda e rua)

12/03/2018
- Movimentar na pista (frente, traz, esquerda e direita)

15/03/2018
- Alteração na lógica de renderização, ao invés de criar os objetos e as linhas na hora
	de renderizar, cria um array de linhas que serão desenhadas depois.
- Agora a pista possui curvas para esquerda e direita.
- Agora a pista possui subidas e descidas.
- Adicionado renderizar arvores, arbustos e outros (com bug)

16/03/2018
- Corrigido bug de renderização da pista que fazia após qualquer morro apresentar pedaços
	perdidos de pista.
- Corrigido bug de renderização da pista quando chegava ao limite dela até o recomeço.

25/06/2020
- Identação e melhorias de código para facilitar a leitura do mesmo


To do:
======
- Adicionar velocidade
- Corrigir apresentação de 'sprites' (arvores e outros) para deixar num tamanho melhor e
	movimentando conforme se chega mais próximo.
- Adicionar 3 faixas de rodagem na pista.
- Adicionar arrasto para ficar fora da pista nas curvas se não corrigir a direção.
- Adicionar carro na pista
- Considerar colisão
- Exibir outros veículos na pista.