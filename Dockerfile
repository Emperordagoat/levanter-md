FROM quay.io/lyfe00011/md:beta
ADD . /root/LyFE/
WORKDIR /root/LyFE/
RUN yarn install --network-concurrency 1
CMD ["npm", "start"]