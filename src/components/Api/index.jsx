import { config } from './config'
export const CreateMock = (mockGet, mockPost, mockPut, mockPatch, mockDelete) => {
    let mock = { Mocks: [] }

    if (mockGet.Active) {
        mock.Mocks.push(mockStateToMockRequest(mockGet, "GET"))
    }
    if (mockPost.Active) {
        mock.Mocks.push(mockStateToMockRequest(mockPost, "POST"))
    }
    if (mockPut.Active) {
        mock.Mocks.push(mockStateToMockRequest(mockPut, "PUT"))
    }
    if (mockPatch.Active) {
        mock.Mocks.push(mockStateToMockRequest(mockPatch, "PATCH"))
    }
    if (mockDelete.Active) {
        mock.Mocks.push(mockStateToMockRequest(mockDelete, "DELETE"))
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

const mockStateToMockRequest = (mockState, httpMethod) => {
    let request = {
        HttpMethod: httpMethod,
        StatusCode: mockState.StatusCode,
        ContentType: mockState.ContentType,
        Body: mockState.Body,
        Charset: mockState.Charset,
        Headers: []
    }

    mockState.Headers.forEach(header => {
        let key = header.keyH[0]
        let value = Array.isArray(header.valueH) ? header.valueH[0] : ""
        request.Headers.push({
            Key: key,
            Value: value
        })
    });
    return request;
}