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
import   ClaVitCommsGlyph           from '../components/ClaVitCommsGlyph.js'
import { sandboxOneActionCreators, settingsUIActionCreators } from '../actions'
//import { formToNum, numToForm }     from '../modules/utils'


import { Button } from 'antd'

class ClaVitCommsSandboxOne extends React.Component {
  static propTypes = {
    refArr_16x16:            PropTypes.array.isRequired,
    refArr_64x64:            PropTypes.array.isRequired,
    refArr_128x128:          PropTypes.array.isRequired,
    glyphArr:                PropTypes.array.isRequired,
    randArr:                 PropTypes.array.isRequired,
    ovrlArr:                 PropTypes.array.isRequired,
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
    setGlyphSize:            PropTypes.func.isRequired,
    setGlyphPx:              PropTypes.func.isRequired,
    setScrPx:                PropTypes.func.isRequired,
    setGlyphArr:             PropTypes.func.isRequired,
    setRandArr:              PropTypes.func.isRequired,
    setOvrlArr:              PropTypes.func.isRequired,
    setSetUIOn:              PropTypes.func.isRequired
  }
  static displayName = 'ClaVitCommsSandboxOne'

  genFuzzyGlyphPx = (strictValue, glyphForms) => {
    const firstRand  = Math.random()
    const eqFormsArr = Object.values(glyphForms[(strictValue===1?2:0)]).find(el=>(firstRand>=el.prob[0]&&firstRand<el.prob[1])).forms
    return eqFormsArr[Math.floor(Math.random()*eqFormsArr.length)]
  }

  componentDidMount    = () => {
    this.props.setGlyphArr(this.props['refArr_'+this.props.glyphSize+'x'+this.props.glyphSize].map(el=>(el.map( ell=>this.genFuzzyGlyphPx(ell,this.props['glyphPxFormsForSize0'+this.props.glyphPxSize]) ))))
  }

  componentWillUnmount = () => {}

