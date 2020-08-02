import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet, TextInput } from 'react-native';
import { black, white, light_black } from '../utils/colors';
import { _addCardToDeck } from '../utils/storage';
import { addCard } from '../actions/index'
import { connect } from 'react-redux';

class NewFlashcard extends React.Component {

    state = {
        question: '',
        answer: ''
    }

    updateQuestion = (question) => {
        this.setState({ question });
    }

    updateAnswer = (answer) => {
        this.setState({ answer });
    }

    handleSubmit = () => {
        const card = {
            question: this.state.question,
            answer: this.state.answer
        };
        const { title, numCards } = this.props.route.params
        _addCardToDeck(title, card).then(() => {
            this.props.dispatch(addCard(title, card));
            this.props.navigation.navigate('Deck', { title, numCards: numCards + 1 });
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Question"
                    value={this.state.question}
                    onChangeText={this.updateQuestion} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Answer"
                    value={this.state.answer}
                    onChangeText={this.updateAnswer} />
                <TouchableHighlight style={styles.btn} onPress={this.handleSubmit} underlayColor={light_black}>
                    <Text style={{ color: white, textAlign: 'center' }}>Submit</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    input: {
        width: 300,
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 30,
        padding: 10
    },
    btn: {
        width: 150,
        padding: 10,
        borderWidth: 1,
        borderColor: black,
        borderRadius: 5,
        backgroundColor: black
    }
})

function mapStateToProps(state, props) {
    return {
        ...props
    }
}

export default connect(mapStateToProps)(NewFlashcard);