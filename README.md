# Eira WhatsApp Bot

<div align="center">
  <img src="https://litter.catbox.moe/esoefkh31einqyxl.JPG" alt="Eira Logo" width="300">
</div>

Eira is a lightweight, automated WhatsApp bot built with Node.js and the Baileys library. Created by Faizan Mukhtar, it provides basic features like command handling, group management, and media downloading. Designed for simplicity and ease of deployment, Eira can be set up using a mobile device on a free hosting platform like Render.

## Key Features

| Feature | Description |
|---------|-------------|
| **Menu Commands** | Access bot commands via a simple menu system. |
| **Ping Command** | Check if the bot is online. |
| **Info Command** | Display bot information and version. |

## Stats & Overview

- **Version**: 1.0.0
- **License**: Apache 2.0
- **Language**: JavaScript (Node.js)
- **Dependencies**: Baileys, Axios, PM2, and more (see `package.json`).

## Setup Guide (No PC Required)

Follow these steps to deploy Eira on **Render** using a mobile device or web browser:

### 1. Fork the Repository
1. Open your mobile browser (e.g., Chrome) and go to [GitHub](https://github.com).
2. Sign in or create a GitHub account.
3. Create a new repository:
   - Tap the "+" icon (top-right) and select **New repository**.
   - Name it (e.g., `Eira`).
   - Set it to **Public** and check **Add a README file**.
   - Tap **Create repository**.
4. Upload the files:
   - Download the files from this guide (copy-paste each into a text editor like Google Docs or Notes on your phone, then save with the correct file names: `Dockerfile`, `package.json`, `index.js`, `settingss.js`, `app.json`, `LICENSE`).
   - In your GitHub repository, tap **Add file** > **Create new file**.
   - Paste the content of each file, name it correctly (e.g., `index.js`), and tap **Commit new file**.
   - Repeat for all files.

### 2. Obtain Your SESSION_ID
1. After deploying (see below), Render will run the bot and display a QR code in the logs.
2. Open WhatsApp on your phone:
   - Go to **Settings** > **Linked Devices** > **Link a Device**.
   - Scan the QR code displayed in the Render logs to authenticate.
3. The SESSION_ID will be saved automatically in the `auth_info_baileys` folder (managed by Baileys).

### 3. Deploy on Render
1. Open your mobile browser and go to [Render](https://render.com).
2. Sign up or log in (you can use your GitHub account).
3. Create a new web service:
   - Tap **New** > **Web Service**.
   - Connect your GitHub account and select your `Eira` repository.
   - Set the following:
     - **Name**: `eira-bot`
     - **Environment**: Docker
     - **Region**: Choose the closest (e.g., Oregon for US users).
     - **Branch**: `main`
     - **Instance Type**: Free
   - Add environment variables (from `app.json`):
     - `SESSION_ID`: Leave empty (QR code will handle authentication).
     - `OWNER_NUMBER`: `923296269525`
     - `OWNER_NAME`: `Faizan Mukhtar`
     - `PREFIX`: `.`
     - `TIMEZONE`: `Asia/Karachi`
   - Tap **Create Web Service**.
4. Wait for the deployment to complete (5-10 minutes). Check the **Logs** tab for the QR code.

### 4. Test the Bot
1. Open WhatsApp and send a message to your bot’s number (the one linked via QR code).
2. Try commands:
   - `.ping`: Should reply with "Pong!"
   - `.menu`: Displays the command menu.
  3. If the bot doesn’t respond, check Render logs for errors.

## Docker Support
The `Dockerfile` enables containerized deployment:
```dockerfile
FROM node:lts-buster

WORKDIR /app

COPY . .

RUN npm install && npm install -g pm2

EXPOSE 7860

CMD ["npm", "start"]
```

## License
Licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## Disclaimer
- Eira is not affiliated with WhatsApp Inc.
- Use responsibly to avoid account bans.
- Do not modify or redistribute without proper credit.

## Credits
- **Developer**: Faizan Mukhtar
- **Contact**: faizanmukhtar001@icloud.com

## Support
- Star your GitHub repository to show support!
- Report issues via GitHub or contact the developer.

<div align="center">
  <img src="https://i.imgur.com/LyHic3i.gif" alt="Divider" width="100%">
</div>
