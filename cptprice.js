
const Discord = require('discord.js');
const cptprice = new Discord.Client();
const weather = require('weather-js');
const prefix = '=';
let cooldown = new Set();
let cdsec = 5;

cptprice.on('ready', function() {
    console.log('cptprice started.');
});

cptprice.on('message', function(message) {
  if(message.author.equals(cptprice.user)) return;

      if (!message.content.startsWith(prefix)) return;
      if(cooldown.has(message.author.id)){
        message.delete();
        return message.reply('You have to wait 5 sec between commands, Sir.')
      }
      if(!message.member.hasPermission('ADMINISTRATOR')){
          cooldown.add(message.member.id);
       }
        setTimeout(() => {
          cooldown.delete(message.author.id)
        }, cdsec * 1000)

      var caseargs = message.content.substring(prefix.length).split(' ');
      var decisions =
      [
              'Get MVP on One Shot One Kill',
              'Win a Battle Royale as Top 10',
              'Get a kill over 20 in Team Death Match',
              'VTOL in bound on Domination',
              'Win any battle with only Pistol',
              'You have no mission yet'
      ];

      switch (caseargs[0].toUpperCase()) {
       case 'WEATHER':
            message.channel.send(`Requesting weather from the satellite..`).then(function(w) {
              w.delete()
            })
            break;
        case 'SAYZX':
            message.channel.send(`Copy that`).then(function(s) {
              s.delete()
            })
            break;
        case 'PING':
        message.channel.send(`Requesting ms speed from the HQ..`).then(function(m) {
          m.edit(`Success! ${m.createdTimestamp - message.createdTimestamp}ms`).then(function(m) {
          m.delete(10000);
              })
            })
            break;
        case 'GIVE ME CHALLENGE':
            if (caseargs[2]) message.channel.send(decisions[Math.floor(Math.random() * decisions.length)]);
            else message.channel.send('Sorry, what was that again?');
            break;
        case 'GIVE MISSION':
            if (caseargs[2]) message.channel.send(decisions[Math.floor(Math.random() * decisions.length)]);
            else message.channel.send('Sorry, what was that again?');
            break;
        case 'GIVE':
            if (caseargs[2]) message.channel.send(decisions[Math.floor(Math.random() * decisions.length)]);
            else message.channel.send('Sorry, what was that again?');
            break;
        case 'GIVE CHALLENGE':
            if (caseargs[2]) message.channel.send(decisions[Math.floor(Math.random() * decisions.length)]);
            else message.channel.send('Sorry, what was that again?');
            break;
        case 'GIVE ME MISSION':
            if (caseargs[2]) message.channel.send(decisions[Math.floor(Math.random() * decisions.length)]);
            else message.channel.send('Sorry, what was that again?');
            break;
        case 'GIVE ME CHALLENGE':
            if (caseargs[2]) message.channel.send(decisions[Math.floor(Math.random() * decisions.length)]);
            else message.channel.send('Sorry, what was that again?');
            break;
          }
  });


  cptprice.on('message', function(message) {
    if(message.author.cptprice) return;


    var msg = message.content.split(' ')[0].toUpperCase()
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(' ');
    let args = message.content.split(' ').slice(1);
    let suffix = args.join(' ')

    if(msg === "=SAYZX") {
       message.delete(0);
      if(suffix) {
        message.channel.send(suffix)
      } else {
        message.channel.send('I got nothing to say')
      }
    }

    if (msg.startsWith(prefix + 'WEATHER')) {


        weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) {
            if (err) message.channel.send(err);

            if (result === undefined || result.length === 0) {
                message.channel.send('**Please enter a valid location.**')
                return;
            }

             Variables
            var current = result[0].current;
            var location = result[0].location;


            const embed = new Discord.RichEmbed()
                .setDescription(`**${current.skytext}**`)
              .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(0x00AE86)
                .addField('Timezone',`UTC${location.timezone}`, true)
                .addField('Degree Type',location.degreetype, true)
                .addField('Temperature',`${current.temperature} Degrees`, true)
                .addField('Feels Like', `${current.feelslike} Degrees`, true)
                .addField('Winds',current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)


                message.channel.send({embed});
        });
    }

});

cptprice.login(process.env.CPTPRICE_TOKEN);
