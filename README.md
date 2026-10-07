# Lacs Bot

Bot avanzado de Discord para servidores con:
- Verificación Roblox + Discord
- Sistema de staff
- Economía con coins
- Registro de usuarios
- IA con OpenAI
- Tickets de soporte
- Mercado
- Inventario

## Requisitos
- Node.js 18+
- MongoDB
- Discord Bot Token
- OpenAI API Key (opcional)
- Roblox API key (opcional para validación robusta)

## Instalación

1. Clona el repositorio.
2. Instala dependencias:

```bash
npm install
```

3. Copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

4. Edita el archivo `.env` con tus datos reales.

5. Inicia el bot:

```bash
npm start
```

## Variables de entorno

- `DISCORD_TOKEN`: token del bot
- `CLIENT_ID`: ID del cliente de Discord
- `GUILD_ID`: ID del servidor
- `MONGO_URI`: conexión a MongoDB
- `OPENAI_API_KEY`: clave para la IA
- `ROBLOX_API_KEY`: clave para Roblox API
- `OWNER_ID`: ID del propietario del bot
- `PREFIX`: prefijo del bot (por defecto: !)
- `PORT`: puerto del servidor HTTP (Railway usa esto automáticamente)

## Comandos principales

- `!register`
- `!verify`
- `!setroblox <nombre>`
- `!balance`
- `!daily`
- `!work`
- `!shop`
- `!buy <item>`
- `!sell <item>`
- `!inventory`
- `!ticket <motivo>`
- `!close`
- `!ai <mensaje>`
- `!ban @usuario`
- `!kick @usuario`
- `!warn @usuario`
- `!clear 10`
- `!help`

## Deploy en Railway

1. Conecta tu repositorio a Railway.
2. Agrega estas variables en el panel de Railway:
   - `DISCORD_TOKEN`
   - `CLIENT_ID`
   - `GUILD_ID`
   - `MONGO_URI`
   - `OPENAI_API_KEY`
   - `ROBLOX_API_KEY`
   - `OWNER_ID`
   - `PREFIX`
3. Haz deploy.
4. El servicio quedará activo usando el puerto `PORT` definido por Railway.

## Nota

Este bot está preparado para un despliegue práctico y funcional, con base MongoDB y soporte HTTP para Railway.
