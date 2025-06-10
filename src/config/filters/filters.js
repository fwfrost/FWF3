import {DateTime} from 'luxon';
import lodash from 'lodash';
import pkg from 'lodash';

const {replace, deburr} = pkg;

const appendSuffix = n => {
  var s = ['th', 'st', 'nd', 'rd'],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const timestamp = Math.floor(Date.now() / 1000);

const nth = function (d) {
  if (d > 3 && d < 21) {
    return 'th';
  }
  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

const parse = date => new Date(Date.parse(date));

export default {
  dateToFormat: date => {
    return DateTime.fromJSDate(date, {
      zone: 'GMT'
    })
      .setLocale('en')
      .toLocaleString(DateTime.DATE_MED);
  },

  dateToISO: date => {
    return DateTime.fromJSDate(date, {
      zone: 'GMT'
    })
      .setLocale('en')
      .toISODate({
        includeOffset: false,
        suppressMilliseconds: true
      });
  },

  dateFeed: date => {
    return DateTime.fromJSDate(date, {
      zone: 'GMT'
    })
      .setLocale('en')
      .toISO();
  },

  dateRFC3339: date => {
    return DateTime.fromJSDate(date, {
      zone: 'GMT'
    }).toString("yyyy-MM-dd'T'HH:mm:ss.fffK");
  },

  longDate: date => {
    const day = date.getDate();
    return `${day}${nth(day)} ${month_names[date.getMonth()]}, ${date.getFullYear()}`;
  },

  day: date => {
    return parse(date).getDate();
  },

  dayOrdinal: date => {
    let day = parse(date).getDate();
    return day + nth(day);
  },

  month: date => {
    return parse(date).getMonth() + 1;
  },

  monthName: date => {
    return month_names[parse(date).getMonth()];
  },

  dateFilter: value => {
    const dateObject = new Date(value);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const dayWithSuffix = appendSuffix(dateObject.getDate());
    return `${dayWithSuffix} ${months[dateObject.getMonth()]} ${dateObject.getFullYear()}`;
  },

  year: date => {
    return parse(date).getFullYear();
  },

  addDecimals: value => {
    value = (value / 1).toFixed(2);
    return value;
  },

  cacheBust: value => {
    return `${value}?${timestamp}`;
  },

  obfuscate: str => {
    const chars = [];
    for (var i = str.length - 1; i >= 0; i--) {
      chars.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }
    return chars.join('');
  },

  kebab: str => {
    let re = /\/|\./gi;
    return str.replace(re, '-');
  },

  sortByTitle: arr => {
    arr.sort((a, b) => (a.title > b.title ? 1 : -1));
    return arr;
  },

  sortByNewest: arr => {
    arr.sort((b, a) => (a.date > b.date ? 1 : -1));
    return arr;
  },

  json: input => {
    return JSON.stringify(input);
  },

  limit: (array, limit) => {
    return array.slice(0, limit);
  },

  include: function (arr, path, value) {
    value = lodash.deburr(value).toLowerCase();
    return arr.filter(item => {
      let pathValue = lodash.get(item, path);
      pathValue = lodash.deburr(pathValue).toLowerCase();
      return pathValue.includes(value);
    });
  },

  stripmarks: value => {
    value = replace(value, /\"$/, ' ');
    return value;
  },

  toHTML: str => {
    return new markdownIt(markdown_options).render(str);
  },

  lowercase: value => {
    value = deburr(value).toLowerCase();
    return value;
  },

  uppercase: value => {
    value = deburr(value).toUpperCase();
    return value;
  }
};
