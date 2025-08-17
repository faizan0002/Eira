import { Boom } from '@hapi/boom';
import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@whiskeysockets/baileys';
import qrcode from 'qrcode-terminal';
import dotenv from 'dotenv';
import { config } from './settingss.js';

dotenv.config();

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('Connection closed:', lastDisconnect?.error, 'Reconnecting:', shouldReconnect);
      if (shouldReconnect) {
        connectToWhatsApp();
      }
    } else if (connection === 'open') {
      console.log('Connected to WhatsApp!');
    }
    if (update.qr) {
      qrcode.generate(update.qr, { small: true });
      console.log('Scan the QR code with WhatsApp to authenticate.');
    }
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const chat = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
    const prefix = config.PREFIX;
    const command = text.slice(prefix.length).trim().split(' ')[0].toLowerCase();
    const args = text.slice(prefix.length).trim().split(' ').slice(1);

    if (!text.startsWith(prefix)) return;

    switch (command) {
      case 'ping':
        await sock.sendMessage(chat, { text: 'Pong!' });
        break;
      case 'menu':
        const menuText = `📜 *Eira Bot Menu* 📜\n\n` +
                         `👤 Owner: ${config.OWNER_NAME}\n` +
                         `🌍 Timezone: ${config.TIMEZONE}\n\n` +
                         `Commands:\n` +
                         `${prefix}ping - Check if bot is online\n` +
                         `${prefix}menu - Show this menu\n` +
                         `${prefix}info - Show bot info\n` +
                         `> *© Powered by Faizan Mukhtar*`;
        await sock.sendMessage(chat, { text: menuText });
        break;
      case 'info':
        await sock.sendMessage(chat, { text: `🤖 *Eira Bot*\nVersion: 1.0.0\nCreated by: Faizan Mukhtar` });
        break;
      default:
        await sock.sendMessage(chat, { text: `Unknown command: ${command}. Use ${prefix}menu to see available commands.` });
    }
  });
}

connectToWhatsApp().catch(err => console.error('Error:', err));