import axios from 'axios';

// Develop server URL
const sleepBaseUrl = 'https://api.mediatek.com/mcs/v2/devices/D8O0iJcD/datachannels/muscle_data/datapoints/';
// https://api.mediatek.com/mcs/v2/devices/D8O0iJcD/datachannels/muscle_data/datapoints?start=1514906850989&end=1514906860989&limit=1000
// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
//const postBaseUrl = 'http://weathermood-production.us-west-2.elasticbeanstalk.com/api';

// axios.defaults.headers.common['deviceId'] = 'btkorKYrVufOkfNb';
export function listGymTimeServer(start, end){
    // let start = '1514906850989';
    // let end = '1514906860989';
    let url =`${sleepBaseUrl}?start=${start}&end=${end}&limit=1000`;
    let config = {
        headers: {
            'deviceKey': 'btkorKYrVufOkfNb',
            'Content-Type':`application/json`
        }
      }
    console.log(`Making GET request to: ${url}`);

    return axios.get(url, config).then(function(res) {
        console.log('!!!!', res);
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        // console.log('res',res.data.dataChannels[0].dataPoints);
        let ret = [];
        // for(int i in res.data.dataChannels[0].dataPoints){
        //     ret.append([i.recordedAt, i.values.value]);
        // }
        res.data.dataChannels[0].dataPoints.forEach(function(i){
            ret.push([i.recordedAt, i.values.value]);
        });
        console.log('from api', ret);
        //console.log('ret',ret);
        return ret;
      });
}


//import axios from 'axios';
import uuid from 'uuid/v4';
import moment from 'moment';
import 'babel-polyfill';

const reminderKey = 'test';

function _listSleepTime(key){
    // console.log('clear!!');
    // localStorage.clear();
    let reminderstring = localStorage.getItem(key);
    let reminders = reminderstring ? JSON.parse(reminderstring) : [];
    // console.log('listing', reminders);
    return reminders;
}

export function listGymTime(key){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(_listSleepTime(key));
        }, 500);
    });
}

function _createSleepTime(key, data){
   
    const data_array = [
        data,
        ..._listSleepTime(key)
    ]
    
    localStorage.setItem(key, JSON.stringify(data_array));

    return data_array;
}

export function createGymTime(key, data){
    return new Promise((resolve, reject) => {
        resolve(_createSleepTime(key, data));
    });
}

function _listMuscle(){
    // console.log('clear!!');
    // localStorage.clear();
    let key = 'muscle';
    let reminderstring = localStorage.getItem(key);
    let reminders = reminderstring ? JSON.parse(reminderstring) : [];
    // console.log('listing', reminders);
    return reminders;
}

export function listMuscle(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(_listMuscle());
        }, 500);
    });
}

function _createMuscle(muscle){
    let key = 'muscle';
     const data_array = [
         muscle,
         ..._listMuscle()
     ]
     
     localStorage.setItem(key, JSON.stringify(data_array));
 
     return data_array;
 }

 
export function createMuscle(muscle){
    return new Promise((resolve, reject) => {
        resolve(_createMuscle(muscle));
    });
}

export function deleteMuscle(muscle){
    let key = 'muscle';
    let data_array = [
        ..._listMuscle()
    ];
    // console.log('delete!! before', data_array);
    data_array = data_array.filter(function(item) { 
        console.log(item, muscle);
        return item.text !== muscle
    })
    // console.log('delete!! after', data_array);
    localStorage.setItem(key, JSON.stringify(data_array));
    return data_array;
}
