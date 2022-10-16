### WhatsApp MD user bot

### Setup
## Deploy on Heroku
1. Click [SCAN](https://levanter.up.railway.app/md) and scan QR through Whatsapp Linked Devices Option in Your whatsapp App.
2. You will get a session id in whatsapp, copy id only.
3. If You don't have a account in [Heroku](https://signup.heroku.com/), Create a account.
4. Click [FORK](https://github.com/lyfe00011/whatsapp-bot-md/fork)
5. Now [DEPLOY](https://levanter.up.railway.app/dmd)

   <a href="https://chat.whatsapp.com/Jl6U29pBwmWLG3OOOfdPPt"><img alt="WhatsApp" src="https://img.shields.io/badge/-Whatsapp%20Group-lightgrey?style=for-the-badge&logo=whatsapp&logoColor=white"/></a>

## Deploy on VPS or PC (Example here as in Ubuntu)

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
TZ=Asia/Kolkata
```

ctrl + o and ctrl + x

7. start and stop bot

To start bot
```
npm start  
```

To stop bot 
```
ctrl + c
npm stop
```
### Thanks To

- [Yusuf Usta](https://github.com/Quiec) for [WhatsAsena](https://github.com/yusufusta/WhatsAsena)
- [@adiwajshing](https://github.com/adiwajshing) for [Baileys](https://github.com/adiwajshing/Baileys)
