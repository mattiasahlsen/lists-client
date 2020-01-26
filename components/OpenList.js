import React, { useState } from 'react'
import { View, Button, Text } from 'react-native'
import TextInput from './TextInput'


import {
  colors,
  input as inputStyle,
  title as titleStyle
} from '../styles'

export default function OpenList(props) {
  const [input, setInput] = useState('')
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <Text style={{ ...titleStyle, marginBottom: 5 }}>Open list</Text>
      <TextInput
        style={inputStyle}
        onChangeText={setInput}
        value={input}
        placeholder='List ID'
      />
      <View style={{ alignItems: 'center' }}>
        <Button
          title='Open'
          onPress={() => props.openList(input)}
          disabled={input.length === 0}
        />
      </View>
    </View>
  )
}

const styles = {
  container: {
    alignSelf: 'stretch',
    marginBottom: 5,
  },
}