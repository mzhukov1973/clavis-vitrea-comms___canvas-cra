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
import { tsTestbedActionTypes }  from '../actions'



const tsTestbed = (state={}, action) => {
  switch (action.type) {

    case tsTestbedActionTypes.SET_MAIN_ACC:
     return Object.assign({},state,{mainAccActKey:action.data})

    case tsTestbedActionTypes.SET_KEYFORM:
     return Object.assign({},state,{keyForm:action.data})

    case tsTestbedActionTypes.SET_MARKER_READY_MS:
     return Object.assign({},state,{markerReadyTimeout:action.data})

    case tsTestbedActionTypes.SET_BASE_MARKERS_PRGRS_SIZE:
     return Object.assign({},state,{baseMarkersProgressSizePx:action.data})

    case tsTestbedActionTypes.SET_MARKER_READY_MS_INT:
     return Object.assign({},state,{markerReadyTimeoutInterval:action.data})

    case tsTestbedActionTypes.SET_MARKER_READY_OK_MS:
     return Object.assign({},state,{markerReadySuccessTimeout:action.data})

    case tsTestbedActionTypes.SET_SHOW_INT_TIMINGS:
     return Object.assign({},state,{showDoIntervalTimings:action.data})

    case tsTestbedActionTypes.SET_MARKER_READY_PAUSE_MS:
     return Object.assign({},state,{markerReadyPauseTimeout:action.data})

    default:
     return state
  }
}

export { tsTestbed, tsTestbed as default }
