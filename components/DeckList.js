import React from 'react';
import { Text, FlatList, StyleSheet, View, AsyncStorage } from 'react-native';
import { gray, light_gray } from '../utils/colors';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { _getDecks } from '../utils/storage';;
import { recieveDecks } from '../actions/index'

class DeckList extends React.Component {

    componentDidMount() {
        _getDecks().then(decks => {
            this.props.dispatch(recieveDecks(decks));
        })
    }

    handleNavigation = (title, numCards) => {
        const { navigation } = this.props;
        navigation.navigate('Deck', { title, numCards })
    }

    renderItem = ({ item }) => {
        return (
            <TouchableHighlight
                style={styles.deck}
                onPress={() => this.handleNavigation(item.title, item.questions.length)}
                underlayColor={light_gray}>
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.count}>{item.questions.length} cards</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        if (Object.values(this.props.decks).length == 0)
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30 }}>No Decks Created</Text>
                </View>
            );
        const data = Object.values(this.props.decks);
        data.sort((a, b) => b.questions.length - a.questions.length);
        return (
            <FlatList style={{ marginTop: 50 }}
                data={data}
                renderItem={this.renderItem}
                keyExtractor={(item) => `${item.title}`} />
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: "center"
    },
    count: {
        fontSize: 15,
        color: gray,
        textAlign: 'center'
    },
    deck: {
        justifyContent: 'center',
        alignItems: "stretch",
        borderWidth: 1,
        borderColor: gray,
        borderRadius: 5,
        padding: 20,
        margin: 20,
    }
});

function mapStateToProps(state, props) {
    return {
        decks: state,
        ...props
    }
}

export default connect(mapStateToProps)(DeckList);