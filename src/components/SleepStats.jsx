import React from 'react';
import PropTypes from 'prop-types';
import "./SleepStats.css";
import {listSleepTime, createSleepTime, listSleepTimeServer, createPhoneTimeServer} from 'api/sleep.js';
import {Alert, Container,  Row, Col, Modal, ModalBody, ModalFooter, ModalHeader, Button,Table} from 'reactstrap';
import {listPhoneTime, createPhoneTime} from 'api/phone.js'
import { Chart } from 'react-google-charts';
import moment from 'moment';
export default class SleepStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: '睡眠時間紀錄',
        hAxis: { title: '入睡時間', minValue: 0, maxValue: 15 },
        vAxis: { title: '睡眠長度(hr)', minValue: 0, maxValue: 15 },
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
  }

  componentDidMount() {
    this.listSleepTime();
  }
  listSleepTime(){
      listSleepTime().then(data => {

                this.setState({
                    data
                });
            }).catch(err => {
                console.error('Error listing sleepTime', err);

                this.setState({
                    data: {}
                });
            });
            listSleepTimeServer().then(data => {

                      this.setState({
                          totalData: data
                      });
                  }).catch(err => {
                      console.error('Error listing sleepTime', err);

                      this.setState({
                          totalData: {}
                      });
                  });
  }

  render() {
      var longest = 0;
      var shortest = 0;
      var sum = 0;
      var sumS = 0;
      var dur;
      const data = this.state.data;
      const totalData = this.state.totalData;
      var array = [['Time to sleep', 'Duration', { role: 'style' }]];
      for(var i = 0;i < 7;i ++){
          var tmp;
          var color;
          if(data[i] === undefined) tmp = ['No data', 0 , 'red'];
          else{
              dur = parseInt(data[i].diff)/60;
              if(dur < 6)color = "#FF3333";
              else if(dur < 8)color = "#FFDC35";
              else color = "#00AA00";
              tmp = [data[i].date.slice(5,10)+' '+data[i].date.slice(11,16), dur, color] ;


              if(parseInt(data[i].diff) > longest) longest = parseInt(data[i].diff);
              //shortest calculation
              if(shortest === 0) {
                 shortest = parseInt(data[i].diff);
              }else if(parseInt(data[i].diff) < shortest) shortest =parseInt(data[i].diff);
              //avg. calculation

              sum = sum + parseInt(data[i].diff);


          }
          array.push(tmp);
      }
      var count = 0;
      var durS;
      for(var i = 0;i < 7;i ++){
        var tmpS;
        // console.log('e',totalData[i]);
        if(totalData[i] === undefined) {
          tmpS = ['No data', 0 , 'red'];
        }else if( parseInt(totalData[i].diff) > 1800) {
          count = count + 1;
          sumS = sumS + parseInt(totalData[i].diff);
          console.log('dd',sumS);
        }
      }

      var tableStyle = {
        width: '50%',
        margin: 'auto',
        backgroundColor: 'rgba(255, 203, 0, 0.5)'
      };

      var emptyStyle = {
        paddingRight: '0'
      }




    return (
      <Container>
      <Row>
      <Col xs="1"></Col>
    <Col>
      <Chart
        chartType="ColumnChart"
        data={array}
        options={this.state.options}
        graph_id="ScatterChart"
        width="100%"
        height="350px"
        legend_toggle
      />
    </Col>
<Col xs="1"></Col>
  </Row>
    <br />
      <Table bordered style={tableStyle} >
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
       </Table>
       <Row>&nbsp;</Row>
           </Container>
    );
  }
}
