const Discord = require('discord.js')
const client = new Discord.Client()
let prefix = "?"


client.login('process.env.TOKEN')

client.on('ready', function () {
  client.user.setGame('» Préparation V1 du bot')
})

client.on('guildMemberAdd', function (member) {
    let embed = new Discord.RichEmbed()
        .setDescription(':tada: **' + member.user.username + '** a rejoint ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('636867803722285066').send(embed)
    member.addRole('640276012466438146')
})
 
client.on('guildMemberRemove', function (member) {
    let embed = new Discord.RichEmbed()
        .setDescription(':cry: **' + member.user.username + '** a quitté ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('636867803722285066').send(embed)
})

client.on('message', function (message) {
  if (message.content === "tu fais quoi?") {
      message.channel.sendMessage('Je mange des pâtes dans ma pastabox ! :heart:')
      console.log('répond à tfq')
  }
})

/*Kick*/
client.on('message', function (message) {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  if (args[0].toLowerCase() === prefix + 'kick') {
     if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
     let member = message.mentions.members.first()
     if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
     if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
     if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur :sunglass:")
     member.kick()
     message.channel.send('**' + member.user.username + '** a été kick avec succès :white_check_mark:')
  }
})

/*Ban*/
client.on('message', function (message) {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  if (args[0].toLocaleLowerCase() === prefix + 'ban') {
     if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
     let member = message.mentions.members.first()
     if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
     if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
     if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglass:")
     message.guild.ban(member, {days: 7})
     message.channel.send('**' + member.user.username + '** a été banni avec succès :white_check_mark:')
  }
})

client.on('message', function (message) {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  if (args[0].toLowerCase() === prefix + "clear") {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
      let count = parseInt(args[1])
      if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
      if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
      if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
      message.channel.bulkDelete(count + 1, true)
  }

  if (args[0].toLowerCase() === prefix + "mute") {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
      let member = message.mentions.members.first()
      if (!member) return message.channel.send("Membre introuvable")
      if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
      if (!member.manageable) return message.channel.send("Je ne peux pas mute ce membre")
      let muterole = message.guild.roles.find(role => role.name === 'Muted')
      if (muterole) {
          member.addRole(muterole)
          message.channel.send(member + ' a été mute avec succès :white_check_mark:')
      }
      else {
          message.guild.createRole({name: 'Muted', permissions: 0}).then(function (role) {
              message.guild.channels.filter(channel => channel.type === 'text').forEach(function (channel) {
                  channel.overwritePermissions(role, {
                      SEND_MESSAGES: false
                  })
              })
              member.addRole(role)
              message.channel.send(member + ' a été mute avec succès :white_check_mark:')
          })
      }
  }
})


