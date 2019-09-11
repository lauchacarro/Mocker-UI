import React, { useState } from 'react'
import SandBox from '../../SandBox'
import Loading from '../../Loading'
import Button from '@material-ui/core/Button';
const MockTab = () => {

    const [mock, setMock] = useState('')
    const handleClick = () => {
        console.log(mock)

    }
    const handleChangeSandBox = (editorName, value) => {
        setMock(value)
    }

    return (
        <div>
            <SandBox handleChangeSandBox={handleChangeSandBox} />
            <Button onClick={handleClick} color="primary">
                Create Mock
                    </Button>
        </div>
    )
}

export default MockTab;