import React, { useState } from 'react'
import {
  View,
  ScrollView,
  Text,
  Button,
  Clipboard
} from 'react-native'

import TextInput from './TextInput'

import {
  colors,
  input as inputStyle,
  title as titleStyle,
  spacingY,
} from '../styles'

export default function List(props) {
  const list = props.list
  const [input, setInput] = useState('')

  const addItem = input => {
    props.addItem(input)
    setInput('')
  }

  const copyId = () => {
    Clipboard.setString(props.list.id)
  }

  const timeLeft = expires => {
      const msLeft = expires.getTime() - Date.now()
      const minutesLeft = msLeft / 1000 / 60
      const hoursLeft = minutesLeft / 60
      return Math.floor(hoursLeft) + 'h ' + Math.floor(minutesLeft % 60) + 'm'
  }
  const addZero = n => n < 10 ? '0' + n : n

  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

  return (
    <View style={styles.container}>
      <View style={spacingY}>
        <View style={styles.row}>
          <Text style={titleStyle}>List ID</Text>
          <Button
            title="Delete"
            onPress={props.deleteList}
            style={{ marginLeft: 5 }}
          />
        </View>
        <View style={styles.row}>
          <Text style={{ fontSize: 16 }}>{list.id}</Text>
          <Button title="Copy" onPress={copyId} style={{ marginLeft: 5 }}/>
        </View>
        <View style={styles.row}>
          <Text style={titleStyle}>Expires</Text>
          <Text style={{ fontSize: 16, marginLeft: 5 }}>
            {days[list.expires.getDay()] + ' '}
            {addZero(list.expires.getHours())}:
            {addZero(list.expires.getMinutes())}
          </Text>
        </View>
      </View>

      <TextInput 
        style={inputStyle}
        onChangeText={setInput}
        value={input}
        placeholder='New item'
      />
      <Button
        title='Add item'
        onPress={() => addItem(input)}
        disabled={input.length === 0}
      />

      <Text style={{ marginBottom: 5 }}>Items</Text>
      <ScrollView style={styles.list}>
        {
          list.items.map((item, index) => (
            <View style={styles.itemContainer} key={index}>
              <Text style={styles.item}>{item}</Text>
            </View>
          ))
        }
      </ScrollView>
    </View>
  )
}

const styles = {
  container: {
    alignSelf: 'stretch',
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  list: {
  },
  itemContainer: {
    borderRadius: 3,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
    marginBottom: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  item: {
    fontSize: 24,
  }
}