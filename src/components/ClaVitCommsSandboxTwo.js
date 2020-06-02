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
import   PropTypes                  from 'prop-types'
import { connect }                  from 'react-redux'
import { sandboxTwoActionCreators, settingsUIActionCreators } from '../actions'
//import { formToNum, numToForm }     from '../modules/utils'
import { genGlyphFormsDisplay }     from '../modules/utils'


class ClaVitCommsSandboxTwo extends React.Component {
  static propTypes = {
    settingsUIOn:            PropTypes.bool.isRequired,
    glyphSize:               PropTypes.oneOf([16,64,128]).isRequired,
    glyphPxSize:             PropTypes.oneOf([2,3,4]).isRequired,
    scrPxSize:               PropTypes.string.isRequired,
    storageEncrypt:          PropTypes.bool.isRequired,
    storageEncryptionKeyEnc: PropTypes.string.isRequired,
    storageEncryptionKeyClr: PropTypes.string.isRequired,
    glyphPxFormsForSize02:   PropTypes.array.isRequired,
    glyphPxFormsForSize03:   PropTypes.array.isRequired,
    glyphPxFormsForSize04:   PropTypes.array.isRequired,
    setSetUIOn:              PropTypes.func.isRequired
  }
  static displayName = 'ClaVitCommsSandboxTwo'

  componentDidMount    = () => {}

  componentWillUnmount = () => {}

