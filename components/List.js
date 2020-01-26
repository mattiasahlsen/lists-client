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

  return (
    <View style={styles.container}>
      <View style={spacingY}>
        <Text style={titleStyle}>List ID</Text>
        <View style={styles.listId}>
          <Text style={{ fontSize: 16 }}>{list.id}</Text>
          <Button title="Copy" onPress={copyId} style={{ marginLeft: 5 }}/>
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
  },
  listId: {
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