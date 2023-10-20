FROM quay.io/lyfe00011/md:beta
RUN git clone https://lyfe00011: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@github.com/lyfe00011/hk.git /root/LyFE/
WORKDIR /root/LyFE/
RUN yarn install --network-concurrency 1
CMD ["npm", "start"]