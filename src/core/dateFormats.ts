import moment from 'moment';

export const DateFormats = 
(date:string, format:string='MM/DD/YYYY , hh:mm A') => {
  let testDateUtc = moment.utc(date);
  return (testDateUtc).local().format(format);
};

export const DateDuration = (date:string) => {
  return moment(date).fromNow();
};
