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
export const appUIActionTypes = {
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB_KEY_IN_APP_COMPONENT'
}
export const appUIActionCreators = {
  setActTab: key => ( {type:appUIActionTypes.SET_ACTIVE_TAB, data:key} )
}



export const tsTestbedActionTypes = {
  SET_MAIN_ACC:                'SET_MAIN_ACCORDION_ACTIVE_PANEL_KEY_IN_TSTESTBED_COMPONENT',
  SET_KEYFORM:                 'SET_KEYFORM_TO_USE_WITH_CANVAS_IN_TSTESTBED_COMPONENT',
  SET_MARKER_READY_MS:         'SET_MARKER_READY_TIMEOUT_IN_MS_FOR_TSTESTBED_COMPONENT',
  SET_MARKER_READY_OK_MS:      'SET_MARKER_READY_SUCCESS_TIMEOUT_IN_MS_FOR_TSTESTBED_COMPONENT',
  SET_MARKER_READY_PAUSE_MS:   'SET_MARKER_READY_PAUSE_TIMEOUT_IN_MS_FOR_TSTESTBED_COMPONENT',
  SET_MARKER_READY_MS_INT:     'SET_MARKER_READY_TIMEOUT_INTERVAL_IN_MS_FOR_TSTESTBED_COMPONENT',
  SET_BASE_MARKERS_PRGRS_SIZE: 'SET_BASE_MARKERS_PROGRESS_COMPONENT_SIZE_IN_PX_FOR_TSTESTBED_COMPONENT',
  SET_SHOW_INT_TIMINGS:        'SET_SHOW_DO_INTERVAL_TIMINGS'
}
export const tsTestbedActionCreators = {
  setMainAccActKey:              actKey => ( {type:tsTestbedActionTypes.SET_MAIN_ACC,                data:actKey}                                                       ),
  setKeyForm:                    val    => ( {type:tsTestbedActionTypes.SET_KEYFORM,                 data:((isNaN(Number(val))||Number(val)<0)?0:Number(val))}          ),
  setMarkerReadyTimeout:         ms     => ( {type:tsTestbedActionTypes.SET_MARKER_READY_MS,         data:(Math.floor((isNaN(Number(ms))||Number(ms)<0)?0:Number(ms)))} ),
  setBaseMarkersProgressSizePx:  sz     => ( {type:tsTestbedActionTypes.SET_BASE_MARKERS_PRGRS_SIZE, data:(Math.floor((isNaN(Number(sz))||Number(sz)<0)?0:Number(sz)))} ),
  setMarkerReadySuccessTimeout:  ms     => ( {type:tsTestbedActionTypes.SET_MARKER_READY_OK_MS,      data:(Math.floor((isNaN(Number(ms))||Number(ms)<0)?0:Number(ms)))} ),
  setMarkerReadyPauseTimeout:    ms     => ( {type:tsTestbedActionTypes.SET_MARKER_READY_PAUSE_MS,   data:(Math.floor((isNaN(Number(ms))||Number(ms)<0)?0:Number(ms)))} ),
  setMarkerReadyTimeoutInterval: ms     => ( {type:tsTestbedActionTypes.SET_MARKER_READY_MS_INT,     data:(Math.floor((isNaN(Number(ms))||Number(ms)<0)?0:Number(ms)))} ),
  setShowDoIntervalTimings:      show   => ( {type:tsTestbedActionTypes.SET_SHOW_INT_TIMINGS,        data:show}                                                         )
}



export const sandboxOneActionTypes = {
  SET_GLPH_ARR: 'SET_GLYPH_ARRAY',
  SET_RAND_ARR: 'SET_RANDOM_ARRAY',
  SET_OVRL_ARR: 'SET_OVERLAY_ARRAY'
}
export const sandboxOneActionCreators = {
  setGlyphArr: glphArr => ( {type:sandboxOneActionTypes.SET_GLPH_ARR, data:glphArr} ),
  setRandArr:  randArr => ( {type:sandboxOneActionTypes.SET_RAND_ARR, data:randArr} ),
  setOvrlArr:  ovrlArr => ( {type:sandboxOneActionTypes.SET_OVRL_ARR, data:ovrlArr} )
}



