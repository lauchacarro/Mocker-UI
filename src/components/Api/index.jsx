import { config } from './config'
export const CreateMock = mocks => {
    
    const mocksRequest = mocks.filter((mock) => mock.Active === true)
    return fetch(config.Url + "api/create", {
        method: 'POST',
        body: JSON.stringify({ Mocks: mocksRequest }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
}

export const CreateFile = file => {
    const formData = new FormData();
    formData.append("file", file, file.name);

    return fetch(config.Url + "api/files", {
        method: 'POST',
        body: formData
    })
}