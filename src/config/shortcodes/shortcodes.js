import {html} from 'common-tags';

export default {
  year: function () {
    return `${new Date().getFullYear()}`;
  },

  addyear: function () {
    return `${new Date(new Date().setFullYear(new Date().getFullYear() + 1))}`;
  },

  link: function (url, name) {
    return `<a href="${url}" aria-label="link to ${name}">${url}</a>`;
  },

  email: function (email, name) {
    return `<a href="mailto:${email}" aria-label="email ${name} at ${email}">${email}</a>`;
  },

  phone: function (telephone, telephoneDisplay, name) {
    return `<a href="tel:${telephone}" aria-label="call ${name} on ${telephone}">${telephoneDisplay}</a>`;
  },

  mobile: function (mobile, mobileDisplay, name) {
    return `<a href="tel:${mobile}" aria-label="call ${name} on ${mobile}">${mobileDisplay}</a>`;
  }
};
