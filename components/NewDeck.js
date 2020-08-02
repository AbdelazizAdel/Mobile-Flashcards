import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet, TextInput } from 'react-native';
import { black, white, light_black } from '../utils/colors';
import { connect } from 'react-redux';
import { addDeck } from '../actions/index';
import { _saveDeckTitle, _getDeck } from '../utils/storage';

class NewDeck extends React.Component {

    state = {
        text: ''
    }

    updateText = (text) => {
        this.setState({ text });
    }

    handleSubmit = () => {
        const title = this.state.text;
        _saveDeckTitle(title).then(() => _getDeck(title)).then(deck => {
            this.props.dispatch(addDeck(deck));
            this.setState({ text: '' });
            this.props.navigation.navigate('Deck', { title, numCards: 0 });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Deck Title"
                    value={this.state.text}
                    onChangeText={this.updateText} />
                <TouchableHighlight style={styles.btn} underlayColor={light_black} onPress={this.handleSubmit}>
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
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        width: 250
    },
    input: {
        width: 300,
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 30,
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

export default connect()(NewDeck);