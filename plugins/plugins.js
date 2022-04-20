const {
	bot,
	parseGistUrls,
	getPlugin,
	setPlugin,
	pluginsList,
	delPlugin,
} = require('../lib/')
const { writeFileSync, unlinkSync } = require('fs')
const got = require('got')

bot(
	{
		pattern: 'plugin ?(.*)',
		fromMe: true,
		desc: 'Install External plugins',
		type: 'misc',
	},
	async (message, match) => {
		match = match || message.reply_message.text
		if (!match && match !== 'list')
			return await message.sendMessage('*Example : plugin url*')
		if (match == 'list') {
			const plugins = await getPlugin()
			if (!plugins) return await message.sendMessage(`*Plugins not installed*`)
			let msg = ''
			plugins.map(({ name, url }) => {
				msg += `${name} : ${url}\n`
			})
			return await message.sendMessage('```' + msg + '```')
		}
		const isValidUrl = parseGistUrls(match)
		if (!isValidUrl) {
			const { url } = await getPlugin(match)
			if (url) return await message.sendMessage(url, { quoted: message.data })
		}
		if (!isValidUrl)
			return await message.sendMessage('*Give me valid plugin urls*')
		for (const url of isValidUrl) {
			try {
				const res = await got(url)
				if (res.statusCode == 200) {
					let plugin_name = /pattern: ["'](.*)["'],/g.exec(res.body)
					plugin_name = plugin_name[1].split(' ')[0]
					writeFileSync('./plugins/' + plugin_name + '.js', res.body)
					try {
						require('./' + plugin_name)
					} catch (e) {
						await message.sendMessage(e.stack, { quoted: message.quoted })
						return unlinkSync('./plugins/' + plugin_name + '.js')
					}
					await setPlugin(plugin_name, url)
					await message.sendMessage(
						`_Newly installed plugins are : ${pluginsList(res.body).join(',')}_`
					)
				}
			} catch (error) {
				await message.sendMessage(`${error}\n${url}`)
			}
		}
	}
)

bot(
	{
		pattern: 'remove ?(.*)',
		fromMe: true,
		desc: 'Delete External Plugins',
		type: 'misc',
	},
	async (message, match) => {
		if (!match) return await message.sendMessage('*Example : remove mforward*')
		if (match == 'all') {
			await delPlugin()
			return await message.sendMessage(
				'_All plugins deleted Successfully_\n*Restart BOT*'
			)
		}
		const isDeleted = await delPlugin(match)
		if (!isDeleted)
			return await message.sendMessage(`*Plugin ${match} not found*`)
		delete require.cache[require.resolve('./' + match + '.js')]
		unlinkSync('./plugins/' + match + '.js')
		return await message.sendMessage('_Plugin Deleted_\n*Restart BOT*')
	}
)
