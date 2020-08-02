import { AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo'

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

export function clearLocalNotification() {
    return AsyncStorage.removeItem('notification')
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'Take a quiz!',
        body: "👋 don't forget to study today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem('notification')
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem('notification', JSON.stringify(true))
                        }
                    })
            }
        })
}