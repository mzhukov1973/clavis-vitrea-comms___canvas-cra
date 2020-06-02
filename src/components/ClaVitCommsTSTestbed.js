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
import   PropTypes                                           from 'prop-types'
import { connect }                                           from 'react-redux'
import { Divider, Collapse, Icon, Select, Progress, Descriptions, List, Typography, Input }  from 'antd'
import { tsTestbedActionCreators, settingsUIActionCreators } from '../actions'
//import   scCwCh3ptDim                                        from '../images/keyforms/sc-cw-ch-3pt-dim.svg'
//import   scCwCh3ptNoDim                                      from '../images/keyforms/sc-cw-ch-3pt-nodim.svg'
//import   scCwNoCh3ptDim                                      from '../images/keyforms/sc-cw-noch-3pt-dim.svg'
import   scCwNoCh3ptNoDim                                    from '../images/keyforms/sc-cw-noch-3pt-nodim.svg'
//import   scNoCwCh3ptDim                                      from '../images/keyforms/sc-nocw-ch-3pt-dim.svg'
//import   scNoCwCh3ptNoDim                                    from '../images/keyforms/sc-nocw-ch-3pt-nodim.svg'
//import   ss3ptDim                                            from '../images/keyforms/ss-3pt-dim.svg'
//import   ss3ptNoDim                                          from '../images/keyforms/ss-3pt-nodim.svg'



const rs='color:unset;font-weight:normal;'
const grB='color:gray;font-weight:bold;',   grN='color:gray;font-weight:normal;'
const wB='color:white;font-weight:bold;',   wN='color:white;font-weight:normal;'
const yB='color:yellow;font-weight:bold;',  yN='color:yellow;font-weight:normal;'
const cB='color:cyan;font-weight:bold;',    cN='color:cyan;font-weight:normal;'
const mB='color:magenta;font-weight:bold;', mN='color:magenta;font-weight:normal;'
const gB='color:green;font-weight:bold;',   gN='color:green;font-weight:normal;'
const rB='color:red;font-weight:bold;',     rN='color:red;font-weight:normal;'
const oB='color:orange;font-weight:bold;',  oN='color:orange;font-weight:normal;'





const { Panel } = Collapse
const { Option, OptGroup } = Select





class CanvasComp extends React.Component {
  static propTypes = {
    reportCTX:               PropTypes.func.isRequired,
    canvasWidth:             PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    canvasHeight:            PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    handleCanvasTouchStart:  PropTypes.func.isRequired,
    handleCanvasTouchMove:   PropTypes.func.isRequired,
    handleCanvasTouchEnd:    PropTypes.func.isRequired,
    handleCanvasTouchCancel: PropTypes.func.isRequired,
    handleCanvasClick:       PropTypes.func.isRequired,
    handleCanvasMouseDown:   PropTypes.func.isRequired,
    handleCanvasMouseUp:     PropTypes.func.isRequired
  }
  static displayName = 'CanvasComp'

  state = { ctx:null }

  canvasRef = React.createRef()

  componentDidMount = () => {
    let ctx = null
    if (this.canvasRef.current!==null) {
      ctx = this.canvasRef.current.getContext('2d',{alpha:true})
    } else {
      console.log('[CanvasComp.componentDidMount]: Error when getting 2D context from a canvas object! this.canvasRef.current=%o', this.canvasRef.current)
    }
    if (ctx!==null) {
      ctx.font = (this.props.canvasWidth/40).toFixed(0)+'px monospace'
      ctx.fillText('font=\''+(this.props.canvasWidth/40).toFixed(0)+'px monospace\', ('+(0)+','+(this.props.canvasWidth/40)+').', 0, this.props.canvasWidth/40) //, 140)
    }
    this.setState({ctx:ctx})
  }

  componentWillUnmount = () => { this.props.reportCTX(null) }

  componentDidUpdate = (prevProps, prevState) => { if (prevState.ctx!==this.state.ctx) {this.props.reportCTX(this.state.ctx)} }

  render = () => (<canvas style={{border:'0.125em solid magenta'}} ref={this.canvasRef} width={this.props.canvasWidth} height={this.props.canvasHeight} onTouchStart={this.props.handleCanvasTouchStart} onTouchMove={this.props.handleCanvasTouchMove} onTouchEnd={this.props.handleCanvasTouchEnd} onTouchCancel={this.props.handleCanvasTouchCancel} onClick={this.props.handleCanvasClick} onContextMenu={ev=>ev.preventDefault()} onMouseDown={this.props.handleCanvasMouseDown} onMouseUp={this.props.handleCanvasMouseUp}>Multitouchtest canvas</canvas>)
}



