### WhatsApp MD user bot

A simple Whatsapp User bot

## Setup

1. ### Deploy on Heroku
   1. Click [SCAN](https://levanter.onrender.com/md) and scan QR through Whatsapp Linked Devices Option in Your whatsapp App.
   2. You will get a session id in whatsapp, copy id only.
   3. If You don't have a account in [Heroku](https://signup.heroku.com/), [Create a account Now](https://signup.heroku.com/).
   4. If You Don't have a github account [SignUp](https://github.com/join) Now.
   5. [FORK](https://github.com/lyfe00011/whatsapp-bot-md/fork) this repo
   6. Now [DEPLOY](https://levanter.onrender.com/dmd)
2. ### Deploy on koyeb
   1. Create an account in [koyeb](https://app.koyeb.com/auth/signup). [SignUp Now](https://app.koyeb.com/auth/signup)
   2. Get [DATABASE_URL](https://github.com/lyfe00011/whatsapp-bot-md/wiki/DATABASE_URL), You needs while depolying
   3. Get [SESSION_ID](https://levanter.onrender.com/md), Open Linked Devices in WhatsaApp and [SCAN](https://levanter.onrender.com/md) Now.
   4. Get Koyeb API key. [Let Go](https://app.koyeb.com/account/api)
   5. [DEPLOY](https://levanter.onrender.com/koyeb) Now.
   6. Enter [Environment Variables](https://github.com/lyfe00011/whatsapp-bot-md/wiki/Environment_Variables), [Read More](https://github.com/lyfe00011/whatsapp-bot-md/wiki/Environment_Variables)
   7. Enter Name and Click Create service
3. ### Deploy on VPS or PC (Example here as in Ubuntu

   1. Install git ffmpeg curl
      ```
       sudo apt -y update &&  sudo apt -y upgrade
       sudo apt -y install git ffmpeg curl
      ```
   2. Install nodejs

      ```
      sudo apt -y remove nodejs
      curl -fsSl https://deb.nodesource.com/setup_lts.x | sudo bash - && sudo apt -y install nodejs
      ```

   3. Install yarn

      ```
      curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
      echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
      sudo apt -y update && sudo apt -y install yarn
      ```

   4. Install pm2

      ```
      sudo yarn global add pm2
      ```

   5. Clone Repo and install packages

      ```
      git clone https://github.com/lyfe00011/whatsapp-bot-md
      cd whatsapp-bot-md
      yarn install --network-concurrency 1
      ```

   6. Enter Environment Variables

      ```
      touch config.env
      nano config.env
      ```

      copy paste lines below (remove SESSION_ID if not needs)

      ```
      SESSION_ID = Session_Id_you_Got_After_Scan_Dont_Add_This_Line_If_You_Can_Scan_From_Terminal_Itself
      PREFIX = .
      STICKER_PACKNAME = LyFE
      ALWAYS_ONLINE = false
      RMBG_KEY = null
      LANGUAG = en
      WARN_LIMIT = 3
      FORCE_LOGOUT = false
      BRAINSHOP = 159501,6pq8dPiYt7PdqHz3
      MAX_UPLOAD = 200
      REJECT_CALL = false
      SUDO = 989876543210
      TZ = Asia/Kolkata
      VPS = true
      AUTO_STATUS_VIEW = true
      SEND_READ = false
      ```

      [Read More](https://github.com/lyfe00011/whatsapp-bot-md/wiki/Environment_Variables)

      ctrl + o and ctrl + x, To save and exit

   7. start and stop bot

      To start bot `npm start`,
      To stop bot `npm stop`

### Thanks To

- [Yusuf Usta](https://github.com/Quiec) for [WhatsAsena](https://github.com/yusufusta/WhatsAsena)
- [@adiwajshing](https://github.com/adiwajshing) for [Baileys](https://github.com/adiwajshing/Baileys)
