import React from 'react';

import { connect } from 'react-redux';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startStageNum: 0,
            stageDivAmount: 10,
            stageDivs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            stagesFinished: null
        }
    }
    componentDidMount() {
        this.createPagination();

        this.unlockStages();
    }
    unlockStages = () => {
        const { languages } = this.props;
        const allStages = languages.stages;
        for (let i = 0; i < allStages.length; i++) {
            for (let j = 0; j < 10; j++) {
                // all levels done
                const finishedStages = [];
                const levelsInStage = languages.stages[i].levels[j].words;
                if (levelsInStage.length > 0) {
                    finishedStages.push(i);
                    console.log(finishedStages)
                }
                if (finishedStages.length === 10) {
                    console.log(finishedStages)
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
    setPaginationNumActive = () => {

    }
    render() {
        return (
            <div className='pagination'>
                <div className='stages'>
                    <div className='number select-info'>Select Stage</div>

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
                <div className='unlock'>To unlock more stages, finish this 10 first</div>
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