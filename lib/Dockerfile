# 
#    * @project_name : levanter-md
#    * @author : @giftedtechnexus
#    * @youtube : https://www.youtube.com/@giftedtechnexus
#    * @description : levanter-md ,A Multi-functional whatsapp bot md.
#    * @version 1.0.0
# 
# Don't change this [ /Giftedmaurice/ ] name!
# Change from below link, else bot not works!

FROM quay.io/Giftedmaurice/md:beta
RUN git clone https://github.com/Giftedmaurice/levanter-md.git /root/Giftedmaurice/
WORKDIR /root/Giftedmaurice/
RUN npm install
EXPOSE 8000
CMD ["npm", "start" ]