  render = () => {
    return (
    <div className='sandboxTwo'>
     <h1 className='titl'>Component <code>&lt;SandboxTwo/&gt;</code>.</h1>
     <h3><em>Testing ground №1</em></h3>
     <fieldset>
      <legend><strong>Persistant store:</strong></legend>
      <ul>
       <li>
        <label htmlFor='sndBTwo_inpCheck_SettingsUIOn'>Settings UI:&nbsp;</label>
        <input id='sndBTwo_inpCheck_SettingsUIOn' type='checkbox' checked={this.props.settingsUIOn} onChange={ev=>this.props.setSetUIOn(ev.target.checked)}/>
        <label htmlFor='sndBTwo_inpCheck_SettingsUIOn'>&nbsp;{this.props.settingsUIOn?(<span className='strEnabled'>shown</span>):(<span className='strDisabled'>hidden</span>)}</label>
       </li>
       <li>
        <label htmlFor='sndBTwo_sel_GlyphSize'>Glyph size:&nbsp;</label>
        <select id='sndBTwo_sel_GlyphSize' value={this.props.glyphSize} readOnly>
         <option value={16}>16x16</option>
         <option value={64}>64x64</option>
         <option value={128}>128x128</option>
         </select>
        &nbsp;(glyph size: <strong><code>{this.props.glyphSize}x{this.props.glyphSize}</code></strong>)
       </li>
       <li>
        <label htmlFor='sndBTwo_sel_GlyphPxSize'>Glyph pixels size:&nbsp;</label>
        <select id='sndBTwo_sel_GlyphPxSize' value={this.props.glyphPxSize} readOnly>
         <option value={2}>2x2</option>
         <option value={3} disabled>3x3</option>
         <option value={4} disabled>4x4</option>
        </select>
        &nbsp;(glyph pixel size: <strong><code>{this.props.glyphPxSize}x{this.props.glyphPxSize}</code></strong>)
       </li>
       <li>
        <label htmlFor='sndBTwo_inpText_scrPxSize'>Screen pixel size:&nbsp;</label>
        <input type='text' id='sndBTwo_inpText_scrPxSize' value={this.props.scrPxSize} readOnly/>
       </li>
       <li>
       <label htmlFor='sndBTwo_inpCheck_StorageEncryption'>Storage encryption:&nbsp;</label>
        <input id='sndBTwo_inpCheck_StorageEncryption' type='checkbox'  checked={this.props.storageEncrypt} readOnly/>
        <label htmlFor='sndBTwo_inpCheck_StorageEncryption'>&nbsp;{this.props.storageEncrypt?(<span className='strEnabled'>enabled</span>):(<span className='strDisabled'>disabled</span>)}</label>
       </li>
       <li>
        <label htmlFor='sndBTwo_inpText_StorageEncryptionKeyEnc'>Storage encryption key (encrypted):&nbsp;</label>
        <textarea id='sndBTwo_inpText_StorageEncryptionKeyEnc' readOnly value={this.props.storageEncryptionKeyEnc} cols={64} rows={10}/>
       </li>
       <li>
        <label htmlFor='sndBTwo_inpText_StorageEncryptionKeyClr'>Storage encryption key (cleartext):&nbsp;</label>
        <textarea id='sndBTwo_inpText_StorageEncryptionKeyClr' readOnly value={this.props.storageEncryptionKeyClr} cols={64} rows={10}/>
       </li>
       <li>
        {genGlyphFormsDisplay(this.props.glyphPxSize,this.props['glyphPxFormsForSize0'+this.props.glyphPxSize])}
       </li>
      </ul>
     </fieldset>
     <style jsx='true'>{`
       .sandboxTwo
         {font-size:1rem;}
       .titl
         {color:#bf0000ff; text-shadow:0 0 0.25em #ffffffff, 0 0 0.25em #000000ff;}

       .strEnabled
         {font-weight:bold; color:#00dd00ff;}
       .strDisabled
         {font-weight:bold; color:#dd0000ff;}

       .glyphPxForms
         {font-size:1em;}
       .glyphPxForms>legend
         {font-size:1.2em;font-weight:bold;}
       .glyphPxForms>div:first-of-type
         {font-size:1em;margin:0;padding:0;display:flex;flex-flow:column nowrap;justify-content:flex-start;align-items:stretch;}
       .glyphPxForms>div:first-of-type>div
         {font-size:1em;margin:0;padding:0;display:flex;flex-flow:row nowrap;justify-content:flex-start;align-items:center;}
       .glyphPxForms>div:first-of-type>div>div
         {flex-grow:1;font-size:1em;margin:0;padding:0;display:flex;flex-flow:row nowrap;justify-content:flex-start;align-items:center;}
       .glyphPxForm
         {font-size:1em;margin:0.5em;padding:1px 0px 1px 0px;outline:0.125em solid black;display:flex;flex-flow:column nowrap;justify-content:center;align-items:center;}
       .glyphPxFormLine
         {font-size:1em;margin:0;padding:0px 1px 0px 1px;border:none;display:flex;flex-flow:row nowrap;justify-content:center;align-items:center;}
       .glyphPxFormPixel
         {font-size:1em;margin:1px;padding:0;border:1px solid black;min-width:0.5em;min-height:0.5em;}
       .glyphPxFormPixel.zero
         {background-color:#ffffff00;}
       .glyphPxFormPixel.one
         {background-color:#000000ff;}

       textarea
         {resize:none;vertical-align:top;text-align:justify;font-size:0.75em;padding:0.5em;font-family:monospace;}
     `}</style>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  settingsUIOn:                  state.settingsUI.settingsUIOn,
  glyphSize:                     state.settingsUI.glyphSize,
  glyphPxSize:                   state.settingsUI.glyphPxSize,
  scrPxSize:                     state.settingsUI.scrPxSize,
  storageEncrypt:                state.settingsUI.storageEncrypt,
  storageEncryptionKeyEnc:       state.settingsUI.storageEncryptionKeyEnc,
  storageEncryptionKeyClr:       state.settingsUI.storageEncryptionKeyClr,
  glyphPxFormsForSize02:         state.settingsUI.glyphPxFormsForSize02,
  glyphPxFormsForSize03:         state.settingsUI.glyphPxFormsForSize03,
  glyphPxFormsForSize04:         state.settingsUI.glyphPxFormsForSize04,
  initialised:                   state.sandboxTwo.initialised
})
const mapDispatchToProps = (dispatch,ownProps) => ({
  setSetUIOn:          on         => dispatch(settingsUIActionCreators.setSetUIOn(on)         ),
  initSBoxTwo:         ()         => dispatch(sandboxTwoActionCreators.initSBoxTwo()          )
})
const connectedClaVitCommsSandboxTwo = connect(mapStateToProps, mapDispatchToProps)(ClaVitCommsSandboxTwo)

export { connectedClaVitCommsSandboxTwo as ClaVitCommsSandboxTwo, connectedClaVitCommsSandboxTwo as default }
