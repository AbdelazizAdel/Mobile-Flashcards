import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { black, gray, white, light_black, light_gray } from '../utils/colors';


class Deck extends React.Component {

	handleAddCard = () => {
		const { title, numCards } = this.props.route.params;
		this.props.navigation.navigate('Add Flashcard', { title, numCards });
	}

	handleStartQuiz = () => {
		const { title, numCards } = this.props.route.params;
		if (numCards == 0)
			this.props.navigation.navigate('No Questions', { title })
		else {
			this.props.navigation.navigate('Quiz', { title, idx: 0, score: 0 })
		}
	}

	render() {
		const { title, numCards } = this.props.route.params;
		return (
			<View style={styles.container}>
				<View style={styles.info}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.count}>{numCards} cards</Text>
				</View>
				<View style={styles.btns}>
					<TouchableHighlight
						style={styles.add_btn}
						onPress={this.handleAddCard}
						underlayColor={light_gray} >
						<Text style={{ textAlign: 'center' }}>Add Card</Text>
					</TouchableHighlight>
					<TouchableHighlight
						style={styles.quiz_btn}
						onPress={this.handleStartQuiz}
						underlayColor={light_black} >
						<Text style={{ color: white, textAlign: 'center' }}>Start Quiz</Text>
					</TouchableHighlight>
				</View>
			</View >

		);
	}
}

export function NoQuestions() {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text
				style={{ fontSize: 20, textAlign: "center" }}>
				Sorry, you cannot take a quiz because there are no cards in the deck
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	info: {
		marginTop: 100
	},
	title: {
		fontSize: 25,
		fontWeight: 'bold'
	},
	count: {
		fontSize: 15,
		color: gray,
		textAlign: 'center'
	},
	btns: {
		marginTop: 'auto',
		marginBottom: 'auto',
	},
	add_btn: {
		width: 200,
		padding: 10,
		borderWidth: 1,
		borderColor: black,
		borderRadius: 5,
		marginBottom: 5,
	},
	quiz_btn: {
		width: 200,
		padding: 10,
		borderWidth: 1,
		borderColor: black,
		borderRadius: 5,
		backgroundColor: black
	}
})

export default Deck;