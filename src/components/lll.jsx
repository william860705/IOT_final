import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Container,  Row, Col, Modal, ModalBody, ModalFooter, ModalHeader, Button,Table} from 'reactstrap';
import { Badge } from 'reactstrap';
import {connect} from 'react-redux';
import {cancelWeather} from 'api/open-weather-map.js';
import {getWeather, weatherToggle} from 'states/weather-actions.js';
import {listPosts, createPost, createVote} from 'api/posts.js';
import ReminderForm_en from 'components/ReminderForm_en.jsx'
import './Mood.css';
import moment from 'moment';
import PostList_en from 'components/PostList_en.jsx';
import {getStartSleepTime, getEndSleepTime, getStartPhoneTime, getEndPhoneTime, sleepToggle, phoneToggle, breakFastToggle} from 'states/actions.js';
import {listSleepTime, createSleepTime, listSleepTimeServer, createSleepTimeServer} from 'api/sleep.js';
import {listPhoneTime, createPhoneTime, listPhoneTimeServer, createPhoneTimeServer} from 'api/phone.js'
var FontAwesome = require('react-fontawesome');
import GymStats from 'components/GymStats.jsx';
import {listGymTimeServer, createGymTime, listGymTime} from 'api/gym.js';
export default class Test extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            sleep: false,
            data: [],
            postLoading: false,
            muscleList: [],
            muscle: '二頭肌',
            text: '',
        };

        this.sleepTime = new Date();
        this.diff = 0;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getStartSleepTime = this.getStartSleepTime.bind(this);
        this.getEndSleepTime = this.getEndSleepTime.bind(this);
        this.listSleepTime = this.listSleepTime.bind(this);
    }
    render() {
        // console.log('data', this.state.data);
      const {startSleepTime, endSleepTime} = this.props;
      return (
          <div>
              <MuscleList muscleList={this.state.muscleList}/>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.muscleList.length + 1}
          </button>
        </form>
          <div>
              <Button color="warning" id="icon4" onClick = {this.getStartSleepTime}><img src="images/icon2.png" id="image4"/></Button>
              <Button color="warning" id="icon4" onClick = {this.getEndSleepTime}><img src="images/icon3.png" id="image3"/></Button>
              <div>
                <GymStats/>
              </div>
          </div> 
          </div>  
      );
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
        console.log("handleChange",this.state.text);
      }

      handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
          return;
        }
        const newItem = {
          text: this.state.text,
          id: Date.now()
        };
        this.setState(prevState => ({
          muscleList: prevState.muscleList.concat(newItem),
          text: ''
        }));
      }

    getStartSleepTime() {
        // console.log('dddata', this.state.data);
        if(this.state.sleep === false){
          this.state.sleep = true;
          let startSleepTime = new Date();
          this.sleepTime = new Date();
          let unixSleepTime = moment.utc(moment(startSleepTime,"DD/MM/YYYY HH:mm:ss")).format("x");
          console.log('unixSleepTime', unixSleepTime);
          //this.props.dispatch(getStartSleepTime(startSleepTime));
        }else {
          let endSleepTime = new Date();

          //this.diff = moment.utc(moment(endSleepTime,"DD/MM/YYYY HH:mm:ss").diff(moment(this.sleepTime,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
          let unixEndSleepTime = moment.utc(moment(endSleepTime,"DD/MM/YYYY HH:mm:ss")).format("x");
          console.log('unixEndSleepTime', unixEndSleepTime);
          //console.log(moment(endSleepTime,"DD/MM/YYYY HH:mm:ss"));
          var diff = moment.utc(moment(endSleepTime,"DD/MM/YYYY HH:mm:ss").diff(moment(this.sleepTime,"DD/MM/YYYY HH:mm:ss"))).format("X");
          //this.props.dispatch(getEndSleepTime(endSleepTime,diff));
          //this.props.dispatch(sleepToggle());
          // var x = moment(this.sleepTime,"DD/MM");
          // console.log(x);
          //this.handleCreateSleep(this.sleepTime, endSleepTime, diff);
          let start = '1514906850989';
          let end = '1514906860989'; /// 先寫死！！！
          let key = 'test';
          this.listSleepTime(start, end, key);
        //   console.log('data', this.state.data);
        }
    }
    listSleepTime(start, end, key) {
    //    console.log('hi');
        this.setState({
            postLoading: true
        }, () => {
            listGymTimeServer(start, end).then(data => {
                console.log('datttta', data);
                // this.setState({
                //     data: data,
                //     postLoading: false
                // });

                createGymTime(key, data);
            }).catch(err => {
                console.error('Error listing GymTime', err);

                this.setState({
                    data: [],
                    postLoading: false
                });
            });
        });
    }

    // handleCreateSleep(start, end, diff) {
    //     //console.log(diff);
    //     createSleepTime(start, end, diff).then(() => {
    //         this.listSleepTime();
    //     }).catch(err => {
    //         console.error('Error creating SleepTime', err);
    //     });
    //     createSleepTimeServer(start, end, diff).then(() => {
    //         listSleepTimeServer();
    //     }).catch(err => {
    //         console.error('Error creating SleepTime', err);
    //     });
    // }
    

    getEndSleepTime() {
       let key = 'test';
        this.setState({
            // postLoading: true
        }, () => {
            listGymTime(key).then(data => {
                console.log('all data array', data);
                this.setState({
                    data: data,
                    postLoading: false
                });

                
            }).catch(err => {
                console.error('Error listing GymTime', err);

                this.setState({
                    data: [],
                    // postLoading: false
                });
            });
        });
        }
  }
// export default connect((state) => {
//     return {
//         ...state.sleep,
//         ...state.phone,
//         ...state.weather,
//         ...state.breakFast,
//         unit: state.unit
//     };
// })(Test);


class MuscleList extends React.Component {
    render() {
    console.log("hello",this.props.muscleList);
      return (
        <ul>
          {this.props.muscleList.map(item => (
            
            <li key={item.id}>
                <button>{item.text}</button>
            </li>
          ))}
        </ul>
      );
    }
  }