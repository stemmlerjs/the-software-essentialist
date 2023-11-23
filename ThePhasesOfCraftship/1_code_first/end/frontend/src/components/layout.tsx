import React from 'react';
import { Content } from './content';
import { Header } from './header'

export const Layout = ({ children }: any) => (
  <>
    <Header>
      
    </Header>
    <Content>
        {children}
    </Content>
  </>
)