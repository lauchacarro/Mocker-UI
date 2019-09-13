import React, { useEffect } from 'react'
import { Sandbox as ReactSandbox } from 'react-sandbox-editor'
import './styles.css'

const SandBox = props => {
  const value = '{"Hello" : "World"}'
  const { disable } = props
  // const changeValue = (value) => {

  //   props.handleChangeSandBox(value)

  // }
  useEffect(() => {
    document.getElementsByClassName('react-sandbox-editor40')[0].remove()
    document.getElementsByClassName('react-sandbox-editor81 react-sandbox-editor41')[0].style.height = "100%"
    document.getElementsByClassName('react-sandbox-editor82 react-sandbox-editor41')[0].style.height = "100%"

  }, [])

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
        readOnly: disable,
        wrapLines: true
      }}
      templateEditor={{
        defaultValue: '<div id="root"></div>',
        mode: 'html',
        readOnly: false,
        wrapLines: false
      }}
      theme={disable? "twilight" : "github"}
      executeOnCodeChange={false}
      executeOnCodeChangeDebounce={1000}

    />
  )
}


export default SandBox;