export const sandboxTwoActionTypes = {
  INIT_SBOX_TWO: 'INITIALISE_SANDBOX_TWO_COMPONENT'
}
export const sandboxTwoActionCreators = {
  initSBoxTwo: () => ( {type:sandboxTwoActionTypes.INIT_SBOX_TWO} )
}



export const settingsUIActionTypes = {
  SET_SETTINGS_ACC:          'SET_SETTINGS_ACCORDION_ACTIVE_PANEL_KEY_IN_SETTINGS_UI_COMPONENT',
  SET_SETUI_ON:              'SET_SETTINGS_UI_OPEN_FLAG',
  SET_GLPH_SIZE:             'SET_GLYPH_SIZE',
  SET_GLPH_PX:               'SET_GLYPH_PIXEL_SIZE',
  SET_SCR_PX:                'SET_SCREEN_PIXEL_SIZE',
  SET_SETUI_GLPH_PX_FRMS_ON: 'SET_SETTINGS_UI_GLYPH_PIXEL_FORMS_SHOWN_FLAG',
  SET_ENC_STOR:              'SET_STORAGE_ENCRYPTION_OPTION',
  SET_PW_HASH:               'SET_PASSWORD_HASH_STRING',
  SET_ENC_KEY_ENC:           'SET_STORAGE_ENCRYPTION_KEY_ENCRYPTED_WITH_PASSPHRASE',
  SET_ENC_KEY_CLR:           'SET_STORAGE_ENCRYPTION_KEY_CLEARTEXT',
  SET_GLPH_PX_02_FRMS:       'SET_GLYPH_PIXEL_FORMS_FOR_SIZE_02',
  SET_GLPH_PX_03_FRMS:       'SET_GLYPH_PIXEL_FORMS_FOR_SIZE_03',
  SET_GLPH_PX_04_FRMS:       'SET_GLYPH_PIXEL_FORMS_FOR_SIZE_04'
}
export const settingsUIActionCreators = {
  setSettingsAccActKey:       actKey      => ( {type:settingsUIActionTypes.SET_SETTINGS_ACC,          data:actKey}             ),
  setSetUIOn:                 on          => ( {type:settingsUIActionTypes.SET_SETUI_ON,              data:on}                 ),
  setGlyphSize:               glphSize    => ( {type:settingsUIActionTypes.SET_GLPH_SIZE,             data:Number(glphSize)}   ),
  setGlyphPx:                 glphPxSize  => ( {type:settingsUIActionTypes.SET_GLPH_PX,               data:Number(glphPxSize)} ),
  setScrPx:                   scrPxSize   => ( {type:settingsUIActionTypes.SET_SCR_PX,                data:scrPxSize}          ),
  setSetUIGlyphPxFormsOn:     on          => ( {type:settingsUIActionTypes.SET_SETUI_GLPH_PX_FRMS_ON, data:on}                 ),
  setStorageEncryption:       enabled     => ( {type:settingsUIActionTypes.SET_ENC_STOR,              data:enabled}            ),
  setPwHash:                  pwHash      => ( {type:settingsUIActionTypes.SET_PW_HASH,               data:pwHash}             ),
  setStorageEncryptionKeyEnc: encKeyEnc   => ( {type:settingsUIActionTypes.SET_ENC_KEY_ENC,           data:encKeyEnc}          ),
  setStorageEncryptionKeyClr: encKeyClr   => ( {type:settingsUIActionTypes.SET_ENC_KEY_CLR,           data:encKeyClr}          ),
  setSetGlyphPxSize02Forms:   glphPxForms => ( {type:settingsUIActionTypes.SET_GLPH_PX_02_FRMS,       data:glphPxForms}        ),
  setSetGlyphPxSize03Forms:   glphPxForms => ( {type:settingsUIActionTypes.SET_GLPH_PX_03_FRMS,       data:glphPxForms}        ),
  setSetGlyphPxSize04Forms:   glphPxForms => ( {type:settingsUIActionTypes.SET_GLPH_PX_04_FRMS,       data:glphPxForms}        )
}
