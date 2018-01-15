import React from 'react';
import PropTypes from 'prop-types';
var FontAwesome = require('react-fontawesome');
import "./Stats.css"
import SleepStats from 'components/SleepStats.jsx';
import PhoneStats from 'components/PhoneStats.jsx';
import { Button, ButtonGroup } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {listGymTimeServer, createGymTime, listGymTime, createMuscle, listMuscle, deleteMuscle} from 'api/gym.js';
import GymStats from 'components/GymStats.jsx';
export default class AllStats extends React.Component {
    constructor(props) {
        super(props);
        this.getSleepChart = this.getSleepChart.bind(this);
        this.getPhoneChart = this.getPhoneChart.bind(this);
        this.toggle = this.toggle.bind(this);
        this.Click = this.Click.bind(this);
        this.state = {
            muscle: '',
            dropdownOpen: false,
            muscleList: []
        }
    }
    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }
    componentDidMount() {
        this.listAllMuscle();
      }
    listAllMuscle(){
        listMuscle().then(data => {
                            console.log('all muscle type:', data);
                            this.setState({
                                muscleList: data
                            });
                        }).catch(err => {
                            console.error('Error listing Muscle', err);

                            this.setState({
                                muscleList: []
                            });
                        });
    }
    render() {

        //let x= localStorage.getItem('二頭肌');
        console.log(this.state.muscle);
        // var color1;
        // if(this.state.index === "sleep")color1 = "warning";
        // else color1 = "secondary";
        //
        // var color2;
        // if(this.state.index === "sleep")color2 = "secondary";
        // else color2 = "warning";
        return (

        <div className="back">


            <Dropdown className="toggle_color_2" isOpen={this.state.dropdownOpen} toggle={this.toggle}>

                <DropdownToggle color="#51b7cf" className="toggle_color" caret>
                <b>Choose Muscle</b>
                </DropdownToggle>

            <DropdownMenu  color="#51b7cf">
            {this.state.muscleList.map(item => (

            <li className="toggle_color_3" key={item.id}>
                <DropdownItem ><div onClick={() => this.Click(item.text)}>{item.text}</div></DropdownItem>
            </li>
          ))}
            {/* <DropdownItem header>Header</DropdownItem>
            <DropdownItem disabled>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Another Action</DropdownItem> */}
            </DropdownMenu>
            </Dropdown>
                <div className="bbb">
              </div>
                {this.state.muscle != '' && <GymStats muscle={this.state.muscle}/>}
                {/* <div>
                {this.state.index === 'sleep' && <SleepStats/>}
                </div>
                <div>
                {this.state.index === 'phone' && <PhoneStats/>}
                </div> */}

            </div>
        );
    }

Click(key){
    this.setState({
        muscle: key
    });
}
getSleepChart() {
    this.setState({
        index: 'sleep'
    });
}

getPhoneChart(){
    this.setState({
        index: 'phone'
    });
}

}
