const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:1883')

let on = false

client.on('connect', function () {
  client.subscribe('1234')
})

client.on('message', function (topic, message) {
  const date = new Date()
  console.log(date.toTimeString())
  console.log(`   Incoming message: ${topic} - ${message}`)
  if (topic.toString() === '1234' && message.toString() !== 'error') {
    console.log('   Changing state...')
    on = message.toString() === '1'
  }
  console.log(`   State: ${on}`)
})

setInterval(() => {
  client.publish('1234', on ? '1' : '0')
}, 1000)
