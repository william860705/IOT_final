import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Container,  Row, Col, Modal, ModalBody, ModalFooter, ModalHeader, Button,Table} from 'reactstrap';
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
class Mood_en extends React.Component {
    static propTypes = {
        city: PropTypes.string,
        code: PropTypes.number,
        group: PropTypes.string,
        description: PropTypes.string,
        temp: PropTypes.number,
        unit: PropTypes.string,
        weatherLoading: PropTypes.bool,
        masking: PropTypes.bool,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            lat: 0,
            lon: 0,
            postLoading: false,
            posts: [],
            phone: [],
            sleep: []
        };

        this.sleepTime = new Date();
        this.diff = 0;
        this.phoneDiff = 0;
        this.breakFast = 0;
        this.breakfast;
        this.handleCreatePost = this.handleCreatePost.bind(this);
        // this.handleCreateSleep = this.handleCreateSleep.bind(this);
        // this.handleCreateVote = this.handleCreateVote.bind(this);
        this.handlesnow = this.handlesnow.bind(this);
        // this.getTime = this.getTime.bind(this);
        // this.getDiff = this.getDiff.bind(this);
        this.popWeather = this.popWeather.bind(this);
        this.getStartSleepTime = this.getStartSleepTime.bind(this);
        this.getEndSleepTime = this.getEndSleepTime.bind(this);
        this.phoneTime = this.phoneTime.bind(this);
        this.sleepToggle = this.sleepToggle.bind(this);
        this.phoneToggle = this.phoneToggle.bind(this);
        this.weatherToggle = this.weatherToggle.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.breakfastToggle = this.breakfastToggle.bind(this);
    }

    componentDidMount() {
        // this.props.dispatch(getWeather('Hsinchu', this.props.unit));
        // this.listPosts(this.props.searchText);
        this.getLocation();
        this.listPosts();
    }

    componentWillUnmount() {
        if (this.state.weatherLoading) {
            cancelWeather();
        }
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.searchText !== this.props.searchText) {
        //     this.listPosts(nextProps.searchText);
        // }
    }

    render() {
        const {city, group, description, temp, unit, masking} = this.props;
        const {posts, postLoading} = this.state;
        const {startSleepTime, endSleepTime} = this.props;

        document.body.className = `weather-bg ${group}`;
        document.querySelector('.weather-bg .mask').className = `mask ${masking ? 'masking' : ''}`;
        var status;
        if(this.props.phone) status = 'Using phone';
        else if(this.props.sleep) status = 'Sleeping';
        else status = 'awake';
        if(this.breakFast === 1)this.breakfast = 'Nutritious Egg Cake';
        else if(this.breakFast === 2)this.breakfast = 'Nutritious Triangle rice balls';
        else if(this.breakFast === 3)this.breakfast = 'Nutritious Green Onion Pan Cake';
        else if(this.breakFast === 4)this.breakfast = 'Nutritious Sandwich';
        else if(this.breakFast === 5)this.breakfast = 'Nutritious Pan Fried Noodles';
        else if(this.breakFast === 6)this.breakfast = 'Nutritious Steamed Bread';
        else if(this.breakFast === 7)this.breakfast = 'Nutritious Burger';
        var bbimg;
        if(this.breakFast === 1)bbimg = 'images/1.jpg';
        else if(this.breakFast === 2)bbimg = 'images/2.jpg';
        else if(this.breakFast === 3)bbimg = 'images/3.jpg';
        else if(this.breakFast === 4)bbimg = 'images/4.JPG';
        else if(this.breakFast === 5)bbimg = 'images/5.jpg';
        else if(this.breakFast === 6)bbimg = 'images/6.jpg';
        else if(this.breakFast === 7)bbimg = 'images/7.jpg';
        var wea;
        if(this.props.group==='thunder')wea = 'tstorms';
        else if(this.props.group==='drizzle')wea = 'chancerain';
        else if(this.props.group==='rain')wea = 'rain';
        else if(this.props.group==='snow')wea = 'chancesnow';
        else if(this.props.group==='atmosphere')wea = 'fog';
        else if(this.props.group==='clear')wea = 'clear';
        else if(this.props.group==='clouds')wea = 'cloudy';



        return (
            <div id="interface">
              <Container>
              <Row>
              <Col>
              &nbsp;
              </Col>
              </Row>
              <Row>
                <Col xs="4" sm="7">
                  <div id="buttongroup">
                     <Button color="warning" onClick = {this.getEndSleepTime} id="icon1" ><img src={`images/icon-eat.png`} id="image1"/></Button>

                     <Modal isOpen={this.props.breakFastToggle} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Breakfast Feeds Your Brain!</ModalHeader>
                        <ModalBody>
                            <strong>RECOMMENDED&nbsp;:&nbsp;</strong>{this.breakfast}
                            <br />
                            <img src={bbimg} id="b"/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.breakfastToggle}>X</Button>
                        </ModalFooter>
                    </Modal>

                     <Button color="warning" onClick = {this.popWeather} id="icon2" ><img src={`images/icon4.png`} id="image2"/></Button>

                     <Modal isOpen={this.props.weatherToggle} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Current Weather in {this.props.city}</ModalHeader>
                        <ModalBody>
                            <div className={`weather-display `}>
                                {/* <img src={`images/w-${this.props.group}.png`}/> */}
                                <img src={`images/${wea}.png`}/>
                                {/* <p className='description'>{`${this.props.description}`}</p> */}
                                <h1 className='temp'>
                                    <span className='display-3'>{this.props.temp.toFixed(0)}&ordm;</span>
                                    &nbsp;{(this.props.unit === 'metric')
                                        ? 'C'
                                        : 'F'}
                                </h1>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.weatherToggle}>X</Button>
                        </ModalFooter>
                    </Modal>


                     <Button color="warning" onClick = {this.phoneTime} id="icon3" ><img src={this.props.phone?`images/icon1.png`:`images/icon_phone.png`} id="image3"/></Button>

                     <Modal isOpen={this.props.phoneToggle} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Time to Sleep!</ModalHeader>
                        <ModalBody>
                          <FontAwesome
                              className='super-crazy-colors'
                              name='clock-o'
                              size='2x'
                              spin
                              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                            />
                            &nbsp;&nbsp;
                            Phone time: {this.phoneDiff}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.phoneToggle}>X</Button>
                        </ModalFooter>
                    </Modal>
                     <Button color="warning" id="icon4" onClick = {this.getStartSleepTime}><img src={this.props.sleep?`images/icon3.png`:`images/icon2.png`} id="image4"/></Button>
                     <Modal isOpen={this.props.sleepToggle} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Good Morning! Check your memo!</ModalHeader>
                        <ModalBody>
                          <FontAwesome
                              className='super-crazy-colors'
                              name='clock-o'
                              size='2x'
                              spin
                              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                            />
                            &nbsp;&nbsp;Sleep time: {this.diff}
                            <br />
                            <div className={`weather-display `}>
                                {/* <img src={`images/w-${this.props.group}.png`}/> */}
                                <img src={`images/${wea}.png`}/>
                                {/* <p className='description'>{`${this.props.description}`}</p> */}
                                <h1 className='temp'>
                                    <span className='display-3'>{this.props.temp.toFixed(0)}&ordm;</span>
                                    &nbsp;{(this.props.unit === 'metric')
                                        ? 'C'
                                        : 'F'}
                                </h1>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.sleepToggle}>X</Button>
                        </ModalFooter>
                    </Modal>
                    <Button color="warning" id="icon5" href='http://www.bbc.com/news/av/10318236/headlines-from-bbc-news'><img src={`images/icon5.png`} id="image5"/></Button>
                </div>
                <br />
                {/*<Alert color="success">
                    <strong>Your status:</strong>&nbsp;&nbsp;{status}
                </Alert>*/}