class ClaVitCommsTSTestbed extends React.Component {
  static propTypes = {
    settingsUIOn:               PropTypes.bool.isRequired,
    storageEncrypt:             PropTypes.bool.isRequired,
    showDoIntervalTimings:      PropTypes.bool.isRequired,
    storageEncryptionKeyClr:    PropTypes.string.isRequired,
    mainAccActKey:              PropTypes.oneOf(['1','2','3','4',undefined]),
    keyForm:                    PropTypes.oneOf([0,1,2,3]).isRequired,
    markerReadyTimeout:         PropTypes.number.isRequired,
    markerReadySuccessTimeout:  PropTypes.number.isRequired,
    markerReadyPauseTimeout:    PropTypes.number.isRequired,
    markerReadyTimeoutInterval: PropTypes.number.isRequired,
    baseMarkersProgressSizePx:  PropTypes.number.isRequired,
    setSetUIOn:                 PropTypes.func.isRequired,
    resetPnO:                   PropTypes.func.isRequired,
    setMainAccActKey:           PropTypes.func.isRequired,
    setKeyForm:                 PropTypes.func.isRequired
  }
  static displayName = 'ClaVitCommsTSTestbed'
  state = {
    curTchs:                             [],
    mouseClickFadingTimer:               0,
    mouseClickFaded:                     true,
    markersReadyState:                   [0,0,0,0],
    markersSuccessTimeoutState:          [0,0,0,0],
    markersPausedTimeoutState:           [0,0,0,0],
    markersSuccessState:                 [false,false,false,false],
    markersPausedState:                  [false,false,false,false],
    markerTimers:                        [0,0,0,0],
    markerCustomIntervalTimerId:         [0,0,0,0],
    markerCustomIntervalStartMs:         [0,0,0,0],
    markerCustomIntervalLastIntStartMs:  [0,0,0,0],
    markerCustomIntervalAvgIntCallDurMs: [0,0,0,0],
    markerCustomIntervalMinIntCallDurMs: [0,0,0,0],
    markerCustomIntervalMaxIntCallDurMs: [0,0,0,0],
    canvasWidth:                         600,
    canvasHeight:                        300
  }

  ctx = null

  genMainAccExtraIcon = (...rest) => {
    const aDf   = ['question-circle', 'P'+Date.now().toString(16).slice(0,5), false, true, '#ffff00ff']
    const aR    = (nIcos,arg)  => Array(nIcos).fill(arg)
    const tTyp  = arg          => ['string','boolean'].includes(typeof arg)
    const le    = arg          => arg.length
    const isAr  = arg          => Array.isArray(arg)
    const dl    = (nIcos, arg) => (nIcos-le(arg))<0 ? 0 : (nIcos-le(arg))
    const fxTyp = (aDf, arg)   => window[(typeof aDf).substr(0,1).toUpperCase()+(typeof aDf).substr(1)](arg)
    const aVl   = (a,aDf,nIc)  => tTyp(a) ? aR(nIc,a) : (isAr(a)?a.map(el=>fxTyp(aDf,el)).concat(aR(dl(nIc,a),fxTyp(aDf,[...a].pop()))):aR(nIc,aDf))
    const pAc   = (i,pKy)      => !!pKy[i]&&this.props.mainAccActKey===String(pKy[i])
    const [iNm,pKy,sAc,tAc,cAc] = Object.assign(aDf.map(el=>Array(isAr(rest[0])?le(rest[0]):1).fill(el)), rest.map((el,i)=>aVl(el,aDf[i],isAr(rest[0])?le(rest[0]):1)))
    return iNm.map((el,i)=>(<Icon key={String(i)} type={el} spin={(sAc[i]&&pAc(i,pKy))} theme={(tAc[i]&&pAc(i,pKy)?'filled':'outlined')} style={{color:(pAc(i,pKy)?cAc[i]:'unset')}}/>))
  }

  cpyTchEvProps         = ev => ({type:ev.type, chTchs:ev.changedTouches, tgTchs:ev.targetTouches, tchs:ev.touches})

