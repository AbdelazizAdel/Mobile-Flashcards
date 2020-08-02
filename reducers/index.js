import { RECIEVE_DECKS, ADD_DECK, ADD_CARD } from '../actions/index';

export default function decks(state = {}, action) {
    switch (action.type) {
        case RECIEVE_DECKS:
            console.log('RECIEVE_DECKS', action);
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            console.log('ADD_DECK', action);
            return {
                ...state,
                [action.deck.title]: action.deck
            }
        case ADD_CARD:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    questions: state[action.title]['questions'].concat(action.card)
                }
            }
        default:
            return state;
    }
}