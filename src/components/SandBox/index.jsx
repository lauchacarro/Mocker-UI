import React, { useEffect } from 'react'
import { Sandbox as ReactSandbox } from 'react-sandbox-editor'
import PropTypes from 'prop-types';
import './styles.css'

const SandBox = props => {
  const { disable, handleChangeSandBox, content } = props

  useEffect(() => {

    document.querySelectorAll('#tabs-content > div:nth-child(2) > :nth-child(2)').forEach(element => {
      element.style.width = "100%"
      element.style.height = "100%"
    });

    document.querySelectorAll('.sandbox-hide').forEach(element => {
      element.parentElement.parentElement.style.width = "100%"
      element.parentElement.parentElement.style.height = "100%"
      element.parentElement.parentElement.style.position = "relative"
      element.parentElement.parentElement.style.padding = "1px"
      element.parentElement.parentElement.style.background = "linear-gradient(to right, rgb(4, 92, 255), rgb(255, 251, 0), rgb(197, 49, 12))"
    });
    
    document.querySelectorAll('#tabs-content > div:nth-child(4)').forEach(element => {
      element.remove()
    });

    document.querySelectorAll('#tabs-content > div:nth-child(1)').forEach(element => {
      element.style.height = "100%"
    });

    document.querySelectorAll('#tabs-content > div:nth-child(2)').forEach(element => {
      element.style.height = "100%"
    });
  })

  return (
    <ReactSandbox
    id="sandboxSkere"
      classes={{
        header: "sandbox-hide"
      }}
      displayMode="horizontal-split"
      selectedTab="scriptTab"
      onDisplayModeButtonClick={function () { }}
      onCodeChange={handleChangeSandBox}
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
        defaultValue: content,
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
      theme={disable ? "twilight" : "github"}
      executeOnCodeChange={false}
      executeOnCodeChangeDebounce={0}

    />
  )
}

SandBox.propTypes = {
  disable: PropTypes.bool,
  handleChangeSandBox : PropTypes.func,
  content : PropTypes.string
}

export default SandBox;