  ongoingTouchIndexById = idToFind => this.state.curTchs.findIndex(el=>el.identifier===idToFind)

  copyTouch             = ({identifier, pageX, pageY}) => ({identifier, pageX, pageY})

  colorForTouch         = t => '#' + (t.identifier%16).toString(16) + (Math.floor(t.identifier/3)%16).toString(16) + (Math.floor(t.identifier/7)%16).toString(16)

  handleCanvasTouchStart = origEv => {
    console.log('%c[%cClaVitCommsTSTestbed%c.%chandleCanvasTouchStart%c]:%c %cSTART%c',wB,yB,cB,yN,wB,rs,  gB,rs)
    const ev = this.cpyTchEvProps(origEv)
    for (let i=0; i<ev.chTchs.length; i++) {
      this.setState(oldState=>({curTchs:[...oldState.curTchs,this.copyTouch(ev.chTchs.item(i))]}))
      if (this.ctx!==null) {
        this.ctx.beginPath()
        this.ctx.arc(ev.chTchs.item(i).pageX, ev.chTchs.item(i).pageY, 4, 0, 2*Math.PI, false)
        this.ctx.fillStyle = this.colorForTouch(ev.chTchs.item(i))
        this.ctx.fill()
      }
    }
    console.log('%c[%cClaVitCommsTSTestbed%c.%chandleCanvasTouchStart%c]:%c %cEND%c',wB,yB,cB,yN,wB,rs,  rB,rs)
  }

  handleCanvasTouchMove = origEv => {
    console.log('%c[%cClaVitCommsTSTestbed%c.%chandleCanvasTouchMove%c]:%c %cSTART%c',wB,yB,cB,yN,wB,rs,  gB,rs)
    const ev  = this.cpyTchEvProps(origEv)
    for (let i=0; i<ev.chTchs.length; i++) {
      const idx = this.ongoingTouchIndexById(ev.chTchs.item(i).identifier)
      if (idx>=0) {
        if (this.ctx!==null) {
          this.ctx.beginPath()
          this.ctx.moveTo(this.state.curTchs[idx].pageX, this.state.curTchs[idx].pageY)
          this.ctx.lineTo(ev.chTchs.item(i).pageX, ev.chTchs.item(i).pageY)
          this.ctx.lineWidth   = 4
          this.ctx.strokeStyle = this.colorForTouch(ev.chTchs.item(i))
          this.ctx.stroke()
        }
        this.setState(oldState=>({curTchs:[...oldState.curTchs].splice(idx,1,this.copyTouch(ev.chTchs.item(i)))}))
      } else {
        console.log('%c[%cClaVitCommsTSTestbed%c.%chandleCanvasTouchMove%c]:%c Cant figure out which touch to continue',wB,yB,cB,yN,wB,rs)
      }
    }
    console.log('%c[%cClaVitCommsTSTestbed%c.%chandleCanvasTouchMove%c]:%c %cEND%c',wB,yB,cB,yN,wB,rs,  rB,rs)
  }

  handleCanvasTouchEnd = origEv => {
    console.log('%c[%cClaVitCommsTSTestbed%c.%chandleCanvasTouchEnd%c]:%c %cSTART%c',wB,yB,cB,yN,wB,rs,  gB,rs)
    const ev = this.cpyTchEvProps(origEv)
    for (let i=0; i<ev.chTchs.length; i++) {
      const idx = this.ongoingTouchIndexById(ev.chTchs.item(i).identifier)
      if (idx>=0) {
        if (this.ctx!==null) {
          this.ctx.lineWidth = 4
          this.ctx.fillStyle = this.colorForTouch(ev.chTchs.item(i))
          this.ctx.beginPath()
          this.ctx.moveTo(this.state.curTchs[idx].pageX, this.state.curTchs[idx].pageY)
          this.ctx.lineTo(ev.chTchs.item(i).pageX, ev.chTchs.item(i).pageY)
          this.ctx.fillRect(ev.chTchs.item(i).pageX-4, ev.chTchs.item(i).pageY-4, 8, 8)
        }
        this.setState(oldState=>({curTchs:[...oldState.curTchs].splice(idx,1)}))
      } else {
        console.log('%c[%cClaVitCommsTSTestbed%c.%chandleCanvasTouchEnd%c]:%c Cant figure out which touch to end',wB,yB,cB,yN,wB,rs)
      }
    }
    console.log('%c[%cClaVitCommsTSTestbed%c.%chandleCanvasTouchEnd%c]:%c %cEND%c',wB,yB,cB,yN,wB,rs,  rB,rs)
  }

