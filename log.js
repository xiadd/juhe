module.exports = {
  appenders: [
      { type: 'console' },
      { type: 'file', filename: 'logs/cheese.log', category: 'cheese' }
    ]
  }