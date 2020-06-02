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
import { sandboxOneActionTypes }  from '../actions'



const sandboxOne = (state={}, action) => {
  switch (action.type) {

    case sandboxOneActionTypes.SET_GLPH_ARR:
     return Object.assign({},state,{glyphArr:action.data})

    case sandboxOneActionTypes.SET_RAND_ARR:
     return Object.assign({},state,{randArr:action.data})

    case sandboxOneActionTypes.SET_OVRL_ARR:
     return Object.assign({},state,{ovrlArr:action.data})

    default:
     return state
  }
}

export { sandboxOne, sandboxOne as default }
