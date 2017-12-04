import React, { Component } from 'react';
import { connect } from 'react-redux';

import LevelProgress from '../components/LevelProgress';

import { lang, flags } from '../models';

class Dashboard extends Component {
    render() {
        var { languages } = this.props;
        var progress = [];
        for (let level = 0; level < 10; level++) {
            var grades = languages.stages[0].levels[level].words;
            progress[level] = 0;
            if (grades.length >= 10) {
                for (let index = 0; index < 10; index++) {
                    progress[level] += grades[index] && grades[index].grade ? grades[index].grade * 2.5 : 0;
                }
            }
        }
        return (
            <div className='content dashboard'>
                <h1>Your Dashboard</h1>
                <div className='infos'>
                    <div className='flag_language'>
                        <img src={`flags/${flags[languages.target].toLowerCase()}.svg`} className='flag' alt=' '></img>
                        <div className='language'>{lang[languages.target].name}</div>
                    </div>
                    <div className='stage'>Stage: 0</div>
                </div>
                <LevelProgress stage='0' level='0' progress={`${progress[0]}%`} />
                <LevelProgress stage='0' level='1' progress={`${progress[1]}%`} />
                <LevelProgress stage='0' level='2' progress={`${progress[2]}%`} />
                <LevelProgress stage='0' level='3' progress={`${progress[3]}%`} />
                <LevelProgress stage='0' level='4' progress={`${progress[4]}%`} />
                <LevelProgress stage='0' level='5' progress={`${progress[5]}%`} />
                <LevelProgress stage='0' level='6' progress={`${progress[6]}%`} />
                <LevelProgress stage='0' level='7' progress={`${progress[7]}%`} />
                <LevelProgress stage='0' level='8' progress={`${progress[8]}%`} />
                <LevelProgress stage='0' level='9' progress={`${progress[9]}%`} />
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