  handleCanvasTouchCancel = origEv => {
    console.log('%c[%cClaVitCommsTSTestbed%c.%chandleCanvasTouchCancel%c]:%c %cSTART%c',wB,yB,cB,yN,wB,rs,  gB,rs)
    const ev = this.cpyTchEvProps(origEv)
    for (let i=0; i<ev.chTchs.length; i++) {
      const idx = this.ongoingTouchIndexById(ev.chTchs.item(i).identifier)
      this.setState(oldState=>({curTchs:[...oldState.curTchs].splice(idx,1)}))
    }
    console.log('%c[%cClaVitCommsTSTestbed%c.%chandleCanvasTouchCancel%c]:%c %cEND%c',wB,yB,cB,yN,wB,rs,  rB,rs)
  }

  doInterval = i => {
    const msElapsed = Date.now() - this.state.markerCustomIntervalStartMs[i]
    const msIntDur  = Date.now() - this.state.markerCustomIntervalLastIntStartMs[i]
    if (msElapsed>=this.props.markerReadyTimeout) {
      const markerCustomIntervalStartMs         = [...this.state.markerCustomIntervalStartMs]
      const markerCustomIntervalLastIntStartMs  = [...this.state.markerCustomIntervalLastIntStartMs]
      const markerCustomIntervalAvgIntCallDurMs = [...this.state.markerCustomIntervalAvgIntCallDurMs]
      const markerCustomIntervalMinIntCallDurMs = [...this.state.markerCustomIntervalMinIntCallDurMs]
      const markerCustomIntervalMaxIntCallDurMs = [...this.state.markerCustomIntervalMaxIntCallDurMs]
      const markersReadyState                   = [...this.state.markersReadyState]
      const markersSuccessTimeoutState          = [...this.state.markersSuccessTimeoutState]
      const markersSuccessState                 = [...this.state.markersSuccessState]
      if (this.props.showDoIntervalTimings===true) {
        markerCustomIntervalLastIntStartMs[i]  = Date.now()
        markerCustomIntervalAvgIntCallDurMs[i] = (this.state.markerCustomIntervalAvgIntCallDurMs[i] + msIntDur)/2
        markerCustomIntervalMaxIntCallDurMs[i] = Math.max(markerCustomIntervalMaxIntCallDurMs[i],msIntDur)
        markerCustomIntervalMinIntCallDurMs[i] = Math.min(markerCustomIntervalMinIntCallDurMs[i],msIntDur)!==0?Math.min(markerCustomIntervalMinIntCallDurMs[i],msIntDur):Math.max(markerCustomIntervalMinIntCallDurMs[i],msIntDur)
      }
      markerCustomIntervalStartMs[i]         = 0
      markersReadyState[i]                   = this.props.markerReadyTimeout
      markersSuccessTimeoutState[i]          = this.props.markerReadySuccessTimeout
      markersSuccessState[i]                 = true
      clearInterval(this.state.markerCustomIntervalTimerId[i])
      if (this.props.showDoIntervalTimings===true) {
        this.setState({markerCustomIntervalStartMs,markersReadyState,markerCustomIntervalAvgIntCallDurMs,markerCustomIntervalMinIntCallDurMs,markerCustomIntervalMaxIntCallDurMs,markerCustomIntervalLastIntStartMs,markersSuccessTimeoutState,markersSuccessState})
      } else {
        this.setState({markerCustomIntervalStartMs,markersReadyState,markersSuccessTimeoutState,markersSuccessState})
      }
    } else {
      const markersReadyState                   = [...this.state.markersReadyState]
      const markerCustomIntervalLastIntStartMs  = [...this.state.markerCustomIntervalLastIntStartMs]
      const markerCustomIntervalAvgIntCallDurMs = [...this.state.markerCustomIntervalAvgIntCallDurMs]
      const markerCustomIntervalMinIntCallDurMs = [...this.state.markerCustomIntervalMinIntCallDurMs]
      const markerCustomIntervalMaxIntCallDurMs = [...this.state.markerCustomIntervalMaxIntCallDurMs]
      if (this.props.showDoIntervalTimings===true) {
        markerCustomIntervalLastIntStartMs[i]  = Date.now()
        markerCustomIntervalAvgIntCallDurMs[i] = (this.state.markerCustomIntervalAvgIntCallDurMs[i] + msIntDur)/2
        markerCustomIntervalMinIntCallDurMs[i] = Math.min(markerCustomIntervalMinIntCallDurMs[i],msIntDur)!==0?Math.min(markerCustomIntervalMinIntCallDurMs[i],msIntDur):Math.max(markerCustomIntervalMinIntCallDurMs[i],msIntDur)
        markerCustomIntervalMaxIntCallDurMs[i] = Math.max(markerCustomIntervalMaxIntCallDurMs[i],msIntDur)
      }
      markersReadyState[i]                   = msElapsed
      if (this.props.showDoIntervalTimings===true) {
        this.setState({markersReadyState,markerCustomIntervalLastIntStartMs,markerCustomIntervalAvgIntCallDurMs,markerCustomIntervalMinIntCallDurMs,markerCustomIntervalMaxIntCallDurMs})
      } else {
        this.setState({markersReadyState})
      }
    }
  }

