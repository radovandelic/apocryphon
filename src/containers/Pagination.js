import React from 'react';

import { connect } from 'react-redux';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startStageNum: 0,
            stageDivAmount: 5,
            stageDivs: [0, 1, 2, 3, 4, 5],
            stagesFinished: null
        }
    }
    componentDidMount() {
        this.createPagination();
        this.unlockStages();
    }
    unlockStages = () => {
        // here are all progress data for stages and levels saved
        const { languages } = this.props;
        const allStages = languages.stages;

        //if all 10 levels of a stage are started/finished, push the stage number to this array
        const finishedStage = [];

        // loop through all stages (i)
        for (let i = 0; i < allStages.length; i++) {

            // loop through all 10 levels (j) of the stage (i)
            for (let j = 0; j < 5; j++) {
                const levelsInStage = languages.stages[i].levels[j].words;
                //console.log(levelsInStage);
                const levelsFinished = [];
                if (levelsInStage.length > 0) {
                    levelsFinished.push(j);
                    if (levelsFinished.length === 10) {
                        finishedStage.push(i);
                    }
                    //console.log(levelsFinished);
                    console.log(finishedStage);
                }
            }
        }
    }
    componentDidUpdate() {
        const { activeStage } = this.props;
        const allPagin = document.getElementsByClassName('number');
        for (let i = 0; i < 11; i++) {
            allPagin[i].classList.remove('active');
        }
        const activePagin = document.getElementById(activeStage);
        activePagin.classList.add('active');

    }
    createPagination = () => {
        // startStageNum = number of first Stage shown in Pagination
        const startStageNum = this.state.startStageNum;

        // amount of shown stages
        var amount = startStageNum + this.state.stageDivAmount;

        // create all shown stages
        var stageDivsArr = [];

        for (let i = startStageNum; i < amount; i++) {
            stageDivsArr.push(i);
            if (i === amount - 1) {
                this.setState({ stageDivs: stageDivsArr });
                return;
            }
        }
    }
    clickHandler = (e) => {
        var value = e.target.innerHTML;
        const { stageSetter } = this.props;
        stageSetter(value);
    }
    render() {
        return (
            <div className='pagination'>
                <div className='stages'>
                    <div className='number select-info'>Stage</div>

                    {this.state.stageDivs.map(stageNum => {
                        return (
                            <div className='number'
                                key={stageNum}
                                id={stageNum}
                                onClick={e => {
                                    this.clickHandler(e);
                                }}>
                                {stageNum}
                            </div>
                        )
                    })}

                </div>
                <div className='unlock'>Finish this 5, to unlock more!</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activeStage: state.activeStage,
        languages: state.languages
    }
}

Pagination = connect(
    mapStateToProps,
    null
)(Pagination)

export default Pagination;