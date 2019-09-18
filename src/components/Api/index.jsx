import { config } from './config'
export const CreateMock = (mockGet, mockPost, mockPut, mockPatch, mockDelete) => {
    let mock = { Mocks: [] }

    if (mockGet && mockGet.Active) {
        mock.Mocks.push({ ...mockGet, HttpMethod: "GET" })
    }
    if (mockPost && mockPost.Active) {
        mock.Mocks.push({ ...mockPost, HttpMethod: "POST" })
    }
    if (mockPut && mockPut.Active) {
        mock.Mocks.push(mockPut)
    }
    if (mockPatch && mockPatch.Active) {
        mock.Mocks.push(mockPatch)
    }
    if (mockDelete && mockDelete.Active) {
        mock.Mocks.push(mockDelete)
    }

    return fetch(config.Url + "api/create", {
        method: 'POST',
        body: JSON.stringify(mock),
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