  killInterval = i => {
    const markerCustomIntervalStartMs         = [...this.state.markerCustomIntervalStartMs]
    const markersReadyState                   = [...this.state.markersReadyState]
    const markerCustomIntervalLastIntStartMs  = [...this.state.markerCustomIntervalLastIntStartMs]
    const markerCustomIntervalAvgIntCallDurMs = [...this.state.markerCustomIntervalAvgIntCallDurMs]
    const markerCustomIntervalMaxIntCallDurMs = [...this.state.markerCustomIntervalMaxIntCallDurMs]
    const markerCustomIntervalMinIntCallDurMs = [...this.state.markerCustomIntervalMinIntCallDurMs]
    const markersSuccessTimeoutState          = [...this.state.markersSuccessTimeoutState]
    const markersSuccessState                 = [...this.state.markersSuccessState]
    if (markersSuccessState[i]===false) {
      markerCustomIntervalStartMs[i]           = 0
      if (this.props.showDoIntervalTimings===true) {
        markerCustomIntervalLastIntStartMs[i]  = 0
        markerCustomIntervalAvgIntCallDurMs[i] = 0
        markerCustomIntervalMinIntCallDurMs[i] = 0
        markerCustomIntervalMaxIntCallDurMs[i] = 0
      }
      markersReadyState[i]                     = 0
      clearInterval(this.state.markerCustomIntervalTimerId[i])
      if (this.props.showDoIntervalTimings===true) {
        this.setState({markerCustomIntervalStartMs,markersReadyState,markerCustomIntervalLastIntStartMs,markerCustomIntervalAvgIntCallDurMs,markerCustomIntervalMinIntCallDurMs,markerCustomIntervalMaxIntCallDurMs})
      } else {
        this.setState({markerCustomIntervalStartMs,markersReadyState})
      }
    }
  }

  startInterval = i => {
    const markerCustomIntervalStartMs = [...this.state.markerCustomIntervalStartMs]
    const markerCustomIntervalTimerId = [...this.state.markerCustomIntervalTimerId]
    const markerCustomIntervalLastIntStartMs  = [...this.state.markerCustomIntervalLastIntStartMs]
    const markerCustomIntervalAvgIntCallDurMs = [...this.state.markerCustomIntervalAvgIntCallDurMs]
    const markerCustomIntervalMinIntCallDurMs = [...this.state.markerCustomIntervalMinIntCallDurMs]
    const markerCustomIntervalMaxIntCallDurMs = [...this.state.markerCustomIntervalMaxIntCallDurMs]
    const markersSuccessTimeoutState          = [...this.state.markersSuccessTimeoutState]
    const markersSuccessState                 = [...this.state.markersSuccessState]
    if (markersSuccessState[i]===true) {
      markersSuccessTimeoutState[i] = this.props.markerReadySuccessTimeout
      this.setState({markersSuccessTimeoutState})
    } else {
      clearInterval(this.state.markerCustomIntervalTimerId[i])
      if (this.props.showDoIntervalTimings===true) {
        markerCustomIntervalLastIntStartMs[i]  = Date.now()
        markerCustomIntervalAvgIntCallDurMs[i] = this.props.markerReadyTimeoutInterval
        markerCustomIntervalMinIntCallDurMs[i] = this.props.markerReadyTimeoutInterval
        markerCustomIntervalMaxIntCallDurMs[i] = this.props.markerReadyTimeoutInterval
      }
      markerCustomIntervalStartMs[i]         = Date.now()
      markerCustomIntervalTimerId[i]         = setInterval(()=>this.doInterval(i),this.props.markerReadyTimeoutInterval)
      if (this.props.showDoIntervalTimings===true) {
        this.setState({markerCustomIntervalStartMs,markerCustomIntervalTimerId,markerCustomIntervalLastIntStartMs,markerCustomIntervalAvgIntCallDurMs,markerCustomIntervalMinIntCallDurMs,markerCustomIntervalMaxIntCallDurMs})
      } else {
        this.setState({markerCustomIntervalStartMs,markerCustomIntervalTimerId})
      }
    }
  }

