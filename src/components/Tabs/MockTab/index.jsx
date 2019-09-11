import React, { useState } from 'react'
import SandBox from '../../SandBox'
import Loading from '../../Loading'
import Button from '@material-ui/core/Button';
import ContentTypeSelect from '../../Selects/ContentTypeSelect'
import StatusCodeSelect from '../../Selects/StatusCodeSelect'
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
            <ContentTypeSelect/>
            <StatusCodeSelect/>
            <SandBox handleChangeSandBox={handleChangeSandBox} />
            <Button onClick={handleClick} color="primary">
                Create Mock
                    </Button>
        </div>
    )
}

export default MockTab;