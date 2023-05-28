const { bot, summary, setBudget, delBudget } = require('../lib/index')

bot(
	{
		pattern: 'income ?(.*)',
		fromMe: true,
		desc: 'to set income',
		type: 'budget',
	},
	async (message, match) => {
		const [type, amount, remark] = match.split(',')
		if (!type && !amount)
			return await message.send(
				'*Missing type*\n*Example : income type,amount,remark*\n*income salary, 500*\n\n*remark is optional*'
			)
		const res = await setBudget(
			message.participant,
			'income',
			type,
			amount,
			remark
		)
		await message.send(`*Income of current month is ${res}*`)
	}
)

bot(
	{
		pattern: 'expense ?(.*)',
		fromMe: true,
		desc: 'to set expense',
		type: 'budget',
	},
	async (message, match) => {
		const [type, amount, remark] = match.split(',')
		if (!type || !amount)
			return await message.send(
				'*Missing type*\n*Example : expense type,amount,remark*\n*expense movie, 200, movie_name*\n\n*remark is optional*'
			)
		const res = await setBudget(
			message.participant,
			'expense',
			type,
			amount,
			remark
		)
		await message.send(`*Expense of current month is ${res}*`)
	}
)

bot(
	{
		pattern: 'delBudget ?(.*)',
		fromMe: true,
		desc: 'to delete income | expense',
		type: 'budget',
	},
	async (message, match) => {
		const [type, item, amount] = match.split(',')
		if (!type || (type != 'income' && type != 'expense') || !item || !amount)
			return await message.send(
				'*Missing type*\n*Example : delbudget type,item,amount*\n*delbudget income, salary, 1000*'
			)
		const res = await delBudget(message.participant, type, item, amount)
		if (!res) return await message.send(`_${type} and ${item} not in list._`)
		await message.send(`_${item} removed from the list._`)
	}
)

bot(
	{
		pattern: 'summary ?(.*)',
		fromMe: true,
		desc: 'to get summary of budget',
		type: 'budget',
	},
	async (message, match) => {
		const budget = await summary(message.participant)
		await message.send(
			budget,
			{
				fileName: 'summary.pdf',
				mimetype: 'application/pdf',
			},
			'document'
		)
	}
)
