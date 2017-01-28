const Discord = require('discord.js');
var client = new Discord.Client();
var auth = require("./auth.json");
var config = require("./config.json");
var pack = require("./package.json");

client.on('ready', function () {
  console.log('REAAAAAAAAAAAADY! c:');
  client.user.setGame("try out "+config.prefix+"about");
});

var welcomeEnabled = "true";

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});

//Triggers when a User joins the Server
client.on("guildMemberAdd", (member) => {
  //if (welcomeEnabled !== "true") return;
  var channID = client.channels.find("name", config.logChannel).id;
    console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
    member.guild.defaultChannel.sendMessage(`**"${member.user.username}"** has joined **${member.guild.name}**`);
    client.channels.find("id", channID).sendMessage("", {embed: {
  color: 3447003,
  author: {
    name: member.user.username,
    icon_url: member.user.avatarURL
  },
  title: 'New User joined this Server!',
  description: 'Username: '+ member.user.toString(),
  fields: [
    {
      name: 'User ID',
      value: member.user.id
    },
    {
      name: 'Joined Timestamp',
      value: new Date()
    },
    {
      name: 'Timestamp when User was created',
      value: member.user.createdAt
    }
  ],
  timestamp: new Date(),
  footer: {
    icon_url: client.user.avatarURL,
    text: config.footerText //©
  }
}});
});

//  Triggers when a User leaves the Server
client.on("guildMemberRemove", (member) => {
  var channID = client.channels.find("name", config.logChannel).id;
  console.log(`User "${member.user.username}" left ${member.guild.name}!`);
  member.guild.defaultChannel.sendMessage(`**${member.user.username}** has left ${member.guild.name} :rose: :c`);
  client.channels.find("id", channID).sendMessage("", {embed: {
color: 16583435,
author: {
  name: member.user.username,
  icon_url: member.user.avatarURL
},
title: 'User left the Server!',
description: 'Username: '+ member.user.toString(),
fields: [
  {
    name: 'User ID',
    value: member.user.id
  },
  {
    name: 'Leave Timestamp',
    value: new Date()
  },
  {
    name: 'Timestamp when User was created',
    value: member.user.createdAt
  }
],
timestamp: new Date(),
footer: {
  icon_url: client.user.avatarURL,
  text: config.footerText //©
}
}});
});


client.on("message", message => {
  if(message.content.startsWith(config.prefix + "on")) {
    if (message.author.id !== config.managers) return;
      welcomeEnabled == "true";
      message.channel.sendMessage(":robot: ```css\nWelcome Messages activated! Beep Boop```");
  }
});

client.on("message", message => {
  if(message.content.startsWith(config.prefix + "off")) {
    if(message.author.id !== config.managers) return;
      welcomeEnabled == "false";
      message.channel.sendMessage(":robot: ```css\nWelcome Messages deactivated! Beep Boop```");
  }
});

client.on("message", message => {
  if(message.content.startsWith(config.prefix + "about")){
    message.channel.sendMessage("", {embed: {
  color: 32896,
  author: {
    name: client.user.username,
    icon_url: client.user.avatarURL
  },
  thumbnail: {
    url: client.user.avatarURL,
    height: 64,
    width: 64,
  },
  title: 'Bio-Beta for Royal Anime Castle',
  url: '',
  description: pack.description,
  fields: [
    {
      name: 'Coder',
      value: 'I was coded by **' + pack.author + '**',
      inline: true
    },
    {
      name: 'Contact for Questions',
      value: 'Contact **Gamy** for further questions.',
      inline: true
    },
    {
      name: 'Current Build version',
      value: pack.version,
      inline: true
    },
    {
      name: 'Current discord.js version',
      value: '11.0.x',
      inline: true
    }
  ],
  timestamp: new Date(),
  footer: {
    icon_url: client.user.avatarURL,
    text: '© 0xygen#1030'
  }
}});
  }
})


client.login(auth.token);
