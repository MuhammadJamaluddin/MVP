const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/feedly', { useNewUrlParser: true })
  .then(() => {
    console.log('successfully connected!');
  })
  .catch((err) => {
    console.log(err);
  });

const SubscriptionSchema = new mongoose.Schema({
  channelId: String,
});

const subscription = mongoose.model('subscription', SubscriptionSchema);

module.exports = {
  subscription,
};
