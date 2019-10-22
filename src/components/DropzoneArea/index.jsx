import React from 'react'
import ToyZone from "./ToyZone";

const DropzoneArea = props => {
    const { onUploadFile } = props
    
    const handleSave = (files) => {
        if (files && files.length > 0) {
            onUploadFile && onUploadFile(files[0])
        }
    }

    return (
        <ToyZone onFilesAdded={handleSave} />
    );

}

export default DropzoneArea