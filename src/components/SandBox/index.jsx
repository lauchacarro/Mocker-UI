import React, { useState } from 'react'
import { Sandbox, withDependencies } from 'react-sandbox-editor'
import './styles.css'

const ReactSandbox = withDependencies([
  'https://unpkg.com/react@16.6.0/umd/react.development.js',
  'https://unpkg.com/react-dom@16.6.0/umd/react-dom.development.js'
])(Sandbox)
const SandBox = (props) => {
  const value = '{"Hello" : "World"}'
  
  // const changeValue = (value) => {
   
  //   props.handleChangeSandBox(value)
    
  // }
  return (
    <ReactSandbox
      classes={{
        header: "hide"
      }}
      displayMode="horizontal-split"

      selectedTab="scriptTab"
      onDisplayModeButtonClick={function () { }}
      onCodeChange={props.handleChangeSandBox}
      permissions={[
        'allow-pointer-lock',
        'allow-forms',
        'allow-popups',
        'allow-modals',
        'allow-scripts',
        'allow-same-origin',
        'allow-top-navigation'
      ]}
      scriptEditor={{
        defaultValue: value,
        mode: 'javascript',
        readOnly: false,
        wrapLines: true
      }}
      templateEditor={{
        defaultValue: '<div id="root"></div>',
        mode: 'html',
        readOnly: false,
        wrapLines: false
      }}
      theme="github"
      executeOnCodeChange={false}
      executeOnCodeChangeDebounce={1000}

    />


  )
}


export default SandBox;