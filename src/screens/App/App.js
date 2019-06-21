import React, { Component } from 'react';
import './App.css';
import AntHeader from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import ControlPanel from "../../components/Control-Panel/Control-Panel";
import {CircularProgress} from "@material-ui/core";

export class App extends Component {
  url = 'https://antserver-blocjgjbpw.now.sh/graphql?query={ ants { name, color, weight, length } }';
  constructor(props) {
    super(props);
    this.state = {
      ants: {},
      status: 'Not Checked',
      checked: 0,
      isLoading: true,
      selected: {
        id: null,
        name: null,
        position: null
      },
      score: 0
    }
  }

  componentDidMount(): void {
    this.fetchAntData(this.url);
  }

  fetchAntData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then(({data}) => this.setupAnts(data))
      .catch(err => console.error(err));
  };

  reset = () => {
    this.setState({
      checked: 0,
      isLoading: true,
      status: 'Not Checked',
      ants: {},
      selected: {
        name: null,
        id: null,
        position: null
      }
    });
    this.fetchAntData(this.url);
  };

  setupAnts = (data) => {
    const ants = {};
    data.ants.forEach((ant, i) => {
      const id = Math.floor(Math.random() * 100000);
      ants[id] = {
        ...ant,
        status: 'Not Checked',
        id,
        estimation: 1
      };
    });
    this.setState({
      ants,
      isLoading: false
    })
  };

  generateAntWinLikelihoodCalculator = () => {
    let delay = 7000 + Math.random() * 7000;
    let likelihoodOfAntWinning = Math.random();

    return (callback) => {
      setTimeout(() => {
        callback(likelihoodOfAntWinning);
      }, delay);
    };
  };

   getEstimates = () => {
    Object.values(this.state.ants).forEach((ant) => {
      this.setState(({ants, checked}) => {
        return checked === 0 ? {
          ants: this.updateAnt(ants, ant, {status: 'In Progress'}),
          status: 'In Progress'
        } : {
          ants: this.updateAnt(ants, ant, {status: 'In Progress'}),
        }
      });
      this.checkEstimate(ant);
    });
  };

   checkEstimate = (ant) => {
     const estimator = this.generateAntWinLikelihoodCalculator();
     estimator((estimation) => {
       this.setState(({ants, checked}) => {
         const isDone = checked === Object.values(this.state.ants).length - 1;
         return isDone ? {
           ants: this.updateAnt(ants, ant, {status: 'Complete', estimation}),
           status: 'Complete'
         } : {
           ants: this.updateAnt(ants, ant, {status: 'Complete', estimation}),
           checked: checked+=1
         }
       });
     });
   };

   updateAnt = (ants, ant, property) => {
    return {...ants, ...{[ant.id]: {...ants[ant.id], ...property}}};
  };

   selectCard = (ant) => {
     if (this.state.status !== 'In Progress' && this.state.status !== 'Complete') {
       this.setState({
         selected: {
           name: ant.name,
           id: ant.id,
           position: null
         }
       });
     }
   };

   handleOnFinished = (position) => {
     const scoreMap = {
       1: 100,
       2: 50,
       3: 25,
       4: 10,
       5: 5
     };
       this.setState((state, props) => {
         return {
           ...state,
           selected: {
             ...state.selected,
             position
           },
           score: state.score += scoreMap[position]
         }
       })
   };

   render() {
      const ants = Object.values(this.state.ants).sort((a, b) => (a.estimation - b.estimation)).map((ant, i) => (
        <Card onFinished={this.handleOnFinished} onSelect={() => this.selectCard(ant)} selected={this.state.selected} key={i} ant={ant} i={i} status={this.state.status}/>
      ));
      return (
        <div className="App">
          <AntHeader/>
          <div className="App-content">
            {!this.state.isLoading ? (
              <>
                <div className="App-controller">
                  <ControlPanel score={this.state.score} finishedPosition={this.state.selected.position} selectedName={this.state.selected.name} status={this.state.status}  reset={this.reset} getEstimates={this.getEstimates} />
                </div>
                <div className="App-body">
                  {ants}
                </div>
              </>
            ) : (
              <div style={{margin: '10rem'}}>
                <CircularProgress />
              </div>
            )}
          </div>
        </div>
      );
   }
}