  render = () => {
    return (
    <div className='sandboxOne'>
     <h1 className='titl'>Component <code>&lt;SandboxOne/&gt;</code>.</h1>
     <h3><em>Testing ground №1</em></h3>
     <fieldset>
      <legend><strong>Persistant store:</strong></legend>
      <ul>
       <li>
        <fieldset>
         <legend>Glyph array <small><small>(glyphSize:&nbsp;<strong>{this.props.glyphSize}&thinsp;☓&thinsp;{this.props.glyphSize}</strong>, mode:&nbsp;<strong>strict</strong>, glyphPxSize:&nbsp;<strong>{this.props.glyphPxSize}&thinsp;☓&thinsp;{this.props.glyphPxSize}</strong>, scrPxSize:&nbsp;<strong>{this.props.scrPxSize}&thinsp;☓&thinsp;{this.props.scrPxSize}</strong>)</small></small>:</legend>

         <div className='glyphCont'>
          <div className='arrayPad'>
           <ClaVitCommsGlyph
            glyphArr={this.props['refArr_'+this.props.glyphSize+'x'+this.props.glyphSize]}
            glyphPxForms={this.props['glyphPxFormsForSize0'+this.props.glyphPxSize]}
            glyphSize={this.props.glyphSize}
            glyphPxSize={this.props.glyphPxSize}
            scrPxSize={this.props.scrPxSize}
            mode='strict'
            enableHoverGlyphPxHighlights={true}
            enableHoverScrPxHighlights={true}
            enableGlyphPxClickHighlight={true}
            enableGlyphPxTips={true}
           />
          </div>
          <div className='glyphControls'>
           <Button>(Re)init refArray glyph</Button>
          </div>
         </div>

         <div className='glyphCont'>
          <div className='arrayPad'>
           <div><strong>&lt;ClaVitCommsGlyph</strong> <small><strong>glyphArr=</strong>&#x007b;<em>this.props.glyphArr</em>&#x007d; <strong>glyphPxForms=</strong>&#x007b;this.props&#91;'glyphPxFormsForSize0'+this.props.glyphPxSize&#93;&#x007d; <strong>glyphSize=</strong>&#x007b;<em>this.props.glyphSize</em>&#x007d; <strong>glyphPxSize=</strong>&#x007b;<em>this.props.glyphPxSize</em>&#x007d; <strong>scrPxSize=</strong>&#x007b;<em>this.props.scrPxSize</em>&#x007d; <strong>mode=</strong>'fuzzy' <strong>enableHoverGlyphPxHighlights=</strong>&#x007b;<em>true</em>&#x007d; <strong>enableHoverScrPxHighlights=</strong>&#x007b;<em>true</em>&#x007d; <strong>enableGlyphPxClickHighlight=</strong>&#x007b;<em>true</em>&#x007d; <strong>enableGlyphPxTips=</strong>&#x007b;<em>true</em>&#x007d;</small><strong>/&gt;</strong></div>
          {/* <ClaVitCommsGlyph glyphArr={this.props.glyphArr} glyphPxForms={this.props['glyphPxFormsForSize0'+this.props.glyphPxSize]} glyphSize={this.props.glyphSize} glyphPxSize={this.props.glyphPxSize} scrPxSize={this.props.scrPxSize} mode='fuzzy' enableHoverGlyphPxHighlights={true} enableHoverScrPxHighlights={true} enableGlyphPxClickHighlight={true} enableGlyphPxTips={true}/> */}
          </div>
          <div className='glyphControls'>
           <Button onClick={ev=>this.props.setGlyphArr(this.props['refArr_'+this.props.glyphSize+'x'+this.props.glyphSize].map(el=>(el.map(ell=>this.genFuzzyGlyphPx(ell,this.props['glyphPxFormsForSize0'+this.props.glyphPxSize])))))}>Regenerate fuzzy glyphArray</Button>
          </div>
         </div>

        </fieldset>
       </li>
       <li>
        <fieldset>
         <legend>Random array:</legend>
         <div className='randArr'>{this.props.randArr.map((el,idx)=>'['+idx+']: ['+el.join(', ')+']')}<br/></div>
        </fieldset>
       </li>
       <li>
        <fieldset>
         <legend>Overlay array:</legend>
         <div className='ovrlArr'>{this.props.ovrlArr.map((el,idx)=>'['+idx+']: ['+el.join(', ')+']')}<br/></div>
        </fieldset>
       </li>
      </ul>
     </fieldset>
     <style jsx='true'>{`
       .sandboxOne
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

       .glyphArr
         {}
       .randArr
         {}
       .ovrlArr
         {}

       .glyphCont {
         font-size: 1em;
         padding:0;
         margin:1em;
         border:none;
         display:inline-flex;
         flex-flow:row nowrap;
         justify-content:center;
         align-items:center;
       }
       .arrayPad
         {font-size:1em;background-color:#ffffffff;padding:0;margin:0;border:${this.props.scrPxSize} solid #0000007f;display:inline-flex;flex-flow:row nowrap;justify-content:center;align-items:center;}
       .glyphControls {
         font-size:        1em;
         align-self:       stretch;
         background-color: #4788f4ff;

         border:                     0.125em solid #0000007f;
         border-top-right-radius:    0.25em;
         border-bottom-right-radius: 0.25em;

         padding:     0.25em;
         margin:      0;

         display:         inline-flex;
         flex-flow:       column nowrap;
         justify-content: flex-start;
         align-items:     flex-start;
       }
     `}</style>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  refArr_16x16:                  state.sandboxOne.refArr_16x16,
  refArr_64x64:                  state.sandboxOne.refArr_64x64,
  refArr_128x128:                state.sandboxOne.refArr_128x128,
  glyphArr:                      state.sandboxOne.glyphArr,
  randArr:                       state.sandboxOne.randArr,
  ovrlArr:                       state.sandboxOne.ovrlArr,
  settingsUIOn:                  state.settingsUI.settingsUIOn,
  glyphSize:                     state.settingsUI.glyphSize,
  glyphPxSize:                   state.settingsUI.glyphPxSize,
  scrPxSize:                     state.settingsUI.scrPxSize,
  storageEncrypt:                state.settingsUI.storageEncrypt,
  storageEncryptionKeyEnc:       state.settingsUI.storageEncryptionKeyEnc,
  storageEncryptionKeyClr:       state.settingsUI.storageEncryptionKeyClr,
  glyphPxFormsForSize02:         state.settingsUI.glyphPxFormsForSize02,
  glyphPxFormsForSize03:         state.settingsUI.glyphPxFormsForSize03,
  glyphPxFormsForSize04:         state.settingsUI.glyphPxFormsForSize04
})
const mapDispatchToProps = (dispatch,ownProps) => ({
  setGlyphSize:        glphSize   => dispatch(settingsUIActionCreators.setGlyphSize(glphSize) ),
  setGlyphPx:          glphPxSize => dispatch(settingsUIActionCreators.setGlyphPx(glphPxSize) ),
  setScrPx:            scrPxSize  => dispatch(settingsUIActionCreators.setScrPx(scrPxSize)    ),
  setGlyphArr:         glphArr    => dispatch(sandboxOneActionCreators.setGlyphArr(glphArr)   ),
  setRandArr:          randArr    => dispatch(sandboxOneActionCreators.setRandArr(randArr)    ),
  setOvrlArr:          ovrlArr    => dispatch(sandboxOneActionCreators.setOvrlArr(ovrlArr)    ),
  setSetUIOn:          on         => dispatch(settingsUIActionCreators.setSetUIOn(on)         )
})
const connectedClaVitCommsSandboxOne = connect(mapStateToProps, mapDispatchToProps)(ClaVitCommsSandboxOne)

export { connectedClaVitCommsSandboxOne as ClaVitCommsSandboxOne, connectedClaVitCommsSandboxOne as default }
