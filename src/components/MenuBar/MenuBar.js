import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuBar extends Component {
  render() {
    return (
      <Menu secondary>
        <Menu.Item name='home' href='/'/>
        <Menu.Item
          name='about'
          href='/about'  
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            href='/login'
          />
        </Menu.Menu>
      </Menu>
    )
  }
}