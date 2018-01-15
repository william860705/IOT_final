import React from 'react';
import PropTypes from 'prop-types';
import "./SleepStats.css";
import {listSleepTime, createSleepTime, listSleepTimeServer, createPhoneTimeServer} from 'api/sleep.js';
import {Alert, Container,  Row, Col, Modal, ModalBody, ModalFooter, ModalHeader, Button,Table} from 'reactstrap';
import {listPhoneTime, createPhoneTime} from 'api/phone.js'
import { Chart } from 'react-google-charts';
import moment from 'moment';
var FontAwesome = require('react-fontawesome');
import {listGymTimeServer, createGymTime, listGymTime} from 'api/gym.js';
export default class GymStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      options: {
        title: '運動記錄表',
        hAxis: { title: '時間', minValue: 0, maxValue: 15 },
        vAxis: { title: '運動強度', minValue: 0, maxValue: 15 },
        legend: 'none',
      },
      // options: {
      //   title: 'Sleep Time record',
      //   hAxis: { title: 'Time to sleep', minValue: 0, maxValue: 15 },
      //   vAxis: { title: 'Duration', minValue: 0, maxValue: 15 },
      //   legend: 'none',
      // },
      data: {
        //['Age', 'Weight'],
        // [8, 12],
        // [4, 5.5],
        // [11, 14],
        // [4, 5],
        // [3, 3.5],
        // [6.5, 7],
      },
      totalData:{

      }
    };

    // this.listSleepTime = this.listSleepTime.bind(this);
    this.nextData = this.nextData.bind(this);
    this.prevData = this.prevData.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  componentDidMount() {
    console.log('didmount',this.props.muscle);
    this.listGymTime();
  }
  listGymTime(){
      let key = this.props.muscle;//'test';
      listGymTime(key).then(data => {
                console.log('listgymtime!!');
                this.setState({
                    data
                });
            }).catch(err => {
                console.error('Error listing sleepTime', err);

                this.setState({
                    data: {}
                });
            });
            // listSleepTimeServer().then(data => {

            //           this.setState({
            //               totalData: data
            //           });
            //       }).catch(err => {
            //           console.error('Error listing sleepTime', err);

            //           this.setState({
            //               totalData: {}
            //           });
            //       });
  }

  render() {
      console.log('ll',this.state.data.length);
      console.log(this.state.data[2]);
      let data = this.state.data;
      let index = this.state.index;
      let array = [['test_x', 'test_y']];
      let tmp = [];

      if(data) tmp = data[index];
      // if(!tmp){
      //   tmp = [['-', 0], ['-', 0]];
      // }
      console.log('index', index);
      console.log('data', data);
      console.log('tmp', tmp);
      let per = 0;
      if(tmp){
        for(let i = 0;i < tmp.length;i ++){
          let t = moment.utc(moment(tmp[i][0],"x")).format("DD/MM/YYYY HH:mm:ss");
          array.push([t, tmp[i][1]]);
          console.log('jjj',tmp[i][1],typeof(tmp[i][1]));
        }
        let max = 0, cnt= 0, center = 0, per_cnt = 0, arr = [];
        for(let i = 0;i < tmp.length;i ++){
          arr[i] = tmp[i][1];
        }
        arr.sort();
        console.log('arr',arr.length/3);
        center = arr[(arr.length/3).toFixed(0)];
        for(let i = 0;i < tmp.length;i ++){
          if(tmp[i][1] > center) per_cnt++;
        }
        console.log('cnt', center, per_cnt);
        per = (per_cnt/tmp.length)/1.0;

      }

      var tableStyle = {
        width: '50%',
        margin: 'auto',
        backgroundColor: 'rgba(255, 203, 0, 0.5)',
        color: 'rgba(255, 203, 0, 0.5)'
      };

      var emptyStyle = {
        paddingRight: '0'
      }

    return (

      <Container>

      <div className="bgcolor1">
          <Button className="dddd" color="#fff" onClick = {this.prevData}><FontAwesome
            className='dddd'
            name='angle-double-left'
            size='4x'
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
          /></Button>

          <span className="zzz2"><b>{this.props.muscle} # {this.state.index+1} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {(100*per).toFixed(0)}%</b></span>

          <Button className="dddd_2" color="#fff" onClick = {this.nextData}><FontAwesome
            className='dddd_2'
            name='angle-double-right'
            size='4x'
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
          /></Button>
      </div>


      <Row>
      <Col xs="1"></Col>
    <Col>
        <span className="zzz1">  </span>

      {tmp!=[]&&<Chart
        chartType="LineChart"
        data={array}
        options={this.state.options}
        graph_id="ScatterChart"
        width="100%"
        height="350px"
        legend_toggle
      />}
    </Col>
<Col xs="1"></Col>
  </Row>
    <br />
      {/* <Table bordered style={tableStyle} >
         <thead>
           <tr>
             <th>最長睡眠時間</th>
             <th>最短睡眠時間</th>
             <th>平均睡眠時間</th>
             <th>使用者總平均時間</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td>{(longest/3600).toFixed(0)<10?'0':''}{(longest/3600).toFixed(0)}:{(longest/60).toFixed(0)<10?'0':''}{(longest/60).toFixed(0)}:{(longest%60)<10?'0':''}{(longest%60)}</td>
             <td>{(shortest/3600).toFixed(0)<10?'0':''}{(shortest/3600).toFixed(0)}:{(shortest/60).toFixed(0)<10?'0':''}{(shortest/60).toFixed(0)}:{(shortest%60)<10?'0':''}{(shortest%60)}</td>
             <td>{((sum/7)/3600).toFixed(0)<10?'0':''}{((sum/7)/3600).toFixed(0)}:{((sum/7)/60).toFixed(0)<10?'0':''}{((sum/7)/60).toFixed(0)}:{((sum/7)%60)<10?'0':''}{((sum/7)%60).toFixed(0)}</td>
             <td>{((sumS/count)/3600).toFixed(0)<10?'0':''}{((sumS/count)/3600).toFixed(0)}:{((sumS/count)/60).toFixed(0)<10?'0':''}{((sumS/count)/60).toFixed(0)}:{((sumS/count)%60)<10?'0':''}{((sumS/count)%60).toFixed(0)}</td>
           </tr>
         </tbody>
       </Table> */}
       <Row>&nbsp;</Row>
           </Container>
    );
  }

  nextData(){
      console.log(this.state.data.length, this.state.index);
      if(this.state.data.length-1 > this.state.index) {
        this.setState({
          index: this.state.index + 1
        });
      }
      // if(this.state.index < 5)
      // this.setState({
      //     index: this.state.index + 1
      // });
  }

  clearData(){
      localStorage.clear();
  }
  prevData(){
    if(this.state.index > 0)
    this.setState({
        index: this.state.index - 1
    });
}


componentWillReceiveProps(nextProps){
    let key = nextProps.muscle;//'test';
    listGymTime(key).then(data => {
              // console.log('listgymtime!!');
            if(nextProps.muscle!= '')
              this.setState({
                  data,
                  muscle: nextProps.muscle,
                  index: 0
              });
              // else {
              //   this.setState({
              //       data,
              //       muscle: nextProps.muscle
              //   });
              // }
          }).catch(err => {
              console.error('Error listing sleepTime', err);

              this.setState({
                  data: {}
              });
          });




    // this.setState({
    //   props: nextProps.muscle
    // });
    console.log('newprops', this.props.muscle);
    // this.listGymTime();
  }
    }
