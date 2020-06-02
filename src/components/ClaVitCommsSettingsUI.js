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
import   React                                               from 'react'
import   ReactDOM                                            from 'react-dom'
import   PropTypes                                           from 'prop-types'
import { connect }                                           from 'react-redux'
import { settingsUIActionCreators, tsTestbedActionCreators } from '../actions'
//import { formToNum, numToForm }                              from '../modules/utils'
import { genGlyphFormsDisplay }                              from '../modules/utils'
import { Divider, Collapse, Icon, Select, Input, Tooltip, InputNumber, Switch }  from 'antd'

const { Panel }  = Collapse
const { Option } = Select

class ClaVitCommsSettingsUI extends React.Component {
  static propTypes    = {
    settingsUIOn:                  PropTypes.bool.isRequired,
    glyphSize:                     PropTypes.oneOf([16,64,128]).isRequired,
    glyphPxSize:                   PropTypes.oneOf([2,3,4]).isRequired,
    scrPxSize:                     PropTypes.string.isRequired,
    glyphPxFormsShown:             PropTypes.bool.isRequired,
    storageEncrypt:                PropTypes.bool.isRequired,
    pwHash:                        PropTypes.string.isRequired,
    storageEncryptionKeyEnc:       PropTypes.string.isRequired,
    storageEncryptionKeyClr:       PropTypes.string.isRequired,
    glyphPxFormsForSize02:         PropTypes.array.isRequired,
    glyphPxFormsForSize03:         PropTypes.array.isRequired,
    glyphPxFormsForSize04:         PropTypes.array.isRequired,
    baseMarkersProgressSizePx:     PropTypes.number.isRequired,
    markerReadyTimeout:            PropTypes.number.isRequired,
    markerReadySuccessTimeout:     PropTypes.number.isRequired,
    markerReadyPauseTimeout:       PropTypes.number.isRequired,
    markerReadyTimeoutInterval:    PropTypes.number.isRequired,
    settingsAccActKey:             PropTypes.oneOf(['general','storeEncryption','tsTestbed','sandboxOne',undefined]),
    showDoIntervalTimings:         PropTypes.bool.isRequired,
    setSetUIOn:                    PropTypes.func.isRequired,
    setGlyphSize:                  PropTypes.func.isRequired,
    setGlyphPx:                    PropTypes.func.isRequired,
    setScrPx:                      PropTypes.func.isRequired,
    setSetUIGlyphPxFormsOn:        PropTypes.func.isRequired,
    setStorageEncryption:          PropTypes.func.isRequired,
    setPwHash:                     PropTypes.func.isRequired,
    setStorageEncryptionKeyEnc:    PropTypes.func.isRequired,
    setStorageEncryptionKeyClr:    PropTypes.func.isRequired,
    setSetGlyphPxSize02Forms:      PropTypes.func.isRequired,
    setSetGlyphPxSize03Forms:      PropTypes.func.isRequired,
    setSetGlyphPxSize04Forms:      PropTypes.func.isRequired,
    setMarkerReadyTimeout:         PropTypes.func.isRequired,
    setMarkerReadySuccessTimeout:  PropTypes.func.isRequired,
    setMarkerReadyPauseTimeout:    PropTypes.func.isRequired,
    setMarkerReadyTimeoutInterval: PropTypes.func.isRequired,
    setSettingsAccActKey:          PropTypes.func.isRequired,
    setShowDoIntervalTimings:      PropTypes.func.isRequired,
    setBaseMarkersProgressSizePx:  PropTypes.func.isRequired
  }
  static displayName  = 'ClaVitCommsSettingsUI'

  state = {
    sessionKey: 'rndSessKey'+(Math.random()*10000).toFixed(0)+'dec',
    password:   ''
  }
  encryptPw      = (clearPw,pwKey=this.state.sessionKey)                   => pwKey+'__'+clearPw+'__'+pwKey
  decryptPw      = (encPw=this.state.password,pwKey=this.state.sessionKey) => encPw.slice(pwKey.length+'__'.length).slice(0,-pwKey.length-'__'.length)
  encryptStorKey = (clearStorKey,pw=this.decryptPw())                                  => '|='+pw+'_=-=_'+clearStorKey+'_=-=_'+pw+'=|'
  decryptStorKey = (encStorKey=this.props.storageEncryptionKeyEnc,pw=this.decryptPw()) => encStorKey.slice(pw.length+'_=-=_'.length+'|='.length).slice(0,-pw.length-'_=-=_'.length-'=|'.length)

