# Instaclone

Projeto do Frontend em ReactJS onde foi refeito a interface do Instagram WEB, desenvolvido durante a semana Omnistack7, praticando os principais conceitos de ReactJS, ReactNative e NodeJs com MongoDB. 
Neste projeto eu adicionei uma funcionalidade extra no qual o usuário poderá comentar e visualizar os comentarios de cada foto em tempo real, utilizando a biblioteca *Socket.io*.

[![](https://thumbs2.imgbox.com/ed/25/KYJQGBoT_t.png)](http://werlendev.cf/instaclone/)<br/>
(clique na imagem para ver o site)

---
## Features do projeto
- **Postar foto:**

Ao clicar no icone de camera no cabeçalho da site o usuário e encaminhado para uma nova pagina de postagem onde irá fazer o upload da foto.
É usada a biblioteca *Multer* para fazer o envio da foto para o backend, e a biblioteca *Sharp* para otimizar o tamanho da imagem que está sendo enviada. Veja o exemplo de uso abaixo:

![alt text](https://s4.gifyu.com/images/post.gif)

- **Curtir foto:**

Ao clicar no icone de curtir, é enviada uma requisição para o backend que irá ser responsavel por contabilzar mais uma curtida sobre a foto.
Quando o backend termina o processo de adicionar mais uma curtida, ele envia para o frontend uma requisição com os dados atualizados da postagem, que é atualiza automaticamente o número de curtidas mostradas no frontend, usando  a biblioteca *Socket.io*. Veja o exemplo de uso abaixo:

![alt text](https://s4.gifyu.com/images/likee58c9b7eebad4489.gif)

  ---
## Features extras

- **Visualizar e adicionar comentários:**

Ao clicar sobre "Ver todos os comentários é aberta uma nova janela com uma lista de comentários sobre o post.
O usuário poderá adicionar um novo comentário sobre a postagem, que irá ser salvo no banco de dados. Ao concluir o processo o backend irá enviar uma requisição para o frontend através da biblioteca *Socket.io*, que fará o ReactJS atualizar a lista de comentários em tempo real sem precisar recarregar a página. Veja o exemplo de uso abaixo:

![alt text](https://s4.gifyu.com/images/comment214ab9272365390d.gif)
