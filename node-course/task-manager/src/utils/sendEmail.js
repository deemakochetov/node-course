const sgMail = require('@sendgrid/mail');
const config = require('config');

const EMAIL_SENDER = '';
const REASONS = {
  texts: {
    registration: (name) => `Welcome ${name}`,
    deletingAccount: (name) => `Sorry to see you leaveing, ${name}`
  },
  subjects: {
    registration: () => `Registration`,
    deletingAccount: () => `Deleting account`
  }
};

// sgMail.setApiKey(config.get('secretTokensConfig.send_drid_api_key'));

const sendEmail = async (to, name, reason) => {
  try {
    const msg = {
      to,
      from: EMAIL_SENDER,
      subject: REASONS.subjects[reason],
      text: REASONS.texts[reason](name)
    };
    await sgMail.send(msg);
  } catch (err) {
    throw new Error('Unsuccsessful try to send an email');
  }
};

module.exports = sendEmail;
