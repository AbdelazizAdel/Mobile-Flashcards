import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { black, light_black, white, light_gray } from '../utils/colors';

class QuizResult extends React.Component {

    handleRestartQuiz = () => {
        const title = this.props.route.params.title;
        this.props.navigation.navigate('Quiz', { title, idx: 0, score: 0 })
    }

    handleBackToDeck = () => {
        const { navigation } = this.props;
        const { title, total } = this.props.route.params;
        navigation.navigate('Deck', { title, numCards: total })
    }

    render() {
        const { score, total } = this.props.route.params;
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 30, textAlign: "center" }}>
                    You got {score} out of {total} questions right.
                </Text>
                <TouchableHighlight
                    style={[styles.restart_btn, { marginTop: 30 }]}
                    onPress={this.handleRestartQuiz}
                    underlayColor={light_gray} >
                    <Text style={{ textAlign: 'center' }}>Restart Quiz</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.back_btn}
                    onPress={this.handleBackToDeck}
                    underlayColor={light_black} >
                    <Text style={{ color: white, textAlign: 'center' }}>Back to Deck</Text>
                </TouchableHighlight>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    restart_btn: {
        width: 200,
        padding: 10,
        borderWidth: 1,
        borderColor: black,
        borderRadius: 5,
        marginBottom: 5,
    },
    back_btn: {
        width: 200,
        padding: 10,
        borderWidth: 1,
        borderColor: black,
        borderRadius: 5,
        backgroundColor: black
    }
});

export default QuizResult;