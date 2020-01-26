import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { View, Text } from 'react-native'

import { colors } from '../styles'

export default function Error(props) {
  return (
    <View style={styles.error}>
      <Text style={styles.errorText}>{props.error}</Text>
      <FontAwesome
        name="remove"
        size={38}
        color={colors.lightText}
        style={styles.removeIcon}
        onPress={props.closeError}
      />
    </View>
  )
}

const styles = {
  error: {
    top: (Platform.OS === 'ios') ? 18 : 0,
    backgroundColor: colors.error,
    position: 'absolute',
    left: 0,
    right: 0,
    padding: 5,
    alignItems: 'center'
  },
  errorText: {
    color: colors.lightText,
    fontSize: 30,
  },
  removeIcon: {
    position: 'absolute',
    right: 5,
    top: 3
  }
}
