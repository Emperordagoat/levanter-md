### Levanter-MD Whatsapp User Bot

A simple WhatsApp User bot.

## Setup Tutorial

1. Deploy to Heroku
   - Click [SCAN](https://qr-hazel-alpha.vercel.app/session) and scan the QR code through the "WhatsApp Linked Devices" option in your WhatsApp app.
   - You will get a session ID in WhatsApp, copy the ID only.
   - If you don't have an account on [Heroku](https://signup.heroku.com/), [create an account now](https://signup.heroku.com/).
   - If you don't have a GitHub account, [sign up](https://github.com/join) now.
   - [FORK](https://github.com/Giftedmaurice/levanter-md/fork) this repository.
   - Now [DEPLOY](https://heroku.com/deploy?template=https://github.com/Giftedmaurice/levanter-md/tree/main).

2. Deploy to Koyeb
   - Create an account on [Koyeb](https://app.koyeb.com/auth/signup). [Sign up now](https://app.koyeb.com/auth/signup).
   - Get [DATABASE_URL](https://github.com/lyfe00011/whatsapp-bot-md/wiki/DATABASE_URL). You'll need this while deploying.
   - Get [SESSION_ID](https://qr-hazel-alpha.vercel.app/session). Open Linked Devices in WhatsApp and [SCAN](https://qr-hazel-alpha.vercel.app/session) now.
   - Get the Koyeb API key. [Let's Go](https://app.koyeb.com/account/api).
   - [DEPLOY](https://qr-hazel-alpha.vercel.app/koyeb) now.
   - Enter [Environment Variables](https://github.com/lyfe00011/whatsapp-bot-md/wiki/Environment_Variables). [Read More](https://github.com/lyfe00011/whatsapp-bot-md/wiki/Environment_Variables).
   - Enter a name and click "Create Service."

3. Deploy on VPS or PC (Example here as in Ubuntu)

   - Install with script

         wget -N -O levanter.sh http://bit.ly/43JqREw && chmod +x levanter.sh && ./levanter.sh

   - Install without a script
       - Install git, ffmpeg, and curl:

             sudo apt -y update && sudo apt -y upgrade
             sudo apt -y install git ffmpeg curl

       - Install nodejs:

             sudo apt -y remove nodejs
             curl -fsSl https://deb.nodesource.com/setup_lts.x | sudo bash - && sudo apt -y install nodejs

       - Install yarn:

             npm install -g yarn

       - Install pm2:

             sudo yarn global add pm2

       - Clone the repository and install packages:

             git clone https://github.com/Giftedmaurice/levanter-md botName
              cd botName
               yarn install --network-concurrency 1

       - Enter Environment Variables: Copy-paste the lines below (remove SESSION_ID if not needed):

             echo "SESSION_ID = Session_Id_you_Got_After_Scan_Dont_Add_This_Line_If_You_Can_Scan_From_Terminal_Itself
             PREFIX = .
             STICKER_PACKNAME = GiftedTech
             ALWAYS_ONLINE = true
             RMBG_KEY = DJwc34NaWmhXmDxEeh6YUEmm
             LANGUAG = en
             WARN_LIMIT = 5
             FORCE_LOGOUT = false
             BRAINSHOP = 159501,6pq8dPiYt7PdqHz3
             MAX_UPLOAD = 250
             REJECT_CALL = false
             SUDO = 254728782591
             TZ = Africa/Nairobi
             VPS = true
             AUTO_STATUS_VIEW = true
             SEND_READ = false
             AJOIN = true
             DISABLE_START_MESSAGE = false
             PERSONAL_MESSAGE = null" > config.env

    - [Read More](https://github.com/Giftedmaurice/levanter-md/wiki/Environment_Variables)

    - Edit the `config.env` using nano if needed. To save, press `Ctrl + O`, then press `Enter`, and to exit, press `Ctrl + X`.

    - Start and stop the bot:
        - To start the bot: `pm2 start . --name botName --attach --time`
        - To stop the bot: `pm2 stop botName`

### Thanks To

- [Gifted Tech](https://github.com/Giftedmaurice/levanter-md/tree/main)
- [@adiwajshing](https://github.com/adiwajshing) for [Baileys](https://github.com/adiwajshing/Baileys)
