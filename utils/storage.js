import { AsyncStorage } from 'react-native';

export function _getDecks() {
    return AsyncStorage.getItem('decks').then(JSON.parse);
}

export function _getDeck(title) {
    return _getDecks().then(decks => decks[title]);
}

export function _saveDeckTitle(title) {
    return _getDecks().then(decks => {
        if (decks === null)
            decks = {};
        decks[title] = {
            title,
            questions: []
        };
        return AsyncStorage.setItem('decks', JSON.stringify(decks));
    })
}

export function _addCardToDeck(title, card) {
    return _getDecks().then(decks => {
        decks[title]['questions'].push(card);
        return AsyncStorage.setItem('decks', JSON.stringify(decks));
    })
}