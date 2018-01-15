import React from 'react';
import PropTypes from 'prop-types';
import {
    Tooltip
} from 'reactstrap';
import moment from 'moment';

import {getMoodIcon} from 'utilities/weather.js';

import './PostItem.css';
var FontAwesome = require('react-fontawesome');
import {deletePost, listPost} from 'api/posts.js'
export default class PostItem extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        text: PropTypes.string,
        doneTs: PropTypes.number
        // mood: PropTypes.string,
        // clearVotes: PropTypes.number,
        // cloudsVotes: PropTypes.number,
        // drizzleVotes: PropTypes.number,
        // rainVotes: PropTypes.number,
        // thunderVotes: PropTypes.number,
        // snowVotes: PropTypes.number,
        // windyVotes: PropTypes.number,
        // onVote: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            check: false,
            display: true
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }
    // componentDidMount() {
    //    this.listPost();
    // }
    render() {
        const {id, text, mood, ts} = this.props;
        const {tooltipOpen} = this.state;
        
        return (
            <div>
            <div className={this.state.display?'hidden':'text'}>
                Memo Deleted.
            </div>
            <div className={this.state.display?'post-item d-flex flex-column': 'hidden'}>
                <div className='post d-flex'>
                    <div className='mood'>
                        {!this.state.check && <FontAwesome
                            className='super-crazy-colors'
                            name='square-o'
                            size='lg'
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                            onClick={this.handleClick}
                        />}
                        {this.state.check &&<FontAwesome
                            className='super-crazy-colors'
                            name='check-square-o'
                            size='lg'
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                            onClick={this.handleClick}
                        />}
                        </div>

                    <div className='wrap'>
                        <div className='ts'>{moment(ts * 1000).calendar()}</div>
                        <div className='text'>{text}</div>
                    </div>

                    <div className='delete'>
                        <FontAwesome
                            className='super-crazy-colors'
                            name='trash'
                            size='2x'
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                            onClick = {this.handleDelete}
                        />
                    </div>
                </div>
                </div>
                {/*<div className='vote d-flex justify-content-end'>
                    <div className='vote-results'>
                        {clearVotes > 0 && (<span><i className={getMoodIcon('Clear')}></i>&nbsp;{clearVotes}&nbsp;&nbsp;</span>)}
                        {cloudsVotes > 0 && <span><i className={getMoodIcon('Clouds')}></i>&nbsp;{cloudsVotes}&nbsp;&nbsp;</span>}
                        {drizzleVotes > 0 && <span><i className={getMoodIcon('Drizzle')}></i>&nbsp;{drizzleVotes}&nbsp;&nbsp;</span>}
                        {rainVotes > 0 && <span><i className={getMoodIcon('Rain')}></i>&nbsp;{rainVotes}&nbsp;&nbsp;</span>}
                        {thunderVotes > 0 && <span><i className={getMoodIcon('Thunder')}></i>&nbsp;{thunderVotes}&nbsp;&nbsp;</span>}
                        {snowVotes > 0 && <span><i className={getMoodIcon('Snow')}></i>&nbsp;{snowVotes}&nbsp;&nbsp;</span>}
                        {windyVotes > 0 && <span><i className={getMoodIcon('Windy')}></i>&nbsp;{windyVotes}&nbsp;&nbsp;</span>}
                    </div>
                    <div className='vote-plus'>
                        <i id={`post-item-vote-${id}`} className='fa fa-plus'></i>
                    </div>
                </div>
                <Tooltip placement='left' isOpen={tooltipOpen} autohide={false} target={`post-item-vote-${id}`} toggle={this.handleTooltipToggle}>
                    <i className={`vote-tooltip ${getMoodIcon('Clear')}`} onClick={this.handleClearVote}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Clouds')}`} onClick={this.handleCloudsVote}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Drizzle')}`} onClick={this.handleDrizzleVote}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Rain')}`} onClick={this.handleRainVote}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Thunder')}`} onClick={this.handleThunderVote}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Snow')}`} onClick={this.handleSnowVote}></i>&nbsp;
                    <i className={`vote-tooltip ${getMoodIcon('Windy')}`} onClick={this.handleWindyVote}></i>
                </Tooltip>*/}
            </div>
        );
    }

    handleClick() {
        this.setState({
          check: !this.state.check
        });
    }

    handleDelete(){
        if(!this.props.doneTs){
        this.setState({
            display: false
        })
        deletePost(this.props.id).then(() => {
            //listPost();
        }).catch(err => {
            console.error('Error deleting posts', err);
        });
        }
    }
    // handleTooltipToggle() {
    //     this.setState((prevState, props) => ({
    //         tooltipOpen: !prevState.tooltipOpen
    //     }));
    // }

    // handleClearVote() {
    //     this.props.onVote(this.props.id, 'Clear');
    //     this.setState({
    //       tooltipOpen: false
    //     });
    // }

    // handleCloudsVote() {
    //     this.props.onVote(this.props.id, 'Clouds');
    //     this.setState({
    //       tooltipOpen: false
    //     });
    // }

    // handleDrizzleVote() {
    //     this.props.onVote(this.props.id, 'Drizzle');
    //     this.setState({
    //       tooltipOpen: false
    //     });
    // }

    // handleRainVote() {
    //     this.props.onVote(this.props.id, 'Rain');
    //     this.setState({
    //       tooltipOpen: false
    //     });
    // }

    // handleThunderVote() {
    //     this.props.onVote(this.props.id, 'Thunder');
    //     this.setState({
    //       tooltipOpen: false
    //     });
    // }

    // handleSnowVote() {
    //     this.props.onVote(this.props.id, 'Snow');
    //     this.setState({
    //       tooltipOpen: false
    //     });
    // }

    // handleWindyVote() {
    //     this.props.onVote(this.props.id, 'Windy');
    //     this.setState({
    //       tooltipOpen: false
    //     });
    // }
}
