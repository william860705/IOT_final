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
import 'components/WeatherDisplay.css';

import {listGymTimeServer, createGymTime, listGymTime, deleteMuscle, createMuscle, listMuscle} from 'api/gym.js';
export default class Test extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            sleep: false,
            data: [],
            posts: [],
            postLoading: false,
            muscleList: [],
            muscle: 'N/A',
            text: '',
        };
        this.setMuscle = this.setMuscle.bind(this);
        this.sleepTime = new Date();
        this.diff = 0;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getStartSleepTime = this.getStartSleepTime.bind(this);
        this.getEndSleepTime = this.getEndSleepTime.bind(this);
        this.listSleepTime = this.listSleepTime.bind(this);
        this.getMuscle = this.getMuscle.bind(this);
        this.listPosts = this.listPosts.bind(this);
        this.handleCreatePost = this.handleCreatePost.bind(this);
    }
    render() {
      const {posts, postLoading} = this.state;
        // console.log('data', this.state.data);
      const {startSleepTime, endSleepTime} = this.props;
      //document.body.className = `weather-bg ${group}`;
      //document.querySelector('.weather-bg .mask').className = `mask ${masking ? 'masking' : ''}`;

      return (
        <div className='bg_1'>
        <div className="row" >
         <Row>
             <div>
                 &nbsp;
            </div>
          </Row>
        <div className="col-md-2" >

        </div>
        <div className="col-xs-4" >
        <Alert className="cc" id="hi">
            <form onSubmit={this.handleSubmit}>
          <input
            type='textarea'
            onChange={this.handleChange}
            value={this.state.text}
          />
          &nbsp;

          <Button color="#51b7cf" className="dd" size="sm">
            <strong><FontAwesome
              className='fa fa-plus'
              name='plus'
              size='1x'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />   &nbsp;Muscle </strong>
          </Button>
        </form>
        </Alert>
        </div>

        <Container>
        <Row>
            <Col>
            &nbsp;
            </Col>
            </Row>
            <Row>
              <Col xs="4" sm="7" >
          <div>
              <MuscleList muscleList={this.state.muscleList} setMuscle={this.setMuscle}/>

          {/* <div>
              <Button color="warning" id="icon4" onClick = {this.getStartSleepTime}><img src="images/icon2.png" id="image4"/></Button>
              <Button color="warning" id="icon4" onClick = {this.getEndSleepTime}><img src="images/icon3.png" id="image3"/></Button>

          </div>  */}
          </div>

          </Col>
      <Col xs="8" sm="5">
  <Alert className="cc" id="hi_1" color="#fff">
   <FontAwesome
     className='super-crazy-colors'
     name='bullhorn'
     size='1x'
     style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
   />&nbsp;
     <strong>現在肌群:</strong>&nbsp;{this.state.muscle}
 </Alert>

                    <ReminderForm_en onPost={this.handleCreatePost} />

                    <PostList_en posts={posts} onVote={this.handleCreateVote} />
                        {/* // postLoading &&
                        // <Alert color='warning' className='loading'>Loading...</Alert> */}

                  </Col>
      </Row>

      <Row>
                    <Col>
                    &nbsp;
                    </Col>
                    </Row>
      </Container>
      </div>
</div>


      );
    }
    componentDidMount(){
        // console.log('ggg');
        this.getMuscle();
        this.listPosts();
    }
    setMuscle(muscle) {
      console.log('in set mus',muscle);
      this.setState({
        muscle: muscle,
      });
    }
    getMuscle() {
        this.setState({
            // postLoading: true
        }, () => {
            listMuscle().then(data => {
                // console.log('mus', data);
                this.setState({
                    muscleList: data,
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
    handleChange(e) {
        this.setState({ text: e.target.value });
        // console.log("handleChange",this.state.text);
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
        createMuscle(newItem);
      }
    //   https://api.mediatek.com/mcs/v2/devices/D8O0iJcD/datachannels/muscle_data/datapoints?start=1515840372754&end=1515840372754&limit=1000
    //   https://api.mediatek.com/mcs/v2/devices/D8O0iJcD/datachannels/muscle_data/datapoints/?start=1515840181485&end=1515840196944&limit=1000
    getStartSleepTime() {
        // console.log('dddata', this.state.data);
        if(this.state.sleep === false){
          this.state.sleep = true;
          let startSleepTime = new Date();
          this.sleepTime = new Date();
          let unixSleepTime = moment.utc(moment(startSleepTime,"DD/MM/YYYY HH:mm:ss")).format("x");
          console.log('unixSleepTime', unixSleepTime);
        //   console.log(moment(unixSleepTime,"DD/MM/YYYY HH:mm:ss"));
          //this.props.dispatch(getStartSleepTime(startSleepTime));
        }else {
          let endSleepTime = new Date();
            this.setState({
                sleep: false,
                muscle: 'N/A',
            });


          //this.diff = moment.utc(moment(endSleepTime,"DD/MM/YYYY HH:mm:ss").diff(moment(this.sleepTime,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
          let unixEndSleepTime = moment.utc(moment(endSleepTime,"DD/MM/YYYY HH:mm:ss")).format("x");
          console.log('unixEndeepTime', unixEndSleepTime);
        //   console.log(moment(unixendSleepTime,"DD/MM/YYYY HH:mm:ss"));
          var diff = moment.utc(moment(endSleepTime,"DD/MM/YYYY HH:mm:ss").diff(moment(this.sleepTime,"DD/MM/YYYY HH:mm:ss"))).format("X");
          //this.props.dispatch(getEndSleepTime(endSleepTime,diff));
          //this.props.dispatch(sleepToggle());
          // var x = moment(this.sleepTime,"DD/MM");
          // console.log(x);
          //this.handleCreateSleep(this.sleepTime, endSleepTime, diff);
          let unixSleepTime = moment.utc(moment(this.sleepTime,"DD/MM/YYYY HH:mm:ss")).format("x");
          let start = unixSleepTime;//'1514906850989';
          let end = unixEndSleepTime;
          let key = 'test';
          this.listSleepTime(start, end, key);

        //   console.log('data', this.state.data);
        }
    }

    handleCreatePost(text) {
        createPost(text).then(() => {
            this.listPosts();
        }).catch(err => {
            console.error('Error creating posts', err);
        });
    }

    listPosts() {

        this.setState({
            postLoading: true
        }, () => {
            listPosts().then(posts => {
                this.setState({
                    posts,
                    postLoading: false
                });
            }).catch(err => {
                console.error('Error listing posts', err);

                this.setState({
                    posts: [],
                    postLoading: false
                });
            });
        });
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
    constructor(props){
        super(props);
        this.getStartSleepTime = this.getStartSleepTime.bind(this);
        this.getEndSleepTime = this.getEndSleepTime.bind(this);
        this.listSleepTime = this.listSleepTime.bind(this);
        this.getMuscle = this.getMuscle.bind(this);
        this.Click = this.Click.bind(this);
        this.RemoveMuscle = this.RemoveMuscle.bind(this);
        this.state = {
            sleep: false,
        }
        this.sleepTime = 0;
    }

    getMuscle() {
        this.setState({
            // postLoading: true
        }, () => {
            listMuscle().then(data => {
                // console.log('mus', data);
                this.setState({
                    muscleList: data,
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
      getStartSleepTime(key) {
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
          this.setState({
            sleep: false
        });

          this.props.setMuscle('N/A');
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
          let unixSleepTime = moment.utc(moment(this.sleepTime,"DD/MM/YYYY HH:mm:ss")).format("x");
          let start = unixSleepTime;//'1514906850989';
          let end = unixEndSleepTime;//'1514906860989'; /// 先寫死！！！
        //   let key = 'test';
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

    getEndSleepTime(key) {
    //    let key = 'test';
        this.setState({
            // postLoading: true
        }, () => {
            listGymTime(key).then(data => {
                // console.log('all data array', data);
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
    Click(key){
        console.log('p',key);
        console.log(this.props);
        this.props.setMuscle(key);
        this.getStartSleepTime(key);
    }
    conponentDidMount(){
        this.getMuscle();
    }
    RemoveMuscle(key){
        deleteMuscle(key);
    }





    handleCreateVote(id, mood) {
        createVote(id, mood).then(() => {
            this.listPosts(this.props.searchText);
        }).catch(err => {
            console.error('Error creating vote', err);
        });
    }

    render() {

      return (

        <div className="row">
        {this.props.muscleList.map(item => (
          <div className ="col-md-6 jj" key={item.id}>
          <div className="container">
              <Button className="reb" color="#51b7cf" id="icon7" onClick={() => this.Click(item.text)}><span className="rebb ">{item.text}</span>
              <FontAwesome
                          className='style_1'
                          name='trash'
                          size='2x'
                          style={{ top:'40px', color:'#ffffff', textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                          onClick={()=>{this.props.muscleList.splice(this.props.muscleList.indexOf(item),1);this.forceUpdate(); this.RemoveMuscle(item.text);}}
                      /></Button>
              </div>
          </div>


        ))}
      </div>



      );
    }
  }
//   return (

//     <div className="row">
//       {this.props.muscleList.map(item => (
//         <div className ="col-md-6 jj" key={item.id}>

//                     <FontAwesome
//                         className='super-crazy-colors col-md-1'
//                         name='trash'
//                         size='3x'
//                         style={{ top:'55px', textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
//                         onClick={()=>{this.props.muscleList.splice(this.props.muscleList.indexOf(item),1);this.forceUpdate()}}
//                     />
//             <Button className="reb" color="warning" id="icon7" onClick={this.props.getstart}>{item.text}</Button>
//         </div>
//       ))}
//     </div>

//   );