  genExtraIcon = (iconName,panelKey,controllerProp,spinOnActive=false,themeChangeOnActive=true,colorOnActive='#ffff00ff') => {
    if (typeof iconName==='object') {
      panelKey            = (!panelKey)            ? Array(iconName.length).fill(false)   : (typeof panelKey==='object'?panelKey:Array(iconName.length).fill(panelKey))
      controllerProp      = (!controllerProp)      ? Array(iconName.length).fill(false)   : (typeof controllerProp==='object'?controllerProp:Array(iconName.length).fill(controllerProp))
      spinOnActive        = (!spinOnActive)        ? Array(iconName.length).fill(false)   : (typeof spinOnActive==='object'?spinOnActive:Array(iconName.length).fill(spinOnActive))
      themeChangeOnActive = (!themeChangeOnActive) ? Array(iconName.length).fill(false)   : (typeof themeChangeOnActive==='object'?themeChangeOnActive:Array(iconName.length).fill(themeChangeOnActive))
      colorOnActive       = (!colorOnActive)       ? Array(iconName.length).fill('unset') : (typeof colorOnActive==='object'?colorOnActive:Array(iconName.length).fill(colorOnActive))
      return iconName.map((el,idx)=>(<Icon key={String(idx)} type={iconName[idx]} spin={(spinOnActive[idx]&&(!!(this.props[controllerProp[idx]]?panelKey[idx]:undefined))&&(this.props[controllerProp[idx]]?panelKey[idx]:undefined)===String(panelKey[idx]))} theme={((themeChangeOnActive[idx]&&(!!(this.props[controllerProp[idx]]?panelKey[idx]:undefined))&&(this.props[controllerProp[idx]]?panelKey[idx]:undefined)===String(panelKey[idx]))?'filled':'outlined')} style={{color:((colorOnActive[idx]&&(!!(this.props[controllerProp[idx]]?panelKey[idx]:undefined))&&(this.props[controllerProp[idx]]?panelKey[idx]:undefined)===String(panelKey[idx]))?colorOnActive[idx]:'unset')}}/>))
    } else {
      spinOnActive        = (!spinOnActive)        ? false   : spinOnActive
      themeChangeOnActive = (!themeChangeOnActive) ? false   : themeChangeOnActive
      colorOnActive       = (!colorOnActive)       ? 'unset' : colorOnActive
      return (<Icon type={iconName} spin={(spinOnActive&&(!!(this.props[controllerProp]?panelKey:undefined))&&(this.props[controllerProp]?panelKey:undefined)===String(panelKey))} theme={((themeChangeOnActive&&(!!(this.props[controllerProp]?panelKey:undefined))&&(this.props[controllerProp]?panelKey:undefined)===String(panelKey))?'filled':'outlined')} style={{color:((colorOnActive&&(!!(this.props[controllerProp]?panelKey:undefined))&&(this.props[controllerProp]?panelKey:undefined)===String(panelKey))?colorOnActive:'unset')}}/>)
    }
    }
  localDOMRoot = null

  componentDidMount = () => {
    this.localDOMRoot = ReactDOM.findDOMNode(this)
  }

  componentWillUnmount = () => {}

  componentDidUpdate = (prevProps, prevState) => {
    if ((this.props.storageEncryptionKeyEnc!==prevProps.storageEncryptionKeyEnc)&&(this.props.storageEncryptionKeyClr===prevProps.storageEncryptionKeyClr)) { this.props.setStorageEncryptionKeyClr(this.decryptStorKey(this.props.storageEncryptionKeyEnc)) }
    if ((this.props.storageEncryptionKeyClr!==prevProps.storageEncryptionKeyClr)&&(this.props.storageEncryptionKeyEnc===prevProps.storageEncryptionKeyEnc)) { this.props.setStorageEncryptionKeyEnc(this.encryptStorKey(this.props.storageEncryptionKeyClr)) }
    if (this.state.password!==prevState.password) {
      this.props.setPwHash(this.decryptPw()+'_hsh_'+(Math.random()*100000000.).toFixed(0))
      this.props.setStorageEncryptionKeyEnc(this.encryptStorKey(this.decryptStorKey(this.props.storageEncryptionKeyEnc,this.decryptPw(prevState.password)),this.decryptPw()))
    }
  }

