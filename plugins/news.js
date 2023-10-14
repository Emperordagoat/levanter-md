const { bot, generateList, getJson } = require('../lib/')

bot(
  {
    pattern: 'news ?(.*)',
    fromMe: true,
    desc: 'malayalam news',
    type: 'misc',
  },
  async (message, match) => {
    if (!match) {
      const { result } = await getJson('https://levanter.onrender.com/news')
      return await message.send(
        generateList(
          result.map(({ title, url, time }) => ({
            text: `🆔 &id\n🗞${title}${time ? `\n🕒${time}` : ''}\n`,
            id: `news ${url}`,
          })),
          'Malayalam News',
          message.jid,
          message.participant
        )
      )
    }
    if (match.startsWith('http')) {
      const { result } = await getJson(`https://levanter.onrender.com/news?url=${match}`)
      return await message.send(result, { quoted: message.data })
    }
  }
)
