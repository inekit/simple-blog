let options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

module.exports = {
  dateFormatter: (date) => {
    return new Date(date).toLocaleDateString('ru-RU', options);
  },
  getAgeStr(months) {
    return months > 12 ? `${Math.trunc(months / 12)} лет ${months % 12} месяцев` : `${months} месяцев`;
  },
};