  handleCanvasMouseDown = ev => this.startInterval(3)

  handleCanvasMouseUp   = ev => this.killInterval(3)

  drawAnEllipse = () => {
    if (this.ctx!==null) {
      this.ctx.fillStyle='green';    this.ctx.beginPath(); this.ctx.arc(0,0,10,0,2*Math.PI);     this.ctx.fill();
      this.ctx.fillStyle='green';    this.ctx.beginPath(); this.ctx.arc(300,150,10,0,2*Math.PI); this.ctx.fill();
      this.ctx.fillStyle='green';    this.ctx.beginPath(); this.ctx.arc(300,0,10,0,2*Math.PI);   this.ctx.fill();
      this.ctx.fillStyle='green';    this.ctx.beginPath(); this.ctx.arc(0,150,10,0,2*Math.PI);   this.ctx.fill();
      this.ctx.fillStyle='red';      this.ctx.beginPath(); this.ctx.arc(20,20,10,0,2*Math.PI);   this.ctx.fill();
      this.ctx.fillStyle='blue';     this.ctx.beginPath(); this.ctx.arc(50,50,10,0,2*Math.PI);   this.ctx.fill();
      this.ctx.strokeStyle='orange'; this.ctx.beginPath(); this.ctx.ellipse(40+Math.random()*10,40+Math.random()*10,20,40,Math.PI/4+Math.random()*Math.PI/4,0,2*Math.PI); this.ctx.stroke();
    }
  }

  handleCanvasClick = ev => this.drawAnEllipse()

  reportCTX = newCtx => {
    console.log('%c[%cClaVitCommsTSTestbed%c.%creportCTX%c]:%c %cSTART%c',wB,yB,cB,yN,wB,rs,  gB,rs)
    this.ctx = newCtx
    console.log('%c[%cClaVitCommsTSTestbed%c.%creportCTX%c]:%c %cEND%c',wB,yB,cB,yN,wB,rs,  rB,rs)
  }

  componentDidMount = () => {}

  componentWillUnmount = () => {}

  componentDidUpdate = (prevProps, prevState) => {}

