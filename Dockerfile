FROM quay.io/lyfe00011/md:4.44
RUN git clone https://github.com/lyfe00011/whatsapp-bot-md.git /root/LyFE/
WORKDIR /root/LyFE/
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]