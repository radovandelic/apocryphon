import React, { Component } from 'react';
import { connect } from 'react-redux';

import LevelProgress from '../components/LevelProgress';

import { lang, flags } from '../models';

class Dashboard extends Component {
    render() {
        var { languages } = this.props;
        return (
            <div className='content dashboard'>
                <h1>Your Dashboard</h1>
                <div className='flag_language'>
                    <img src={`flags/${flags[languages.target].toLowerCase()}.svg`} className='flag' alt=' '></img>
                    <div className='language'>{lang[languages.target].name}</div>
                </div>
                <LevelProgress stage='0' level='1' progress='83%' />
                <LevelProgress stage='0' level='2' progress='73%' />
                <LevelProgress stage='0' level='3' progress='43%' />
                <LevelProgress stage='0' level='4' progress='23%' />
                <LevelProgress stage='0' level='5' progress='13%' />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        languages: state.languages
    }
}

Dashboard = connect(
    mapStateToProps,
    null
)(Dashboard)

export default Dashboard;