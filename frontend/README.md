# To-Do List — Frontend (React + Vite)

## Como rodar
1. Suba o backend (porta 3333) — lembre-se de renomear `_env` para `.env` e rodar o `schema.sql`.
2. Neste projeto:
   ```bash
   npm install
   npm run dev
   ```
3. Abra http://localhost:5173

Em desenvolvimento o Vite faz proxy de `/api` para `http://localhost:3333`, então não há problema de CORS.
Para produção, defina `VITE_API_URL` (veja `.env.example`) e ajuste o CORS do backend (abaixo).

## Ajuste necessário no backend (produção / sem proxy)
O `@fastify/cors` só libera `GET, HEAD, POST` por padrão — `PATCH` e `DELETE` seriam bloqueados pelo navegador.
Em `server.js`:

```js
await app.register(cors, {
  origin: CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
});
```

## Imagem de fundo própria
Coloque o arquivo em `public/background.jpg` e crie `.env` com `VITE_BG_IMAGE=/background.jpg`.
