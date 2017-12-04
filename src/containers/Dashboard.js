import React, { Component } from 'react';
import { connect } from 'react-redux';

import LevelProgress from '../components/LevelProgress';
import Pagination from '../containers/Pagination';

import { lang, flags } from '../models';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 0
        }
    }
    stageSetter = (stage) => {
        var { setStage } = this.props;
        setStage(stage);
    }
    render() {
        var { languages, activeStage } = this.props;
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
                    <div className='stage'>Stage: {`${activeStage}`}</div>
                </div>
                <Pagination stageSetter={this.stageSetter} />
                <LevelProgress stage={`${activeStage}`} level='0' progress={`${progress[0]}%`} />
                <LevelProgress stage={`${activeStage}`} level='1' progress={`${progress[1]}%`} />
                <LevelProgress stage={`${activeStage}`} level='2' progress={`${progress[2]}%`} />
                <LevelProgress stage={`${activeStage}`} level='3' progress={`${progress[3]}%`} />
                <LevelProgress stage={`${activeStage}`} level='4' progress={`${progress[4]}%`} />
                <LevelProgress stage={`${activeStage}`} level='5' progress={`${progress[5]}%`} />
                <LevelProgress stage={`${activeStage}`} level='6' progress={`${progress[6]}%`} />
                <LevelProgress stage={`${activeStage}`} level='7' progress={`${progress[7]}%`} />
                <LevelProgress stage={`${activeStage}`} level='8' progress={`${progress[8]}%`} />
                <LevelProgress stage={`${activeStage}`} level='9' progress={`${progress[9]}%`} />
                <Pagination stageSetter={this.stageSetter} />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        languages: state.languages,
        activeStage: state.activeStage
    }
}

const mapDispatchToProps = dispatch => ({
    setStage(setStage) {
        dispatch({
            type: "SET_ACTIVE_STAGE",
            setStage
        })
    }
})
Dashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)

export default Dashboard;