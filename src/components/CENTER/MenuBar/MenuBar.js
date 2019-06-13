import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuBar extends Component {
  render() {
    return (
      <Menu color='teal' secondary>
        <Menu.Item header>MEDikts Health Center Module</Menu.Item>
        <Menu.Item name='Dashboard' href='/clinics'/>
        <Menu.Item
          name='inventory'
          href='/clinics/inventory'  
        />
        <Menu.Item
          name='order'
          href='/clinics/order'  
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            href='/login'
          />
        </Menu.Menu>
      </Menu>
    )
  }
}