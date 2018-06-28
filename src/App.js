import React, { Component } from "react";
import CharCard from "./components/CharCard";
import NavBar from "./components/NavBar";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
import Row from "./Row";
import Column from "./Column";
import chars from "./char.json";
import "./App.css";

function shuffleCharacters(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  // Set this.state
  state = {
    chars,
    currentScore: 0,
    topScore: 0,
    rightWrong: "",
    clicked: [],
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      rightWrong: ""
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ rightWrong: "You win!" });
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      rightWrong: "Dude You Suck!",
      clicked: []
    });
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledCharacters = shuffleCharacters(chars);
    this.setState({ chars: shuffledCharacters });
  };

  render() {
    return (
      <Wrapper>
        <NavBar
          title="South park Clicky Game"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          rightWrong={this.state.rightWrong}
        />

        <Title>
          Click Each Character Only Once!  Beware, if you click a character more than once, Cartman will do his German Dans for you!
        </Title>

        <Container>
          <Row>
            {this.state.chars.map(char => (
              <Column size="md-3 sm-6">
                <CharCard
                  key={char.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={char.id}
                  image={char.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default App;