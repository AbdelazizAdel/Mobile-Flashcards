import 'react-native-gesture-handler';
import React from 'react';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import Deck from './components/Deck';
import NewFlashcard from './components/NewFlashcard';
import Flashcard from './components/Flashcard';
import QuizResult from './components/QuizResult';
import { NoQuestions } from './components/Deck';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, View } from 'react-native';
import { black, white } from './utils/colors';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function TabNavigation() {
	return (
		<Tab.Navigator tabBarOptions={{ indicatorStyle: { backgroundColor: black } }}>
			<Tab.Screen name="Home" component={DeckList} />
			<Tab.Screen name="New Deck" component={NewDeck} />
		</Tab.Navigator>
	);
}


export default function App() {
	return (
		<NavigationContainer>
			<Provider store={createStore(reducer)}>
				<View style={{ flex: 1 }}>
					<StatusBar />
					<Stack.Navigator>
						<Stack.Screen
							name="Home"
							component={TabNavigation}
							options={{ headerShown: false }} />
						<Stack.Screen
							name="Deck"
							component={Deck}
							options={({ route }) => ({ title: route.params.title })} />
						<Stack.Screen name="Add Flashcard" component={NewFlashcard} />
						<Stack.Screen
							name="No Questions"
							component={NoQuestions}
							options={({ route }) => ({ title: route.params.title })} />
						<Stack.Screen
							name="Quiz"
							component={Flashcard} />
						<Stack.Screen
							name="Quiz Result"
							component={QuizResult} />
					</Stack.Navigator>
				</View>
			</Provider>
		</NavigationContainer>

	);
}

