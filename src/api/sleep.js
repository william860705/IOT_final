import axios from 'axios';

// Develop server URL
const sleepBaseUrl = 'https://api.mediatek.com/mcs/v2/devices/D8O0iJcD/datachannels/muscle_data/datapoints';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
//const postBaseUrl = 'http://weathermood-production.us-west-2.elasticbeanstalk.com/api';

// axios.defaults.headers.common['deviceId'] = 'btkorKYrVufOkfNb';
export function listSleepTimeServer(){
    let start = '1514906850989';
    let end = '1514906860989';
    let url =`${sleepBaseUrl}?start=${start}&end=${end}&limit=1000`;
    let config = {
        headers: {
            'deviceKey': 'btkorKYrVufOkfNb',
            'Content-Type':`application/json`
        }
      }
    console.log(`Making GET request to: ${url}`);

    return axios.get(url, config).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        console.log(res);
        return res.data;
      });
}


export function createSleepTimeServer(date, end, diff){
  let url = `${sleepBaseUrl}/sleeps`;

  console.log(`Making POST request to: ${url}`);

  return axios.post(url, {
      date,
      end,
      diff
  }).then(function(res) {
      if (res.status !== 200)
          throw new Error(`Unexpected response code: ${res.status}`);
      return res.data;
  });

}

//import axios from 'axios';
import uuid from 'uuid/v4';
import moment from 'moment';
import 'babel-polyfill';

const reminderKey = 'sleep';

function _listSleepTime(){
    let reminderstring = localStorage.getItem(reminderKey);
    let reminders = reminderstring ? JSON.parse(reminderstring) : [];
    return reminders;
}

export function listSleepTime(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(_listSleepTime());
        }, 500);
    });
}

function _createSleepTime(date, end, diff){
    //localStorage.clear();
    const newReminder = {
        date: date,
        diff: diff,
        end: end,
        ts: moment().unix()
    }
    //const newReminder = [date, diff];
    const reminders = [
        newReminder,
        ..._listSleepTime()
    ];
    localStorage.setItem(reminderKey, JSON.stringify(reminders));
    return newReminder;
}

export function createSleepTime(date, end, text){
    return new Promise((resolve, reject) => {
        resolve(_createSleepTime(date, end, text));
    });
}
