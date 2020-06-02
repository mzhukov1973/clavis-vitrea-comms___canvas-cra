/*React************************************************************************/
/*  Copyright 2019 Maxim Zhukov                                               */
/*                                                                            */
/*  Licensed under the Apache License, Version 2.0 (the "License");           */
/*  you may not use this file except in compliance with the License.          */
/*  You may obtain a copy of the License at                                   */
/*                                                                            */
/*      http://www.apache.org/licenses/LICENSE-2.0                            */
/*                                                                            */
/*  Unless required by applicable law or agreed to in writing, software       */
/*  distributed under the License is distributed on an "AS IS" BASIS,         */
/*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  */
/*  See the License for the specific language governing permissions and       */
/*  limitations under the License.                                            */
/******************************************************************************/
import   React                      from 'react'
import { connect }                  from 'react-redux'
import { settingsUIActionCreators, appUIActionCreators } from './actions'
import   ClaVitCommsSandboxOne      from './components/ClaVitCommsSandboxOne'
import   ClaVitCommsSandboxTwo      from './components/ClaVitCommsSandboxTwo'
import   ClaVitCommsSettingsUI      from './components/ClaVitCommsSettingsUI'
import   ClaVitCommsTSTestbed       from './components/ClaVitCommsTSTestbed'
import   logo                       from './images/logos/logo64.svg'
import { PageHeader, Icon, Button, Drawer, Tabs } from 'antd'



class App extends React.Component {
  static displayName = 'App'
  render = () => (
    <div className='App'>
     <PageHeader className='App-header' backIcon={false} avatar={{src:logo,size:'large',shape:'square'}} title='ClaVit:Commsᵦ' subTitle='version 0.1.2' extra={[(<Button key='settingsDrawer' type='normal' style={{border:'none',backgroundColor:'transparent'}} onClick={ev=>this.props.setSetUIOn(!this.props.settingsUIOn)}><Icon type='menu' theme='outlined' style={{fontSize:20,verticalAlign:'center'}}/></Button>)]}/>
     <Tabs activeKey={this.props.activeTabKey} onChange={newKey=>this.props.setActTab(newKey)} size='large' className='mainTabBar' tabBarStyle={{backgroundColor:'#4788f4ff'}}>
      <Tabs.TabPane key='1' tab={<span><Icon type='experiment' theme={this.props.activeTabKey==='1'?'filled':'outlined'} rotate={this.props.activeTabKey==='1'?90:0}/>Sandbox №1</span>}>
       <ClaVitCommsSandboxOne/>
      </Tabs.TabPane>
      <Tabs.TabPane key='2' tab={<span><Icon type='experiment' theme={this.props.activeTabKey==='2'?'filled':'outlined'} rotate={this.props.activeTabKey==='2'?90:0}/>Touchscreen testbed</span>}>
       <ClaVitCommsTSTestbed/>
      </Tabs.TabPane>
      <Tabs.TabPane key='3' tab={<span><Icon type='experiment' theme={this.props.activeTabKey==='3'?'filled':'outlined'} rotate={this.props.activeTabKey==='3'?90:0}/>Sandbox №2</span>}>
       <ClaVitCommsSandboxTwo/>
      </Tabs.TabPane>
      <Tabs.TabPane key='4' tab={<span><Icon type='setting' theme={this.props.activeTabKey==='4'?'filled':'outlined'} rotate={this.props.activeTabKey==='4'?90:0}/>Settings</span>}>
       <ClaVitCommsSettingsUI/>
      </Tabs.TabPane>
     </Tabs>
     <Drawer className='settingsDrawer' title='Settings' placement='right' closable mask maskClosable keyboard destroyOnClose={false} visible={this.props.settingsUIOn} onClose={ev=>this.props.setSetUIOn(false)} width={'90%'}
             drawerStyle={{/*Style of the popup layer element*/}}
             headerStyle={{/*Style of the drawer header part*/}}
             bodyStyle={{/*Style of the drawer content part*/}}>
      <ClaVitCommsSettingsUI/>
     </Drawer>
     <style jsx='true'>{`
       body            {margin:0;font-family:'-apple-system','BlinkMacSystemFont','SegoeUI','Roboto','Oxygen','Ubuntu','Cantarell','FiraSans','DroidSans','HelveticaNeue','sans-serif';color:#303030ff;background-color:rgba(210,225,225,1);position:relative;background-color:#87c8f4ff;}
       code            {font-family:'source-code-pro','Menlo','Monaco','Consolas','Courier New','monospace';}
       .App            {}
       .mainTabBar                                                             {color:#0000007f;}
       .mainTabBar .ant-tabs-tab:hover                                         {color:#000000ff;}
       .mainTabBar .ant-tabs-tab:active                                        {color:#ffffff7f;}
       .mainTabBar .ant-tabs-tab-active,.mainTabBar .ant-tabs-tab-active:hover {color:#ffff00ff;}
       .App-logo       {height:5vmin;}
       .App-header     {background-color:#4788f4ff;}
       .App-logo-name  {display:flex;flex-direction:row;justify-content:center;align-items:center;}
       .App-main       {display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:calc(10px+2vmin);margin-bottom:5vh;margin-top:10vh;}
       .App-footer     {position:fixed;bottom:0;width:100%;height:5vh;background-color:#4788f4ff;font-size:calc(10px+2vmin);}
       .settingsDrawer {}
     `}</style>
    </div>
  )
}

const mapStateToProps = state => ({
  settingsUIOn: state.settingsUI.settingsUIOn,
  activeTabKey: state.appUI.activeTabKey
})
const mapDispatchToProps = (dispatch,ownProps) => ({
  setSetUIOn: on  => dispatch(settingsUIActionCreators.setSetUIOn(on)),
  setActTab:  key => dispatch(appUIActionCreators.setActTab(key))
})
const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export { connectedApp as App, connectedApp as default }
