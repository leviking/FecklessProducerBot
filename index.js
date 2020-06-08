const Discord = require('discord.js');
const Sequelize = require('sequelize');

const {
	prefix,
	token,
	db,
	dbUser,
	dbPass
      } = require('./config.json');

const client = new Discord.Client();
const sequelize = new Sequelize(db, dbUser, dbPass, {
	host: 'localhost',
	dialect: 'mariadb',
	logging: false
});

const RollCalls = sequelize.define('RollCalls', {
	guild: Sequelize.STRING,
	channel: Sequelize.STRING,
	channelName: Sequelize.STRING,
	user: Sequelize.STRING,
	nick: Sequelize.STRING,
	listened: Sequelize.BOOLEAN,
	duration: Sequelize.INTEGER,
	technicalDifficulty: Sequelize.BOOLEAN
})

client.once('ready', () => {
	RollCalls.sync();
	console.log('Ready!');
});

client.on('message', async message => {
    if (message.content === '#roll_call') {
	let guild = message.guild
	let member = guild.member(message.author)
	
	try {
	  const roll_call = await RollCalls.create({
	    guild:       guild.id,
	    channel:     message.channel.id,
	    channelName: message.channel.name,
	    user:        member.id,
	    nick:        member.displayName
	  })
	} catch(e) {
	  console.log(e)
	} finally {
	  //console.log(roll_call )
	  //console.log(guild.channels)
	  //console.log(`added`)
          //message.reply(message.createdTimestamp)

	}
    }
});



client.login(token);
