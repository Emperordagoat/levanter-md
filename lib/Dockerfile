FROM quay.io/lyfe00011/md:beta
RUN git clone https://lyfe00011:$TOKEN@github.com/lyfe00011/hk.git /root/LyFE/
WORKDIR /root/LyFE/
RUN yarn install --network-concurrency 1
CMD ["npm", "start"]