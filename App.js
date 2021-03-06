import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    Button,
    Platform,
} from 'react-native'
import queryString from 'querystring'

import Error from './components/Error'
import OpenList from './components/OpenList'
import List from './components/List'

import {
  colors,
  title as titleStyle
} from './styles'
import env from './env'
const { API } = env

const LIFETIME = 1000 * 3600 * 24 // 24 hours

export default class App extends Component {
  state = {
    error: null,
    list: null,
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.error && 
          <Error
            error={this.state.error}
            closeError={this.closeError.bind(this)}
          />
        }
        { this.state.list &&
          <View style={{ ...styles.fullWidth, alignItems: 'flexStart '}}>
            <Button
              title='Go back'
              onPress={this.goBack.bind(this)}
            />
          </View>
        }

        {
          this.state.list ?
            <View style={{ ...styles.listContainer, ...styles.fullWidth}}>
              <List
                addItem={this.addItem.bind(this)}
                deleteList={this.deleteList.bind(this)}
                list={this.state.list}
              />
            </View> :
            <View style={styles.fullWidth}>
              <OpenList
                style={styles.borderBottom}
                openList={this.openList.bind(this)}
              />

              <Text style={titleStyle}>New list</Text>
              <View style={{ alignItems: 'center' }}>
                <Button
                  title='Create new list'
                  onPress={this.newList.bind(this)}
                />
              </View>
            </View>
        }
      </View>
    )
  }

  closeError() {
    this.setState(state => ({ ...state, error: null }))
  }
  goBack() {
    this.setState(state => ({ ...state, list: null }))
  }

  networkError() {
    this.setState(state => ({ ...state, error: 'Network error' }))
  }
  serverError() {
    this.setState(state => ({ ...state, error: 'Network error' }))
  }
  notFound() {
    this.goBack()
    this.setState(state => ({ ...state, error: 'List not found' }))
  }

  openList(id) {
    fetch(API + '/list?' + queryString.stringify({ id })).then(async resp => {
      if (resp.status === 200) {
        const list = await resp.json()
        list.expires = new Date(list.expires * 1000)
        this.setState(state => ({ ...state, list, }))
      } else if (resp.status === 404) this.notFound()
      else this.serverError()
    }).catch(this.networkError)
  }
  newList() {
    fetch(API + '/new-list').then(async resp => {
      if (resp.status === 200) {
        const list = await resp.json()
        list.expires = new Date(list.expires * 1000)
        this.setState(state => ({ ...state, list, }))
      } else this.serverError()
    }).catch(this.networkError)
  }

  addItem(item) {
    const formData = new FormData()
    formData.append('item', item)
    fetch(API + '/item?' + queryString.stringify({ id: this.state.list.id }), {
      method: 'POST',
      body: formData
    }).then(async resp => {
      if (resp.status === 200) {
        const list = await resp.json()
        list.expires = new Date(list.expires * 1000)
        this.setState(state => ({ ...state, list, }))
      } else if (resp.status === 404) this.notFound()
      else this.serverError() 
    }).catch(this.networkError)
  }

  deleteList() {
    fetch(API + '/delete?' + queryString.stringify({ id: this.state.list.id }))
      .then(async resp => {
        if (resp.status === 200) return this.goBack()
        else if (resp.status === 404) return this.notFound()
        else this.serverError()
      }).catch(this.networkError)
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 5,
    paddingTop: 70,
    alignItems: 'center',
  },
  listContainer: {
    flex: 1
  },
  contentContainer: {
  },
  fullWidth: {
    alignSelf: 'stretch',
    padding: 5,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  }
})
