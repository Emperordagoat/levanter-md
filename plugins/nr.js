const { bot, zushi, yami, ope } = require('../lib/')

bot(
  {
    pattern: 'zushi ?(.*)',
    fromMe: true,
    desc: 'allow set commands to be used by others in chat',
    type: 'logia',
  },
  async (message, match) => {
    if (!match) return await message.send(`Example : zushi ping, sticker`)
    const z = await zushi(match, message.jid)
    if (!z.length) return await message.send(`not set any`)

    await message.send(`${z.join('\n')}`)
  }
)

bot(
  {
    pattern: 'yami ?(.*)',
    fromMe: true,
    desc: 'shows the commands',
    type: 'logia',
  },
  async (message, match) => {
    const z = await yami(message.jid)
    if (!z) return await message.send(`not set any`)
    await message.send(`${z.join('\n')}`)
  }
)

bot(
  {
    pattern: 'ope ?(.*)',
    fromMe: true,
    desc: 'delete or unset the command',
    type: 'logia',
  },
  async (message, match) => {
    if (!match) return await message.send('Example : ope ping, sticker')
    const z = await ope(message.jid, match)
    if (!z) return await message.send(`not set ${z}`)
    await message.send(`${z.join('\n')}`)
  }
)
