import axios from 'axios';

// Develop server URL
const phoneBaseUrl = 'http://supereggmid-server-dev.us-west-2.elasticbeanstalk.com/api';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
//const postBaseUrl = 'http://weathermood-production.us-west-2.elasticbeanstalk.com/api';


export function listPhoneTimeServer(){
    let url = `${phoneBaseUrl}/phones`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
      });
}


export function createPhoneTimeServer(date, end, diff){
  let url = `${phoneBaseUrl}/phones`;

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

import uuid from 'uuid/v4';
import moment from 'moment';
import 'babel-polyfill';

const reminderKey = 'phone';

function _listPhoneTime(){
    let reminderstring = localStorage.getItem(reminderKey);
    let reminders = reminderstring ? JSON.parse(reminderstring) : [];
    return reminders;
}

export function listPhoneTime(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(_listPhoneTime());
        }, 100);
    });
}

function _createPhoneTime(date, diff){
    //localStorage.clear();
    const newReminder = {
        date: date,
        diff: diff,
        ts: moment().unix()
    }
    const reminders = [
        newReminder,
        ..._listPhoneTime()
    ];
    localStorage.setItem(reminderKey, JSON.stringify(reminders));
    return newReminder;
}

export function createPhoneTime(date, text){
    return new Promise((resolve, reject) => {
        resolve(_createPhoneTime(date, text));
    });
}