</Col>
<Col xs="8" sm="5">
  <Alert color="success">
    <FontAwesome
      className='super-crazy-colors'
      name='bullhorn'
      size='1x'
      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
    />&nbsp;
      <strong>Your Status:</strong>&nbsp;{status}
  </Alert>

                    <ReminderForm_en onPost={this.handleCreatePost} />

                    <PostList_en posts={posts} onVote={this.handleCreateVote} />
                  </Col>
                </Row>
                    <Row>
                    <Col>
                    &nbsp;
                    </Col>
                    </Row>

                    </Container>
            </div>

        );
    }

    handlesnow(){
        alert('test!');

    }

    breakfastToggle(){
        this.props.dispatch(breakFastToggle());
    }

    sleepToggle() {
        this.props.dispatch(sleepToggle());
    }

    phoneToggle() {
        this.props.dispatch(phoneToggle());
    }

    getStartSleepTime() {
        if(this.props.sleep === false){
          let startSleepTime = new Date();
          this.sleepTime = new Date();
          let unixTime = moment.utc(moment(startSleepTime,"DD/MM/YYYY HH:mm:ss")).format("x");
          console.log(unixTime);
          this.props.dispatch(getStartSleepTime(startSleepTime));
        }else {
          let endSleepTime = new Date();
          this.diff = moment.utc(moment(endSleepTime,"DD/MM/YYYY HH:mm:ss").diff(moment(this.sleepTime,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");

          var diff = moment.utc(moment(endSleepTime,"DD/MM/YYYY HH:mm:ss").diff(moment(this.sleepTime,"DD/MM/YYYY HH:mm:ss"))).format("X");
          this.props.dispatch(getEndSleepTime(endSleepTime,diff));
          this.props.dispatch(sleepToggle());
          // var x = moment(this.sleepTime,"DD/MM");
          // console.log(x);
          this.handleCreateSleep(this.sleepTime, endSleepTime, diff);
        }

    }

    getEndSleepTime() {
        // 蛋餅、漢堡、吐司、三角飯糰、薯餅、蔥抓餅、鐵板麵
        this.breakFast = Math.floor((Math.random() * 7) + 1);

        this.props.dispatch(breakFastToggle());
    }

    phoneTime() {
        //console.log(this.props.phone + '!!');
        if(!this.props.sleep){
        const {phone, startPhoneTime, endPhoneTime, totalPhoneTime} = this.props;
        if (phone == false) {
            let time = new Date();
            this.props.dispatch(getStartPhoneTime(time));
        } else {
            let time = new Date();
            this.phoneDiff = moment.utc(moment(time,"DD/MM/YYYY HH:mm:ss").diff(moment(startPhoneTime,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
            var diff = moment.utc(moment(time,"DD/MM/YYYY HH:mm:ss").diff(moment(startPhoneTime,"DD/MM/YYYY HH:mm:ss"))).format("X");
            this.props.dispatch(getEndPhoneTime(time,diff));
            this.props.dispatch(phoneToggle());
            this.handleCreatePhone(this.props.startPhoneTime, 0, diff);
        }
        }
    }


    listSleepTime() {
       // console.log('hi');
        this.setState({
            postLoading: true
        }, () => {
            listSleepTime().then(sleep => {
                this.setState({
                    sleep,
                    postLoading: false
                });
            }).catch(err => {
                console.error('Error listing phoneTime', err);

                this.setState({
                    sleep: [],
                    postLoading: false
                });
            });
        });
    }

    getLocation() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                })
            })
        }
    }

    weatherToggle() {
        this.props.dispatch(weatherToggle());
    }

    popWeather() {
        this.props.dispatch(getWeather(this.state.lat,this.state.lon,'metric'));
        this.props.dispatch(weatherToggle());
    }

    handleCreateSleep(start, end, diff) {
        //console.log(diff);
        createSleepTime(start, end, diff).then(() => {
            this.listSleepTime();
        }).catch(err => {
            console.error('Error creating SleepTime', err);
        });
        createSleepTimeServer(start, end, diff).then(() => {
            listSleepTimeServer();
        }).catch(err => {
            console.error('Error creating SleepTime', err);
        });
    }
    listPhoneTime() {
       // console.log('hi');
        this.setState({
            postLoading: true
        }, () => {
            listPhoneTime().then(phone => {
                this.setState({
                    phone,
                    postLoading: false
                });
            }).catch(err => {
                console.error('Error listing phoneTime', err);

                this.setState({
                    phone: [],
                    postLoading: false
                });
            });
        });
    }

    handleCreatePhone(start, end, diff) {
        //console.log(diff);
        createPhoneTime(start, diff).then(() => {
            this.listPhoneTime();
        }).catch(err => {
            console.error('Error creating phoneTime', err);
        });
        createPhoneTimeServer(start, end ,diff).then(() => {
            listPhoneTimeServer();
        }).catch(err => {
            console.error('Error creating phoneTime e', err);
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

    handleCreatePost(text) {

        createPost(text).then(() => {
            this.listPosts();
        }).catch(err => {
            console.error('Error creating posts', err);
        });
    }

    handleCreateVote(id, mood) {
        createVote(id, mood).then(() => {
            this.listPosts(this.props.searchText);
        }).catch(err => {
            console.error('Error creating vote', err);
        });
    }
}

export default connect((state) => {
    return {
        ...state.sleep,
        ...state.phone,
        ...state.weather,
        ...state.breakFast,
        unit: state.unit
    };
})(Mood_en);