  render = () => {
    return (
      <div className={this.props.settingsUIOn?'settingsUI shown':'settingsUI'}>
       <h1 className={this.props.settingsUIOn?'titl shown':'titl'}>Component <code>&lt;SettingsUI/&gt;</code>.</h1>
       <h3><em>Settings User Interface</em></h3>
       <Divider orientation='left' type='horizontal'>Persistant store:</Divider>
       <Collapse accordion bordered expandIconPosition='left' onChange={this.props.setSettingsAccActKey} activeKey={this.props.settingsAccActKey} expandIcon={({isActive})=>(<Icon type='tool' rotate={isActive?90:0} color={isActive?'#ffff00ff':'unset'} theme={'filled'}/>)} className='settingsCollapse'>
        <Panel header='General app settings' key='general' extra={this.genExtraIcon('info-circle','general')} className='settingsPanel'>
         <ul>
          <li>
           <label htmlFor='setUI_inpCheck_SettingsUIOn'>Settings UI:&nbsp;</label>
           <input type='checkbox' id='setUI_inpCheck_SettingsUIOn' checked={this.props.settingsUIOn} onChange={ev=>this.props.setSetUIOn(ev.target.checked)}/>
           <label htmlFor='setUI_inpCheck_SettingsUIOn'>&nbsp;{this.props.settingsUIOn?(<span className='strEnabled'>shown</span>):(<span className='strDisabled'>hidden</span>)}</label>
          </li>
         </ul>
        </Panel>
        <Panel header='Local storage encryption' key='storeEncryption' extra={this.genExtraIcon('info-circle','storeEncryption')} className='settingsPanel'>
         <ul>
          <li>
           <label htmlFor='setUI_inpCheck_StorageEncryption'>Storage encryption:&nbsp;</label>
           <input type='checkbox' id='setUI_inpCheck_StorageEncryption' checked={this.props.storageEncrypt} onChange={ev=>this.props.setStorageEncryption(ev.target.checked)}/>
           <label htmlFor='setUI_inpCheck_StorageEncryption'>&nbsp;{this.props.storageEncrypt?(<span className='strEnabled'>enabled</span>):(<span className='strDisabled'>disabled</span>)}</label>
          </li>
          <li>
           <label htmlFor='setUI_inpText_pw'>Password:&nbsp;</label>
           <input type='password' id='setUI_inpText_pw' placeholder='Password to encrypt storage encryption key with.' size={40}/>&nbsp;
           <input type='button' name='setUI_set_pw' value='Set Password' onClick={ev=>this.setState(Object.assign({},this.state,{password:(this.encryptPw(this.localDOMRoot.querySelector('#setUI_inpText_pw').value))}))}/>
           <ul>
            <li><small><em>Cleartext password:&nbsp;</em><code style={{backgroundColor:'#b0b0b0ff'}}>{this.decryptPw()}</code></small></li>
            <li><small><em>Encrypted password,stored in local state:&nbsp;</em><code style={{backgroundColor:'#b0b0b0ff'}}>{this.state.password}</code></small></li>
           </ul>
          </li>
          <li>
           <label htmlFor='setUI_inpText_pwHash'>Stored password hash:&nbsp;</label>
           <input type='text' id='setUI_inpText_pwHash' value={this.props.pwHash} readOnly/>
          </li>
          <li>
           <label htmlFor='setUI_inpText_StorageEncryptionKeyEnc'>Storage encryption key (encrypted):&nbsp;</label>
           <textarea id='setUI_inpText_StorageEncryptionKeyEnc' value={this.props.storageEncryptionKeyEnc} onChange={ev=>this.props.setStorageEncryptionKeyEnc(ev.target.value)} cols={64} rows={20}/>
          </li>
          <li>
           <label htmlFor='setUI_inpText_StorageEncryptionKeyClr'>Storage encryption key (decrypted):&nbsp;</label>
           <textarea id='setUI_inpText_StorageEncryptionKeyClr' value={this.props.storageEncryptionKeyClr} cols={64} rows={20} readOnly placeholder={"  A 64x20 <textarea> to display/set current storage encryption key, encrypted with the current password (password is never persisted in any way (it is blacklisted in redux-persist) and is stored in the current instance of the redux store, encrypted with random, session-specific key).\n  Passwords' hash on the other hand is persisted to provide for some trivial authentication functionality.\n\n0123456789012345678901234567890123456789012345678901234567890123\n|         |         |         |         |         |         |  |\n0        10        20        30        40        50        60 63\n"}/>
          </li>
         </ul>
        </Panel>
        <Panel header='Sandbox One' key='sandboxOne' extra={this.genExtraIcon('info-circle','sandboxOne')} className='settingsPanel'>
         <ul>
          <li>
           <label htmlFor='setUI_sel_GlyphSize'>Glyph size:&nbsp;</label>
           <Select value={this.props.glyphSize} onChange={newVal=>this.props.setGlyphSize(newVal)} id='setUI_sel_GlyphSize'>
            <Option value={16}>16☓16</Option>
            <Option value={64}>64☓64</Option>
            <Option value={128}>128☓128</Option>
           </Select>
          </li>
          <li>
           <label htmlFor='setUI_sel_GlyphPxSize'>Glyph pixels size:&nbsp;</label>
           <Select value={this.props.glyphPxSize} onChange={newVal=>this.props.setGlyphPx(newVal)}  id='setUI_sel_GlyphPxSize'>
            <Option value={2}>2☓2</Option>
            <Option value={3} disabled>3☓3</Option>
            <Option value={4} disabled>4☓4</Option>
           </Select>
          </li>
          <li>
           <label htmlFor='setUI_inpText_scrPxSize'>Screen pixel size:&nbsp;</label>
           <input type='text' id='setUI_inpText_scrPxSize' value={this.props.scrPxSize} onChange={ev=>this.props.setScrPx(ev.target.value)}/>
          </li>
          <li>
           <Collapse bordered expandIconPosition='left' onChange={newKey=>{this.props.setSetUIGlyphPxFormsOn((typeof newKey[0]!=='undefined')?true:false)}} activeKey={this.props.glyphPxFormsShown?'glyphPxForms':undefined} expandIcon={({isActive})=>(<Icon type='tool' rotate={isActive?90:0} color={isActive?'#ffff00ff':'unset'} theme={isActive?'filled':'outlined'}/>)}>
            <Panel header={`Glyph forms for pixel size ${this.props.glyphPxSize}`} key='glyphPxForms' extra={this.genExtraIcon('info-circle','glyphPxForms','glyphPxFormsShown')} className='panel'>
             {genGlyphFormsDisplay(this.props.glyphPxSize,this.props['glyphPxFormsForSize0'+this.props.glyphPxSize])}
            </Panel>
           </Collapse>
          </li>
         </ul>
        </Panel>
        <Panel header='Touchscreen Testbed' key='tsTestbed' extra={this.genExtraIcon('credit-card','tsTestbed')} className='settingsPanel'>
         <ul>
          <li>
           <label htmlFor='setUI_inpNum_markerReadyTimeout'>Marker ready timeout:</label>
           <InputNumber min={0} max={10000} precision={0} step={this.props.markerReadyTimeoutInterval} formatter={val=>`${val}ms`} parser={val=>isNaN(parseInt(val.replace('-','')))?0:(parseInt(val.replace('-',''))>10000?10000:parseInt(val.replace('-','')))} size='default' value={this.props.markerReadyTimeout} onChange={this.props.setMarkerReadyTimeout} id='setUI_inpNum_markerReadyTimeout'/>
          </li>
          <li>
           <label htmlFor='setUI_inpNum_markerReadyTimeoutInterval'>Marker ready timeout interval:</label>
           <InputNumber min={0} max={1000} precision={0} step={this.props.markerReadyTimeoutInterval<10?1:Math.floor(this.props.markerReadyTimeoutInterval/10)} formatter={val=>`${val}ms`} parser={val=>isNaN(parseInt(val.replace('-','')))?0:(parseInt(val.replace('-',''))>10000?10000:parseInt(val.replace('-','')))} size='default' value={this.props.markerReadyTimeoutInterval} onChange={this.props.setMarkerReadyTimeoutInterval} id='setUI_inpNum_markerReadyTimeoutInterval'/>
          </li>
          <li>
           <label htmlFor='setUI_inpNum_markerReadySuccessTimeout'>Marker ready success timeout:</label>
           <InputNumber min={0} max={10000} precision={0} step={this.props.markerReadyTimeoutInterval} formatter={val=>`${val}ms`} parser={val=>isNaN(parseInt(val.replace('-','')))?0:(parseInt(val.replace('-',''))>10000?10000:parseInt(val.replace('-','')))} size='default' value={this.props.markerReadySuccessTimeout} onChange={this.props.setMarkerReadySuccessTimeout} id='setUI_inpNum_markerReadySuccessTimeout'/>
          </li>
          <li>
           <label htmlFor='setUI_inpNum_markerReadyPauseTimeout'>Marker ready pause timeout:</label>
           <InputNumber min={0} max={10000} precision={0} step={this.props.markerReadyTimeoutInterval} formatter={val=>`${val}ms`} parser={val=>isNaN(parseInt(val.replace('-','')))?0:(parseInt(val.replace('-',''))>10000?10000:parseInt(val.replace('-','')))} size='default' value={this.props.markerReadyPauseTimeout} onChange={this.props.setMarkerReadyPauseTimeout} id='setUI_inpNum_markerReadyPauseTimeout'/>
          </li>
          <li>
           <label htmlFor='setUI_inpNum_baseMarkersProgressSizePx'>Base markers &lt;ProgressSizePx/&gt; size:</label>
           <InputNumber min={1} max={1000} precision={0} step={1} formatter={val=>`${val}px`} parser={val=>isNaN(parseInt(val.replace('-','')))?0:(parseInt(val.replace('-',''))>10000?10000:parseInt(val.replace('-','')))} size='default' value={this.props.baseMarkersProgressSizePx} onChange={this.props.setBaseMarkersProgressSizePx} id='setUI_inpNum_baseMarkersProgressSizePx'/>
          </li>
          <li>
           <label htmlFor='setUI_switch_showDoIntervalTimings'>Show <strong><code>doInterval(...)</code></strong> timings:</label>
           <Switch checked={this.props.showDoIntervalTimings} onChange={checked=>this.props.setShowDoIntervalTimings(checked)} id='setUI_switch_showDoIntervalTimings'/>
          </li>
         </ul>
        </Panel>
       </Collapse>
       <style jsx='true'>{`
         .settingsUI       {font-size:1rem;}
         .settingsUI.shown {}

         .titl       {color:#bf0000ff;text-shadow:0 0 0.25em #ffffffff, text-shadow:0 0 0.25em #000000ff;}
         .titl.shown {color:#00bf00ff;}

         .strEnabled  {font-weight:bold; color:#00dd00ff;}
         .strDisabled {font-weight:bold; color:#dd0000ff;}

         .glyphPxForms                           {font-size:1em;}
         .glyphPxForms>legend                    {font-size:1.2em;font-weight:bold;}
         .glyphPxForms>div:first-of-type         {font-size:1em;margin:0;padding:0;display:flex;flex-flow:column nowrap;justify-content:flex-start;align-items:stretch;}
         .glyphPxForms>div:first-of-type>div     {font-size:1em;margin:0;padding:0;display:flex;flex-flow:row nowrap;justify-content:flex-start;align-items:center;}
         .glyphPxForms>div:first-of-type>div>div {font-size:1em;margin:0;padding:0;flex-grow:1;display:flex;flex-flow:row nowrap;justify-content:flex-start;align-items:center;}
         .glyphPxForm                            {font-size:1em;margin:0.5em;padding:1px 0px 1px 0px;outline:0.125em solid black;display:flex;flex-flow:column nowrap;justify-content:center;align-items:center;}
         .glyphPxFormLine                        {font-size:1em;margin:0;padding:0px 1px 0px 1px;border:none;display:flex;flex-flow:row nowrap;justify-content:center;align-items:center;}
         .glyphPxFormPixel                       {font-size:1em;margin:1px;padding:0;border:1px solid black;min-width:0.5em;min-height:0.5em;}
         .glyphPxFormPixel.zero                  {background-color:#ffffff00;}
         .glyphPxFormPixel.one                   {background-color:#000000ff;}

         textarea { resize:none;vertical-align:top;text-align:justify;font-size:0.75em;padding:0.5em;font-family:monospace; }
         input[type='password'] { font-size:0.75em; }

         .settingsCollapse   {font-size:1em; margin-bottom:1em;}
         .settingsPanel      {font-size:1em; background-color:#4788f4ff;}

         .panel {font-size:1em; background-color:#4788f4ff;}
       `}</style>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  settingsUIOn:               state.settingsUI.settingsUIOn,
  glyphSize:                  state.settingsUI.glyphSize,
  glyphPxSize:                state.settingsUI.glyphPxSize,
  scrPxSize:                  state.settingsUI.scrPxSize,
  glyphPxFormsShown:          state.settingsUI.glyphPxFormsShown,
  storageEncrypt:             state.settingsUI.storageEncrypt,
  pwHash:                     state.settingsUI.pwHash,
  storageEncryptionKeyEnc:    state.settingsUI.storageEncryptionKeyEnc,
  storageEncryptionKeyClr:    state.settingsUI.storageEncryptionKeyClr,
  glyphPxFormsForSize02:      state.settingsUI.glyphPxFormsForSize02,
  glyphPxFormsForSize03:      state.settingsUI.glyphPxFormsForSize03,
  glyphPxFormsForSize04:      state.settingsUI.glyphPxFormsForSize04,
  markerReadyTimeout:         state.tsTestbed.markerReadyTimeout,
  markerReadySuccessTimeout:  state.tsTestbed.markerReadySuccessTimeout,
  markerReadyPauseTimeout:    state.tsTestbed.markerReadyPauseTimeout,
  markerReadyTimeoutInterval: state.tsTestbed.markerReadyTimeoutInterval,
  baseMarkersProgressSizePx:  state.tsTestbed.baseMarkersProgressSizePx,
  settingsAccActKey:          state.settingsUI.settingsAccActKey,
  showDoIntervalTimings:      state.tsTestbed.showDoIntervalTimings
})
const mapDispatchToProps = (dispatch,ownProps) => ({
  setSetUIOn:                    on          => dispatch(settingsUIActionCreators.setSetUIOn(on)                        ),
  setGlyphSize:                  glphSize    => dispatch(settingsUIActionCreators.setGlyphSize(glphSize)                ),
  setGlyphPx:                    glphPxSize  => dispatch(settingsUIActionCreators.setGlyphPx(glphPxSize)                ),
  setScrPx:                      scrPxSize   => dispatch(settingsUIActionCreators.setScrPx(scrPxSize)                   ),
  setSetUIGlyphPxFormsOn:        on          => dispatch(settingsUIActionCreators.setSetUIGlyphPxFormsOn(on)            ),
  setStorageEncryption:          enabled     => dispatch(settingsUIActionCreators.setStorageEncryption(enabled)         ),
  setStorageEncryptionKeyEnc:    encKeyEnc   => dispatch(settingsUIActionCreators.setStorageEncryptionKeyEnc(encKeyEnc) ),
  setStorageEncryptionKeyClr:    encKeyClr   => dispatch(settingsUIActionCreators.setStorageEncryptionKeyClr(encKeyClr) ),
  setPwHash:                     pwHash      => dispatch(settingsUIActionCreators.setPwHash(pwHash)                     ),
  setSetGlyphPxSize02Forms:      glphPxForms => dispatch(settingsUIActionCreators.setSetGlyphPxSize02Forms(glphPxForms) ),
  setSetGlyphPxSize03Forms:      glphPxForms => dispatch(settingsUIActionCreators.setSetGlyphPxSize03Forms(glphPxForms) ),
  setSetGlyphPxSize04Forms:      glphPxForms => dispatch(settingsUIActionCreators.setSetGlyphPxSize04Forms(glphPxForms) ),
  setSettingsAccActKey:          actKey      => dispatch(settingsUIActionCreators.setSettingsAccActKey(actKey)          ),
  setMarkerReadyTimeout:         ms          => dispatch(tsTestbedActionCreators.setMarkerReadyTimeout(ms)              ),
  setMarkerReadySuccessTimeout:  ms          => dispatch(tsTestbedActionCreators.setMarkerReadySuccessTimeout(ms)       ),
  setMarkerReadyPauseTimeout:    ms          => dispatch(tsTestbedActionCreators.setMarkerReadyPauseTimeout(ms)         ),
  setMarkerReadyTimeoutInterval: ms          => dispatch(tsTestbedActionCreators.setMarkerReadyTimeoutInterval(ms)      ),
  setBaseMarkersProgressSizePx:  sz          => dispatch(tsTestbedActionCreators.setBaseMarkersProgressSizePx(sz)       ),
  setShowDoIntervalTimings:      show        => dispatch(tsTestbedActionCreators.setShowDoIntervalTimings(show)         )
})
const connectedClaVitCommsSettingsUI = connect(mapStateToProps, mapDispatchToProps)(ClaVitCommsSettingsUI)

export { connectedClaVitCommsSettingsUI as ClaVitCommsSettingsUI, connectedClaVitCommsSettingsUI as default }
