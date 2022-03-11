import React from 'react'
import { mount } from 'enzyme'
import UploadDocumentForm from 'app/views/supply-chain-finance/forms/UploadDocumentForm'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { Store } from 'app/redux/Store'
import { Provider } from 'react-redux'
import { act } from '@testing-library/react'
import AxiosMockAdapter from 'axios-mock-adapter'
import Axios from '../../../../axios.js'
import * as Redux from 'react-redux'
import _ from 'lodash'

const { REACT_APP_API, REACT_APP_DOCUMENT } = process.env

function waitForUpdate(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

describe('UploadDocumentForm UI Behavior Unit Test', () => {
    let wrapper
    let mockAxios
    let uploadDocumentUrl = `${REACT_APP_API}/${REACT_APP_DOCUMENT}/storage/upload-document`
    const theme = createTheme()

    describe('Mount', () => {
        beforeEach(() => {
            mockAxios = new AxiosMockAdapter(Axios)
            mockAxios
                .onPost(uploadDocumentUrl)
                .reply(200, {
                    documentId: '12323123',
                    documentName: 'Document_1.pdf',
                })

            wrapper = mount(
                <Provider store={Store}>
                    <ThemeProvider theme={theme}>
                        <BrowserRouter>
                            <UploadDocumentForm />
                        </BrowserRouter>
                    </ThemeProvider>
                </Provider>
            )
        })
        
        afterEach(() => {
            wrapper.unmount()
            jest.clearAllMocks()
            mockAxios.resetHistory()
        })

        it('Should render', () => {
            expect(wrapper.length).toEqual(1)
        })

        it('Should handle Upload Document', async () => {
            // with files to upload
            const uploadBtnSelectors = [
                'SCUploadButton#uploadDocument_authDirectorNationalId',
                'SCUploadButton#uploadDocument_shareholderNationalId',
                'SCUploadButton#uploadDocument_livePhotoAuthDirector',
                'SCUploadButton#uploadDocument_businessProperty',
                'SCUploadButton#uploadDocument_companyAffidavit',
                'SCUploadButton#uploadDocument_shareholderRegistries',
                'SCUploadButton#uploadDocument_PP30',
                'SCUploadButton#uploadDocument_companyBankStatement',
                'SCUploadButton#uploadDocument_letterOfAuthority',
                'SCUploadButton#uploadDocument_otherDocuments',
            ]
            _.forEach(uploadBtnSelectors, selector => {
                act(() => {
                    wrapper
                        .find(selector)
                        .props()
                        .onChange({
                            target: {
                                files: [
                                    {
                                        name: 'testFile',
                                        size: 2097152,
                                    },
                                ],
                            },
                        })
                })
            })
            
            await waitForUpdate(1000)
            wrapper.update()

            // assert if every button calls axios.post
            expect(mockAxios.history.post.length).toEqual(_.size(uploadBtnSelectors))
            
            // assert of every upload button calls the upload url
            _.forEach(uploadBtnSelectors, (selectors, index) => {
                expect(mockAxios.history.post[index].url)
                    .toEqual(uploadDocumentUrl)
            })
        })

        it('Should do nothing when uploading empty', async () => {
            // no files to upload
            act(() => {
                wrapper
                    .find(
                        'SCUploadButton#uploadDocument_authDirectorNationalId'
                    )
                    .props()
                    .onChange({
                        target: {
                            files: [],
                        },
                    })
            })

            await waitForUpdate(2000)

            expect(mockAxios.history.post.length).toBe(0)
        })

        it('Should handle box handlers', () => {
            act(() => {
                wrapper
                    .find('SCButton#UDFBack')
                    .props()
                    .buttonClick({
                        target: {
                            name: 'back'
                        },
                    })
            })

            act(() => {
                wrapper
                    .find('SCButton#UDFSubmit')
                    .props()
                    .buttonClick({
                        target: {
                            name: 'submit',
                        },
                    })
                
            })

            wrapper.update()
            waitForUpdate(1000)

            expect(
                wrapper
                    .find('SCUploadButton#uploadDocument_authDirectorNationalId')
                    .props()
                    .requiredError
            ).toBeTruthy()

        })

        it('Should handle remove uploaded file', async () => {
            
            // upload a file
            act(() => {
                wrapper
                    .find(
                        'SCUploadButton#uploadDocument_authDirectorNationalId'
                    )
                    .props()
                    .onChange({
                        target: {
                            files: [
                                {
                                    name: 'testFile',
                                    size: 2097152,
                                },
                            ],
                        },
                    })
            })

            await waitForUpdate(1000)
            wrapper.update()

            //delete a file
            act(() => {
                // success = false
                wrapper
                    .find('#UDF_uploadedDocs_delete_12323123')
                    .at(0)
                    .props()
                    .onClick({}, false)
            })
            wrapper.update()

            // nothing to expect yet since its not supported yet
        })
    })
})
