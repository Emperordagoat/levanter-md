const config = require('../config')
const { bot, setVars, getVars, delVar } = require('../lib/index')
const { restartInstance } = require('../lib/pm2')

if (config.VPS) {
	bot(
		{
			pattern: 'getvar ?(.*)',
			fromMe: true,
			desc: 'Show var',
			type: 'vps',
		},
		async (message, match) => {
			if (!match) return await message.send(`*Example : getvar sudo*`)
			const vars = getVars()
			match = match.toUpperCase()
			if (vars[match]) return await message.send(`${match} = ${vars[match]}`)
			return await message.send(`_${match} not found in vars_`)
		}
	)

	bot(
		{
			pattern: 'delvar ?(.*)',
			fromMe: true,
			desc: 'delete var',
			type: 'vps',
		},
		async (message, match) => {
			if (!match) return await message.send(`*Example : delvar sudo*`)
			const vars = getVars()
			match = match.toUpperCase()
			if (!vars[match])
				return await message.send(`_${match} not found in vars_`)
			delVar(match)
			await message.send(`_${match} deleted_`)
			restartInstance()
		}
	)

	bot(
		{
			pattern: 'setvar ?(.*)',
			fromMe: true,
			desc: 'set var',
			type: 'vps',
		},
		async (message, match) => {
			const keyValue = match.split('=')
			if (!match || keyValue.length < 2)
				return await message.send(`*Example : setvar sudo = 91987653210*`)
			setVars({ [keyValue[0].trim().toUpperCase()]: keyValue[1].trim() })
			await message.send(`_new var ${keyValue[0].toUpperCase()} added_`)
			restartInstance()
		}
	)

	bot(
		{
			pattern: 'allvar ?(.*)',
			fromMe: true,
			desc: 'Show All var',
			type: 'vps',
		},
		async (message, match) => {
			const vars = getVars()
			let allVars = ''
			for (const key in vars) {
				allVars += `${key} = ${vars[key]}\n\n`
			}
			return await message.send(allVars.trim())
		}
	)
}
