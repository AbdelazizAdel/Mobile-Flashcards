import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { red, white, green, light_red, light_green } from '../utils/colors';
import { connect } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

class Flashcard extends React.Component {

    state = {
        question: true
    }

    toggleView = () => {
        this.setState((state) => ({ question: !state.question }))
    }

    handleCorrect = () => {
        const { title, idx, score } = this.props.route.params;
        const total = this.props.state[title]['questions'].length;
        if (idx == total - 1)
            this.props.navigation.navigate("Quiz Result", { title, total, score: score + 1 });
        else
            this.props.navigation.push("Quiz", { title, idx: idx + 1, score: score + 1 });
    }

    handleInCorrect = () => {
        const { title, idx, score } = this.props.route.params;
        const total = this.props.state[title]['questions'].length;
        if (idx === total - 1)
            this.props.navigation.navigate("Quiz Result", { title, total, score });
        else
            this.props.navigation.push("Quiz", { title, idx: idx + 1, score });
    }

    render() {
        const { title, idx, score } = this.props.route.params;
        const { questions } = this.props.state[title];
        return (
            <View style={styles.conatiner}>
                <Text>{`${idx + 1}/${questions.length}`}</Text>
                <View>
                    <Text style={styles.question}>{`${this.state.question ? questions[idx].question : questions[idx].answer}`}</Text>
                    <TouchableWithoutFeedback onPress={this.toggleView}>
                        <Text style={{ textAlign: "center", color: red }}>{`${this.state.question ? 'Answer' : 'Question'}`}</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View>
                    <TouchableHighlight
                        style={[styles.btn, { backgroundColor: green }]}
                        onPress={this.handleCorrect}
                        underlayColor={light_green}>
                        <Text style={{ color: white, textAlign: "center" }}>Correct</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={[styles.btn, { marginTop: 10 }]}
                        onPress={this.handleInCorrect}
                        underlayColor={light_red}>
                        <Text style={{ color: white, textAlign: "center" }}>Incorrect</Text>
                    </TouchableHighlight>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center"
    },
    question: {
        fontSize: 30,
        textAlign: "center"
    },
    btn: {
        width: 150,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: red
    }
});

function mapStateToProps(state, props) {
    return {
        state,
        ...props
    }
}

export default connect(mapStateToProps)(Flashcard);