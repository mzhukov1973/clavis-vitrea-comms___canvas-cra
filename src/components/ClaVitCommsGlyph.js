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
import   React       from 'react'
import   ReactDOM    from 'react-dom'
import   PropTypes   from 'prop-types'
import { numToForm } from '../modules/utils'



class ClaVitCommsGlyph extends React.Component {
  static propTypes = {
    glyphArr:                     PropTypes.array.isRequired,
    glyphPxForms:                 PropTypes.array.isRequired,
    glyphSize:                    PropTypes.oneOf([16,64,128]).isRequired,
    glyphPxSize:                  PropTypes.oneOf([2,3,4]).isRequired,
    mode:                         PropTypes.string.isRequired,
    scrPxSize:                    PropTypes.string.isRequired,
    enableGlyphPxHoverHighlights: PropTypes.bool.isRequired,
    enableScrPxHoverHighlights:   PropTypes.bool.isRequired,
    enableGlyphPxClickHighlight:  PropTypes.bool.isRequired,
    enableGlyphPxTips:            PropTypes.bool.isRequired
  }
  static defaultProps = {
    mode:                         'strict', /* 'strict' {(===1)=>[1,1,1,1], (!==1)=>[0,0,0,0]}, 'fuzzy' {...} */
    enableGlyphPxHoverHighlights: true,
    enableScrPxHoverHighlights:   true,
    enableGlyphPxClickHighlight:  true,
    enableGlyphPxTips:            true
  }
  static displayName = 'ClaVitCommsGlyph'

  genG = {
    sPx:      (key, one) => (<div key={key} className={one===true?'one':''}></div>),
    gPxLnOld: (gPxSz, sRow, gCol, gRow)        => (<div key={sRow}>{Array(gPxSz).fill(0).map( (el,sCol)=>this.genG.sPx(sCol, this.props.glyphArr[gRow][gCol]!==0 ) )}</div>),
    gPxLn:    (gPxSz, sRow, gCol, gRow)        => (<div key={sRow}>{Array(gPxSz).fill(0).map( (el,sCol)=>this.genG.sPx(sCol,(this.props.mode==='strict'?(this.props.glyphArr[gRow][gCol]!==0):(numToForm(this.props.glyphArr[gRow][gCol])[sRow*gPxSz+sCol]!==0))) )}</div>),
    gPx:      (gPxSz, gCol, doCmnt, gRow)      => (
      <div key={gCol}
           onClick={ev=>this.props.enableGlyphPxClickHighlight?this.handleGlyphPxClick(ev.currentTarget):{}}
           title={doCmnt===false?('no title'):('gPx[c'+gCol+',r'+gRow+']='+this.props.glyphArr[gRow][gCol])}
       >
       {Array(gPxSz).fill(0).map(  (el,idx) => this.genG.gPxLn(gPxSz,idx,gCol,gRow)  )}
      </div>
    ),
    gLn:      (gSz, gPxSz, gRow, doCmnt=false) => (<div key={gRow}>{Array(gSz).fill(0).map((el,gCol)=>this.genG.gPx(gPxSz,gCol,doCmnt,gRow))}</div>),
    glyph:    (gSz, gPxSz, doCmnt=false)       => (<div className='glyph'>{Array(gSz).fill(0).map((el,gRow)=>this.genG.gLn(gSz,gPxSz,gRow,doCmnt))}</div>)
  }

  handleGlyphPxClick = currTarget => currTarget.style.backgroundColor=(currTarget.style.backgroundColor==='rgba(255, 0, 255, 0.5)'?'':'rgba(255, 0, 255, 0.5)')

  localDOMRoot         = false
  getGlyphPx           = (gCol,gRow)           => this.localDOMRoot.querySelector(`.glyph>div:nth-of-type(${gRow+1})>div:nth-of-type(${gCol+1})`)
  getAllScrPxInGlyphPx = (gCol,gRow)           => this.localDOMRoot.querySelectorAll(`.glyph>div:nth-of-type(${gRow+1})>div:nth-of-type(${gCol+1})>div>div`)
  getScrPx             = (gCol,gRow,sCol,sRow) => this.localDOMRoot.querySelector(`.glyph>div:nth-of-type(${gRow+1})>div:nth-of-type(${gCol+1})>div:nth-of-type(${sRow+1})>div:nth-of-type(${sCol+1})`)

  componentDidMount = () => {
    this.localDOMRoot = ReactDOM.findDOMNode(this)
  }

  componentWillUnmount = () => {}

  render = () => {
    const glyph = this.genG.glyph(this.props.glyphSize, this.props.glyphPxSize, this.props.enableGlyphPxTips)
    return (
      <>
       {glyph}
       <style jsx='true'>{`
         .glyph                       { /* .glyph  */        font-size:1em; margin:0; padding:0; border:none; display:inline-flex; flex-flow:column nowrap; justify-content:center; align-items:center;}
         .glyph>div                   { /* .glyphLine */     font-size:1em; margin:0; padding:0; border:none; display:flex;        flex-flow:row nowrap; justify-content:center; align-items:center; }
         .glyph>div>div               { /* .glyphPx */       font-size:1em; margin:0; padding:0; border:none; display:flex;        flex-flow:column nowrap; justify-content:center; align-items:center; }
         .glyph>div>div:hover         { /* .glyphPx:hover */ ${this.props.enableGlyphPxHoverHighlights===true?'background-color:#ffa500bf;':''} }
         .glyph>div>div>div           { /* .glyphPxLine */   font-size:1em; margin:0; padding:0; border:none; display:flex;        flex-flow:row nowrap;    justify-content:center; align-items:center; }
         .glyph>div>div>div>div       { /* .scrPx */         font-size:1em; margin:0; padding:0; border:none; background-color:#ffffff00; min-width:${this.props.scrPxSize}; min-height:${this.props.scrPxSize}; }
         .glyph>div>div>div>div.one   { /* .scrPx.one */     background-color:#00000040; }
         .glyph>div>div>div>div:hover { /* .scrPx:hover */   ${this.props.enableScrPxHoverHighlights===true?'background-color:#00ff00bf':''} }
       `}</style>
      </>
    )
  }
}

export { ClaVitCommsGlyph, ClaVitCommsGlyph as default }