  render = () => {
    return (
    <div className='tsTestbed'>
     <h1 className='titl'>Component <code>&lt;TSTestbed/&gt;</code>.</h1>
     <Divider orientation='left' type='horizontal'>Touchscreen testing ground</Divider>
     <Collapse accordion destroyInactivePanel={true} bordered expandIconPosition='left' onChange={this.props.setMainAccActKey} activeKey={this.props.mainAccActKey} expandIcon={({isActive})=>(<Icon type='tool' rotate={isActive?90:0} color={isActive?'#ffff00ff':'unset'} theme={'filled'}/>)} className='collapse'>
      <Panel header='Persistant store' key='1' extra={this.genMainAccExtraIcon('info-circle','1')} className='panel'>
       <ul>
        <li><label htmlFor='tsTbd_inpCheck_SettingsUIOn'>Settings UI:&nbsp;</label><input id='tsTbd_inpCheck_SettingsUIOn' type='checkbox' checked={this.props.settingsUIOn} onChange={ev=>this.props.setSetUIOn(ev.target.checked)}/><label htmlFor='tsTbd_inpCheck_SettingsUIOn'>&nbsp;{this.props.settingsUIOn?(<span className='strEnabled'>shown</span>):(<span className='strDisabled'>hidden</span>)}</label></li>
        <li><label htmlFor='tsTbd_inpCheck_StorageEncryption'>Storage encryption:&nbsp;</label><input id='tsTbd_inpCheck_StorageEncryption' type='checkbox'  checked={this.props.storageEncrypt} readOnly/><label htmlFor='tsTbd_inpCheck_StorageEncryption'>&nbsp;{this.props.storageEncrypt?(<span className='strEnabled'>enabled</span>):(<span className='strDisabled'>disabled</span>)}</label></li>
        <li><label htmlFor='tsTbd_inpText_StorageEncryptionKeyClr'>Storage encryption key (cleartext):&nbsp;</label><textarea id='tsTbd_inpText_StorageEncryptionKeyClr' readOnly value={this.props.storageEncryptionKeyClr} cols={64} rows={10}/></li>
       </ul>
      </Panel>
      <Panel header='Position&Orientation' key='2' extra={this.genMainAccExtraIcon('credit-card','2')} className='panel'>
       <div className='multitouchTestArea'>
        <div className='multitouchTestControls' title='1st multitouchTestControls, the one with keyForm Select.'>
         <Select size='small' value={this.props.keyForm} onChange={this.props.setKeyForm} filterOption={false} dropdownMatchSelectWidth={false}>
          <OptGroup label='Disable key form matching'>
           <Option value={0} title='No title'>No keyform</Option>
          </OptGroup>
          <OptGroup label='Simple square form-factor'>
           <Option value={1} disabled>Simple square, 3 markers</Option>
          </OptGroup>
          <OptGroup label='Smartcard form-factor'>
           <Option value={2}>Smartcard w/crypto, 3 markers<img alt='scCwNoCh3ptNoDim' src={scCwNoCh3ptNoDim} className='imgInKeyformSelect'/></Option>
           <Option value={3} disabled><span>Smartcard w/crypto&chip, 3 markers</span><img alt='scCwCh3ptNoDim' src={scCwNoCh3ptNoDim} className='imgInKeyformSelect'/></Option>
          </OptGroup>
         </Select>
         <Divider type='vertical'/>
         <div>
          <label>Canvas width:</label> <Input size='small' style={{width:'5em'}} value={this.state.canvasWidth}  onChange={ev=>this.setState({canvasWidth:ev.target.value})}/>
         </div>
         <div>
          <label>Canvas height:</label> <Input size='small' style={{width:'5em'}} value={this.state.canvasHeight} onChange={ev=>this.setState({canvasHeight:ev.target.value})}/>
         </div>
         <Divider type='vertical'/>
        </div>
        <div className='multitouchTestControls' title='3d multitouchTestControls, the one with progress indicators.'>
         {
          this.state.markersReadyState.map(
            (el,idx)=>(
             <div key={idx} className='progressStackBase'>
              {(this.props.showDoIntervalTimings===true ? (<List size='small'  itemLayout='horizontal' bordered={true} split={true} header={(<div><strong><code>doInterval({idx})</code></strong> timings</div>)} dataSource={[{type:'min',val:this.state.markerCustomIntervalMinIntCallDurMs[idx].toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})+'ms'},{type:'avg',val:this.state.markerCustomIntervalAvgIntCallDurMs[idx].toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})+'ms'},{type:'max',val:this.state.markerCustomIntervalMaxIntCallDurMs[idx].toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})+'ms'}]} renderItem={item=>(<List.Item key={item.type}><List.Item.Meta title={(<strong>{item.type.charAt(0).toUpperCase()+item.type.slice(1)}:</strong>)}/>{item.val}</List.Item>)}/>) : (<></>))}
              <Progress key={idx+'Bottom'} type='circle' strokeWidth={3} strokeColor='#00f000ff' className='progressStackBottom' width={this.props.baseMarkersProgressSizePx} percent={100*el/this.props.markerReadyTimeout}                                                format={percent=>`${percent}%`} disabled={(idx===3||[1,2,3].includes(this.props.keyForm))?false:true}/>
              <Progress key={idx+'TopOne'} type='line' strokeColor='#00f000ff' className='progressStackTopOne'                                              percent={100*this.state.markersSuccessTimeoutState[idx]/this.props.markerReadySuccessTimeout} format={percent=>`${percent}%`} disabled={(idx===3||[1,2,3].includes(this.props.keyForm))?false:true}/>
              <Progress key={idx+'TopTwo'} type='line' strokeColor='#808080ff' className='progressStackTopTwo'                                              percent={100*this.state.markersPausedTimeoutState[idx]/this.props.markerReadyPauseTimeout}    format={percent=>`${percent}%`} disabled={(idx===3||[1,2,3].includes(this.props.keyForm))?false:true}/>
             </div>
            )
          )
         }
        </div>
        <CanvasComp reportCTX={this.reportCTX} canvasWidth={this.state.canvasWidth} canvasHeight={this.state.canvasHeight} handleCanvasTouchStart={this.handleCanvasTouchStart} handleCanvasTouchMove={this.handleCanvasTouchMove} handleCanvasTouchEnd={this.handleCanvasTouchEnd} handleCanvasTouchCancel={this.handleCanvasTouchCancel} handleCanvasClick={this.handleCanvasClick} handleCanvasMouseDown={this.handleCanvasMouseDown} handleCanvasMouseUp={this.handleCanvasMouseUp}/>
       </div>
      </Panel>
     </Collapse>

     <style jsx='true'>{`
       .tsTestbed   { font-size:1rem;                                                                                                             }
       .strEnabled  { font-weight:bold; color:#00dd00ff;                                                                                          }
       .strDisabled { font-weight:bold; color:#dd0000ff;                                                                                          }
       textarea     { font-size:1em; resize:none; vertical-align:top; text-align:justify; font-size:0.75em; padding:0.5em; font-family:monospace; }

       .collapse   { font-size:1em; margin-bottom:1em;          }
       .panel      { font-size:1em; background-color:#4788f4ff; }

       .multitouchTestArea     { font-size:1em; position:relative; margin:0; padding:0; background-color:#87c8f4ff; border:0.125em solid black; min-width:90vw; display:flex; flex-flow:column nowrap; justify-content:flex-start; align-items:center; }
       .multitouchTestControls { font-size:1em; position:relative; align-self:stretch; margin:0; padding:0; border:none; display:flex; flex-flow:row nowrap; justify-content:center; align-items:flex-end;                                             }
       .progressStackBase      { font-size:1em; position:relative; margin:0; padding:0; border:none; display:flex; flex-flow:column nowrap; justify-content:flex-start; align-items:stretch;                                                           }
       .progressStackBottom    { font-size:1em; margin:0.5em; padding:0; border:none; text-align:center;                                                                                                                                               }
       .progressStackTopOne    { font-size:1em; margin:0.5em; padding:0; border:none;                                                                                                                                                                  }
       .progressStackTopTwo    { font-size:1em; margin:0.5em; padding:0; border:none;                                                                                                                                                                  }
       .imgInKeyformSelect     { transform:rotate(90deg); width:4em;                                                                                                                                                                                   }
     `}</style>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  settingsUIOn:               state.settingsUI.settingsUIOn,
  storageEncrypt:             state.settingsUI.storageEncrypt,
  storageEncryptionKeyClr:    state.settingsUI.storageEncryptionKeyClr,
  mainAccActKey:              state.tsTestbed.mainAccActKey,
  keyForm:                    state.tsTestbed.keyForm,
  markerReadyTimeout:         state.tsTestbed.markerReadyTimeout,
  markerReadyPauseTimeout:    state.tsTestbed.markerReadyPauseTimeout,
  markerReadySuccessTimeout:  state.tsTestbed.markerReadySuccessTimeout,
  markerReadyTimeoutInterval: state.tsTestbed.markerReadyTimeoutInterval,
  showDoIntervalTimings:      state.tsTestbed.showDoIntervalTimings,
  baseMarkersProgressSizePx:  state.tsTestbed.baseMarkersProgressSizePx
})
const mapDispatchToProps = (dispatch,ownProps) => ({
  setSetUIOn:            on     => dispatch(settingsUIActionCreators.setSetUIOn(on)               ),
  resetPnO:              ()     => dispatch(tsTestbedActionCreators.resetPnO()                    ),
  setMainAccActKey:      actKey => dispatch(tsTestbedActionCreators.setMainAccActKey(actKey)      ),
  setKeyForm:            val    => dispatch(tsTestbedActionCreators.setKeyForm(val)               )
})
const connectedClaVitCommsTSTestbed = connect(mapStateToProps, mapDispatchToProps)(ClaVitCommsTSTestbed)

export { connectedClaVitCommsTSTestbed as ClaVitCommsTSTestbed, connectedClaVitCommsTSTestbed as default }
