const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// mongoose.plugin(require('mongoose-unique-validator'), {
//   type: 'phoneNumber already exists.',
// });

let WalletSchema = new Schema({
  address: { type: String, required: true },
  currency: { type: String, required: true },
  pkey: { type: String, required: true },
});

let UserSchema = new Schema({
  phoneNumber: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  pin: { type: Number, required: false },
  wallets: [WalletSchema],
});

//Find account by currency and type
UserSchema.methods.findAccount = function(currency, type) {
  const account = this.accounts.filter(a => {
    return (
      a.currency === currency.toLowerCase() && a.type === type.toLowerCase()
    );
  });

  if (account.length > 0) {
    return account[0];
  }

  return null;
};

// Export the model
module.exports = mongoose.model('User', UserSchema);
