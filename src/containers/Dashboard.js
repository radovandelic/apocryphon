import React, { Component } from 'react';
import { connect } from 'react-redux';

import LevelProgress from '../components/LevelProgress';

import { lang } from '../models';

class Dashboard extends Component {
    render() {
        var { languages } = this.props;
        return (
            <div className='content dashboard'>
                <h1>Your Dashboard</h1>
                <div className='flag_language'>
                    <img src={`flags/${languages.target}.svg`} className='flag' alt=' '></img>
                    <div className='language'>{lang[languages.target].name}</div>
                </div>
                <LevelProgress stage='0' level='1' progress='83%' />
                <LevelProgress stage='0' level='2' progress='43%' />
                <LevelProgress stage='0' level='3' progress='27%' />
                <LevelProgress stage='0' level='4' progress='3%' />
                <LevelProgress stage='0' level='5' progress='3%' />
                <LevelProgress stage='0' level='6' progress='3%' />
                <LevelProgress stage='0' level='7' progress='3%' />
                <LevelProgress stage='0' level='8' progress='3%' />
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