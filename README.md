<div align="center">
<img src="https://user-images.githubusercontent.com/121572094/212936585-6b15ab2d-8200-4368-9de7-23b78c3816cc.gif" width="700px">
</div>

<br>
Esse é um To-do list vinculado a sua conta do GitHub, que mantém todas as notas salvas no banco de dados Firestore.

Essa aplicação também conta com um sistema de contribuição, onde o usuário pode realizar um pagamento com o PayPal, e então seu avatar irá aparecer na página inicial, além disso uma mensagem de agradecimento irá ser exibida na parte inferir do board.
<br>
<div align="center">
<img src="https://user-images.githubusercontent.com/121572094/212936606-e6f1b5f3-e0f0-497e-bd88-ad9090d9f571.png" width="700px">
<img src="https://user-images.githubusercontent.com/121572094/212936617-4d827da8-5671-4d2d-89ac-f29af44631fa.png" width="700px">
</div>

## Como começar

Primeiro, execute o servidor de desenvolvimento:

```bash
npm run dev
# or
yarn dev
```

1. Crie um arquivo `.env.local` na raiz da aplicação, com as credenciais do GitHub, para que funcione o sistema de login. Essas credenciais estão sendo usadas em `pages/api/auth/nextauth.js`. [Veja como criar suas credenciais](https://docs.github.com/pt/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

2. Em `services/firebaseConnection.ts` adicione as credeciais do seu banco de dados Firestore dentro de `firebaseConfig`. [Veja como criar suas credenciais do Firebase](https://firebase.google.com/docs/web/setup)

3. Abra [http://localhost:3000](http://localhost:3000) no seu browser para ver o resultado.
   <br>
   
## Tecnologias Usadas
- React
- NextJS
- TypeScript
- Next Auth
- Sass
<br>

# Fimm woww! 🔥

Agora é só usar a aplicação Board!
<br>

# Acompanhe nossas redes:

- **[Canal no youtube](https://www.youtube.com/@pedro.arraujo)**
- **[Instagram](https://www.instagram.com/pedro.arraujo)**
