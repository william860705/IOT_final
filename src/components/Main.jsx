import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    Button,
    Modal, ModalBody, ModalFooter, ModalHeader,
    Tooltip
} from 'reactstrap';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import Mood from 'components/Mood.jsx';
import Test from 'components/Test.jsx';
import Mood_en from 'components/Mood_en.jsx';
import {unit, weather, weatherForm} from 'states/weather-reducers.js';
import {sleep, phone, breakFast} from 'states/reducers.js';
import Stats from 'components/Stats.jsx';
import Stats_en from 'components/Stats_en.jsx';
import AllStats from 'components/AllStats.jsx';
import './Main.css';
var FontAwesome = require('react-fontawesome');

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navbarToggle: false,
            searchText: '',
            en: true,
            guideModal: false,
            tooltipOpen: false
        };
        this.toggle = this.toggle.bind(this);
        this.store = null;
        this.searchEl = null;
        this.language = this.language.bind(this);
        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
        this.guideOnClick = this.guideOnClick.bind(this);
    }

    componentWillMount() {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        this.store = createStore(combineReducers({
            unit,
            weather,
            weatherForm,
            sleep,
            phone,
            breakFast
        }), composeEnhancers(applyMiddleware(thunkMiddleware/*, loggerMiddleware*/)));
    }

    render() {
        return (
            <Provider store={this.store}>
                <Router>
                    <div className='main'>
                        <div className='bgfaded'>
                            <div className='container'>
                              {this.state.en && <Modal id="guide" isOpen={this.state.guideModal} toggle={this.toggle} className={this.props.className}>
                                 {/* <ModalHeader toggle={this.toggle}>早上吃早餐 頭好壯壯</ModalHeader>
                                <img className="muscle" src='images/muscle.jpeg' /> */}
                                 <ModalBody >
                                   <div id="cell1">&nbsp;<strong>第一步：選擇肌群</strong><br/>

                                    <span>按下<strong>+muscle</strong>，新增肌群！</span>
                                    <br />


                                    <br/>
                                    </div>
                                    <div id="cell1">&nbsp;<strong>第二步：開始健身</strong><br/>

                                    <span>按下要訓練的部位，一鍵開始一鍵結束！</span>
                                    <br />


                                    <br/>
                                  </div>
                                  <div id="cell2">&nbsp;<strong>第三步：觀看數據</strong><br/>

                                    <span>點擊Stats頁面選取剛訓練完的肌群  </span>
                                    <br/>

                                    <span>精美圖表+數據查看肌肉使用率 \^0^/</span>
                                    <br/>
                                    <br/>
                                    <span> PS:肌肉使用率就在每筆資料後面的％數喔！</span>
                                    <br/>

                                  </div>
                                  <br/>
                                  <br/>
                                   <div id="cell3">
                                   <span><strong>肌肉分布圖
                                       </strong></span>
                                   <img className="muscle" src='images/muscle.jpg' />
                                    </div>
                                 </ModalBody>
                                 <ModalFooter>
                                     <Button color="secondary" onClick={this.guideOnClick}>X</Button>
                                 </ModalFooter>
                             </Modal>}
                             {!this.state.en && <Modal id="guide" isOpen={this.state.guideModal} toggle={this.toggle} className={this.props.className}>
                                {/* <ModalHeader toggle={this.toggle}>早上吃早餐 頭好壯壯</ModalHeader> */}
                                <ModalBody >
                                  <div id="cell1">&nbsp;<strong>Phone</strong><br/>
                                  <img className="s"  src='images/icon_phone.png'/>
                                   <span>Press this when you start using your phone before bed.</span>
                                   <br />
                                   <img className="s"  src='images/icon1.png' />
                                   <span>Press the button when you finish using your phone.</span>
                                   <br/>
                                 </div>
                                 <div id="cell2">&nbsp;<strong>Sleep</strong><br/>
                                   <img className="s" src='images/icon2.png' />
                                   <span>Press this button when you're about to go to bed \^0^/ </span>
                                   <br/>
                                   <img className="s"  src='images/icon3.png' />
                                   <span>Press the button when you get up, this reminds you of the weather and memo! </span>
                                   <br/>
                                 </div>
                                   <div id="cell3">&nbsp;<strong>Morning</strong><br/>
                                   <img className="s"  src='images/icon4.png' />
                                   <span>Based on your geo location, it gives you current weather.</span>
                                   <br/>
                                   <img className="s"  src='images/icon5.png' />
                                   <span>Give you the headline of today, keep in touch with the world! </span>
                                   <br/>
                                   <img className="s" src='images/icon-eat.png' />
                                   <span>To help you decide on what to eat for breakfast!</span>
                                 </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" onClick={this.guideOnClick}>X</Button>
                                </ModalFooter>
                            </Modal>}
                                <Navbar className='navvvv' color='#51b7cf' light toggleable>
                                    <NavbarToggler right onClick={this.handleNavbarToggle}/>
                                    <NavbarBrand className='text-info' href="/"><FontAwesome
                                      className='aa'
                                      name='steam'
                                      size='2x'
                                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                    /><span id="super">肌</span><span id="superr">肌叫</span></NavbarBrand>
                                    <Collapse isOpen={this.state.navbarToggle} navbar>
                                      <div  className="d-flex flex-row-reverse">

                                           <div className="p-2">
                                            <Nav tabs id="navv">
                                              <NavItem active>

                                                <NavLink tag={Link} to='/'>
                                                <FontAwesome
                                                  className='aa'
                                                  name='home'
                                                  size='1x'
                                                  style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                                />
                                                &nbsp;
                                                <span className='aa'>Home</span>
                                              </NavLink>
                                              </NavItem>
                                              <NavItem>
                                                <NavLink tag={Link} to='/stats'>
                                                <FontAwesome
                                                  className='aa'
                                                  name='bar-chart'
                                                  size='1x'
                                                  style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                                />
                                                &nbsp;
                                                <span className='aa'>Stats</span>
                                              </NavLink>
                                              </NavItem>

                                              <NavItem>
                                                <NavLink tag={Link} to='/en' onClick = {this.guideOnClick}>
                                                <FontAwesome
                                                  className='aa'
                                                  name='lightbulb-o'
                                                  size='1x'
                                                  style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                                />
                                                &nbsp;
                                                <span className='aa'>Guide</span>
                                              </NavLink>
                                              </NavItem>
                                              <NavItem>
                                              &nbsp;&nbsp;

                                              <a href='https://github.com/verahsu860604'  id="TooltipExample">
                                              &nbsp;&nbsp;
                                              <FontAwesome
                                                className='super-crazy-colors'
                                                name='github'
                                                size='2x'
                                                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                                id='fbicon'
                                              />

                                            </a>
                                            {this.state.en && <Tooltip color="danger" placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggle}>
                                                Contact Developer
                                              </Tooltip>}
                                              {!this.state.en && <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggle}>
                                                  與開發者聯絡
                                                </Tooltip>}


                                              &nbsp;&nbsp;
                                            </NavItem>

                                            </Nav>
                                          </div>
  </div>



                                    </Collapse>

                                </Navbar>

                            </div>
                            </div>



                        {/* {!this.state.en &&<Route exact path="/" render={() => (
                            <Mood />
                        )}/>} */}
                        {/* {this.state.en &&<Route exact path="/" render={() => (
                            <Mood_en />
                        )}/>} */}
                        {this.state.en &&<Route exact path="/" render={() => (
                            <Test />
                        )}/>}
                        {!this.state.en &&<Route exact path="/stats" render={() => (
                            <AllStats />
                        )}/>}
                        {this.state.en &&<Route exact path="/stats" render={() => (
                            <AllStats />
                        )}/>}
                        {this.state.en &&<Route exact path="/en" render={() => (
                            <Test />
                        )}/>}
                        {!this.state.en &&<Route exact path="/en" render={() => (
                            <Test/>
                        )}/>}
                        {/*<div className='footer'>
                            DataLab.
                        </div>*/}
                      </div>
                </Router>
            </Provider>
        );
    }

    toggle() {
      this.setState({
      tooltipOpen: !this.state.tooltipOpen
      });
    }

    language(){
        this.setState({
            en: !this.state.en
        })
    }
    handleNavbarToggle() {
        this.setState((prevState, props) => ({
            navbarToggle: !prevState.navbarToggle
        }));
    }

    handleSearchKeyPress(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13){
            this.setState({
                searchText: e.target.value
            });
        }
    }

    handleClearSearch() {
        this.setState({
            searchText: ''
        });
        this.searchEl.value = '';
    }

    guideOnClick() {
        this.setState({
            guideModal: !this.state.guideModal
        })
    }
}
