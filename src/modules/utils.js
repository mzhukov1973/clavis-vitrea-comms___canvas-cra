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
import React from 'react'



export const formToNum     = formArr                                 => Number.parseInt(formArr.join(''),2)
export const numToForm     = num                                     => Number(num).toString(2).padStart(4,'0').split('').map(el=>Number.parseInt(el,2))
export const genArrOfForms = (glyphPxFormsForThisSize,formsArrElIdx) => Object.values(glyphPxFormsForThisSize[formsArrElIdx]).reduce((acc,em)=>acc.concat(em.forms),[]).map(el=>numToForm(el))

export const genGlyphFormsDisplay = (glyphPxSize,glyphPxFormsForThisSize) => {
  return (
    <fieldset className='glyphPxForms'>
     {/*<legend>Glyph forms for pixel size {glyphPxSize}:</legend>*/}
     <div>
      <div>
       <label>Glyph pixels assigned value of <strong><code>&nbsp;&nbsp;&nbsp;&nbsp;0</code></strong>:&nbsp;</label>
       <div>{genArrOfForms(glyphPxFormsForThisSize,0).map((el,idx)=>(<div className='glyphPxForm' key={idx}>{Array(glyphPxSize).fill(0).map((el,idx)=>el=idx).map(j=>(<div className='glyphPxFormLine' key={j}>{el.slice(j*glyphPxSize,(j+1)*glyphPxSize).map((ell,idxx)=>(<div className={ell===0?('glyphPxFormPixel zero'):('glyphPxFormPixel one')} key={idxx}></div>))}</div>))}</div>))}</div>
      </div>
      <div>
       <label>Glyph pixels assigned value of <strong><em><code>undef</code></em></strong>:&nbsp;</label>
       <div>{genArrOfForms(glyphPxFormsForThisSize,1).map((el,idx)=>(<div className='glyphPxForm' key={idx}>{Array(glyphPxSize).fill(0).map((el,idx)=>el=idx).map(j=>(<div className='glyphPxFormLine' key={j}>{el.slice(j*glyphPxSize,(j+1)*glyphPxSize).map((ell,idxx)=>(<div className={ell===0?('glyphPxFormPixel zero'):('glyphPxFormPixel one')} key={idxx}></div>))}</div>))}</div>))}</div>
      </div>
      <div>
       <label>Glyph pixels assigned value of <strong><code>&nbsp;&nbsp;&nbsp;&nbsp;1</code></strong>:&nbsp;</label>
       <div>{genArrOfForms(glyphPxFormsForThisSize,2).map((el,idx)=>(<div className='glyphPxForm' key={idx}>{Array(glyphPxSize).fill(0).map((el,idx)=>el=idx).map(j=>(<div className='glyphPxFormLine' key={j}>{el.slice(j*glyphPxSize,(j+1)*glyphPxSize).map((ell,idxx)=>(<div className={ell===0?('glyphPxFormPixel zero'):('glyphPxFormPixel one')} key={idxx}></div>))}</div>))}</div>))}</div>
      </div>
     </div>
    </fieldset>
  )
}
