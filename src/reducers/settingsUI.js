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
import { settingsUIActionTypes }  from '../actions'



const settingsUI = (state={}, action) => {
  switch (action.type) {

    case settingsUIActionTypes.SET_ENC_STOR:
     return Object.assign({},state,{storageEncrypt:action.data})

    case settingsUIActionTypes.SET_PW_HASH:
     return Object.assign({},state,{pwHash:action.data})

    case settingsUIActionTypes.SET_ENC_KEY_ENC:
     return Object.assign({},state,{storageEncryptionKeyEnc:action.data})

    case settingsUIActionTypes.SET_ENC_KEY_CLR:
     return Object.assign({},state,{storageEncryptionKeyClr:action.data})

    case settingsUIActionTypes.SET_GLPH_SIZE:
     return Object.assign({},state,{glyphSize:action.data})

    case settingsUIActionTypes.SET_GLPH_PX:
     return Object.assign({},state,{glyphPxSize:action.data})

    case settingsUIActionTypes.SET_SCR_PX:
     return Object.assign({},state,{scrPxSize:action.data})

    case settingsUIActionTypes.SET_SETUI_ON:
     return Object.assign({},state,{settingsUIOn:action.data})

    case settingsUIActionTypes.SET_GLPH_PX_02_FRMS:
     return Object.assign({},state,{glyphPxFormsForSize02:action.data})

    case settingsUIActionTypes.SET_GLPH_PX_03_FRMS:
     return Object.assign({},state,{glyphPxFormsForSize03:action.data})

    case settingsUIActionTypes.SET_GLPH_PX_04_FRMS:
     return Object.assign({},state,{glyphPxFormsForSize04:action.data})

    case settingsUIActionTypes.SET_SETUI_GLPH_PX_FRMS_ON:
     return Object.assign({},state,{glyphPxFormsShown:action.data})

    case settingsUIActionTypes.SET_SETTINGS_ACC:
     return Object.assign({},state,{settingsAccActKey:action.data})

    default:
     return state
  }
}

export { settingsUI, settingsUI as default }
