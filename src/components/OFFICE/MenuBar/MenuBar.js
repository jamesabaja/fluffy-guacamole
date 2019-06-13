import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuBar extends Component {
  render() {
    return (
      <Menu color='teal' inverted secondary>
        <Menu.Item header>MEDikts City Health Office Module</Menu.Item>
        <Menu.Item name='Dashboard' href='/office'/>
        <Menu.Item
          name='view orders'
          href='/office/view/orders'  
        />
        <Menu.Item
          name='view health centers'
          href='/office/view/health_centers'  
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