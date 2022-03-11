import React from 'react'
import { mount } from 'enzyme'
import PersonalDetailsForm from './PersonalDetailsForm'
import * as PDFFunctions from 'app/views/supply-chain-finance/forms/PersonalDetailsForm'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { Store } from 'app/redux/Store'
import { Provider } from 'react-redux'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const { REACT_APP_MOCK, REACT_APP_FINANCING, REACT_APP_API, REACT_APP_SUPPLIER } = process.env

describe('personlDetailsForm Functional Unit Test', () => {
    expect(PDFFunctions.getYearsAgo(240)).toBeInstanceOf(Date)

    const setValue = jest.fn()
    PDFFunctions.addAdditional(
        {
            forms: [{ percentageOfAllocatedShares: '' }],
        },
        setValue
    )
    expect(setValue).toBeCalled()
})

describe('PersonalDetailsForm UI Behavior Unit Tests', () => {
    describe('Mount', () => {
        let wrapper
        let mockAxios
        const theme = createTheme()
        beforeAll(() => {
            mockAxios = new MockAdapter(axios)

            mockAxios
                .onGet(`${REACT_APP_MOCK}/nationalities`)
                .reply(200, ['American', 'Thai', 'Other'])
            mockAxios
                .onGet(`${REACT_APP_MOCK}/country-codes`)
                .reply(200, ['+66', '+866', '+63'])
            mockAxios
                .onPost(
                    `${REACT_APP_API}/${REACT_APP_SUPPLIER}/personal-details`
                )
                .reply(200)
        })
        afterAll(() => {
            jest.clearAllMocks()
            mockAxios.reset()
            mockAxios.resetHistory()
        })

        beforeEach(() => {
            wrapper = mount(
                <Provider store={Store}>
                    <ThemeProvider theme={theme}>
                        <BrowserRouter>
                            <PersonalDetailsForm />
                        </BrowserRouter>
                    </ThemeProvider>
                </Provider>
            )
        })

        afterEach(() => {
            wrapper.unmount()
            jest.clearAllMocks()
        })

        it('Should render', () => {
            expect(wrapper.length).toEqual(1)
        })

        it('should handleRemove', () => {
            wrapper
                .find('SCAccordionForm')
                .props()
                .handleRemove({}, 0, [], jest.fn())

            wrapper.update()
            // assert that scmodal confirmation should open
            expect(wrapper.find('SCModal').props().openDialog).toBeTruthy()

            wrapper.find('SCModal').props().handleCancel()
            wrapper.update()
            // assert that when action confirmed it will close scmodal
            expect(wrapper.find('SCModal').props().openDialog).toBeFalsy()

            wrapper.find('SCModal').props().handleOk()
            wrapper.update()
            // assert that when action cancelled it will close scmodal
            expect(wrapper.find('SCModal').props().openDialog).toBeFalsy()
        })

        it('Should handle blur on changing first name', () => {
            const onBlurSpy = jest.spyOn(
                wrapper.find('[name="forms[0].firstNameEn"]').first().props(),
                'onBlur'
            )
            // En
            wrapper
                .find('[name="forms[0].firstNameEn"]')
                .first()
                .props()
                .onBlur({
                    target: {
                        name: 'forms[0].firstNameEn',
                        value: 'testfirstname',
                    },
                })
            expect(
                wrapper.find('[name="forms[0].firstNameEn"]').first().props()
            )
            expect(onBlurSpy).toBeCalled()

            // Th
            wrapper
                .find('[name="forms[0].firstNameTh"]')
                .first()
                .props()
                .onBlur({
                    target: {
                        name: 'forms[0].firstNameTh',
                        value: 'testfirstname',
                    },
                })
            expect(
                wrapper.find('[name="forms[0].firstNameTh"]').first().props()
            )
            expect(onBlurSpy).toBeCalled()
        })

        it('Should handle blur on changing last name', () => {
            const onBlurSpy = jest.spyOn(
                wrapper.find('[name="forms[0].lastNameEn"]').first().props(),
                'onBlur'
            )
            // En
            wrapper
                .find('[name="forms[0].lastNameEn"]')
                .first()
                .props()
                .onBlur({
                    target: {
                        name: 'forms[0].lastNameEn',
                        value: 'testfirstname',
                    },
                })
            expect(wrapper.find('[name="forms[0].lastNameEn"]').first().props())
            expect(onBlurSpy).toBeCalled()
            // Th
            wrapper
                .find('[name="forms[0].lastNameTh"]')
                .first()
                .props()
                .onBlur({
                    target: {
                        name: 'forms[0].lastNameTh',
                        value: 'สมชาย',
                    },
                })
            expect(wrapper.find('[name="forms[0].lastNameTh"]').first().props())
            expect(onBlurSpy).toBeCalled()
        })

        it('Should handle select nationality', () => {
            const onChangeSpy = jest.spyOn(
                wrapper.find('SCSelect[name="forms[0].nationality"]').props(),
                'onChange'
            )

            wrapper
                .find('SCSelect[name="forms[0].nationality"]')
                .props()
                .onBlur({
                    target: {
                        name: 'forms[0].nationality',
                        value: '',
                    },
                })

            wrapper
                .find('SCSelect[name="forms[0].nationality"]')
                .props()
                .onChange({
                    target: {
                        name: 'forms[0].nationality',
                        value: '',
                    },
                })
            wrapper.update()

            expect(onChangeSpy).toBeCalled()
        })

        it('Should handle additional field on thai nationality', () => {
            const nationalIdCardNoSpy = jest.spyOn(
                wrapper
                    .find('[name="forms[0].nationalIdCardNo"]')
                    .first()
                    .props(),
                'onBlur'
            )
            const laserCodeSpy = jest.spyOn(
                wrapper.find('[name="forms[0].laserCode"]').first().props(),
                'onBlur'
            )
            const passportNoSpy = jest.spyOn(
                wrapper.find('[name="forms[0].passportNo"]').first().props(),
                'onBlur'
            )
            wrapper
                .find('SCTextField[name="forms[0].nationalIdCardNo"]')
                .props()
                .onBlur({
                    target: {
                        name: 'forms[0].nationalIdCardNo',
                        value: 'none',
                    },
                })
            wrapper
                .find('SCLaserCode[name="forms[0].laserCode"]')
                .props()
                .onBlur({
                    target: {
                        name: 'forms[0].laserCode',
                        value: 'none',
                    },
                })
            wrapper
                .find('SCTextField[name="forms[0].passportNo"]')
                .props()
                .onBlur({
                    target: {
                        name: 'forms[0].passportNo',
                        value: 'none',
                    },
                })
            wrapper.update()

            expect(nationalIdCardNoSpy).toBeCalled()
            expect(laserCodeSpy).toBeCalled()
            expect(passportNoSpy).toBeCalled()
        })

        it('Should handle select birth date', () => {
            const onChangeSpy = jest.spyOn(
                wrapper
                    .find('SCDatePicker[name="forms[0].dateOfBirth"]')
                    .props(),
                'onChange'
            )

            const onBlurSpy = jest.spyOn(
                wrapper
                    .find('SCDatePicker[name="forms[0].dateOfBirth"]')
                    .props(),
                'onBlur'
            )

            wrapper
                .find('SCDatePicker[name="forms[0].dateOfBirth"]')
                .props()
                .onChange({
                    target: {
                        name: 'forms[0].dateOfBirth',
                        value: '01/01/2021',
                    },
                })
            wrapper
                .find('SCDatePicker[name="forms[0].dateOfBirth"]')
                .props()
                .onBlur({
                    target: {
                        name: 'forms[0].dateOfBirth',
                        value: '01/01/2021',
                    },
                })
            wrapper.update()

            expect(onChangeSpy).toBeCalled()
            expect(onBlurSpy).toBeCalled()
        })

        it('Should handle select country code', () => {
            const onChangeSpy = jest.spyOn(
                wrapper.find('SCSelect[name="forms[0].countryCode"]').props(),
                'onChange'
            )

            wrapper
                .find('SCSelect[name="forms[0].countryCode"]')
                .props()
                .onChange({
                    target: {
                        name: 'forms[0].countryCode',
                        value: '',
                    },
                })
            wrapper.update()

            expect(onChangeSpy).toBeCalled()
        })

        it('Should handle mobile number', () => {
            const onBlurSpy = jest.spyOn(
                wrapper
                    .find('SCTextField[name="forms[0].mobileNumber"]')
                    .props(),
                'onBlur'
            )

            wrapper
                .find('SCTextField[name="forms[0].mobileNumber"]')
                .props()
                .onBlur({
                    target: {
                        name: 'forms[0].mobileNumber',
                        value: '9217300107',
                    },
                })
            wrapper.update()

            expect(onBlurSpy).toBeCalled()
        })

        it('Should handle email address', () => {
            const onBlurSpy = jest.spyOn(
                wrapper
                    .find('SCTextField[name="forms[0].emailAddress"]')
                    .props(),
                'onBlur'
            )

            wrapper
                .find('SCTextField[name="forms[0].emailAddress"]')
                .props()
                .onBlur({
                    target: {
                        name: 'forms[0].emailAddress',
                        value: 'test@gmail.com',
                    },
                })
            wrapper.update()

            expect(onBlurSpy).toBeCalled()
        })

        it('Should handle job title', () => {
            const onBlurSpy = jest.spyOn(
                wrapper.find('SCTextField[name="forms[0].jobTitle"]').props(),
                'onBlur'
            )

            wrapper
                .find('SCTextField[name="forms[0].jobTitle"]')
                .props()
                .onBlur({
                    target: {
                        name: 'forms[0].jobTitle',
                        value: 'testing',
                    },
                })
            wrapper.update()

            expect(onBlurSpy).toBeCalled()
        })

        it('Should handle shares', () => {
            const onBlurSpy = jest.spyOn(
                wrapper
                    .find(
                        'SCTextField[name="forms[0].percentageOfAllocatedShares"]'
                    )
                    .props(),
                'onBlur'
            )

            wrapper
                .find(
                    'SCTextField[name="forms[0].percentageOfAllocatedShares"]'
                )
                .props()
                .onBlur({
                    target: {
                        name: 'forms[0].percentageOfAllocatedShares',
                        value: 'test@gmail.com',
                    },
                })
            wrapper.update()

            expect(onBlurSpy).toBeCalled()
        })

        it('Should handle add authorized director', () => {
            wrapper.find('#PDFAddAthorizedDirector').at(0).props().buttonClick()
            wrapper.update()

            expect(wrapper.exists('[name="forms[1].firstNameTh"]')).toBeTruthy()
        })

        it('Should handle form submit', () => {
            const onSubmitSpy = jest.spyOn(
                wrapper.find('Formik').props(),
                'onSubmit'
            )
            const data = {
                forms: [
                    {
                        firstNameTh: 'สมชาย',
                        lastNameTh: 'สมชาย',
                        nationality: 'Thai',
                        nationalIdCardNo: '3805840559749',
                        laserCode: '123',
                        passportNo: '123',
                        dateOfBirth: '01/01/1990',
                        countryCode: '+66',
                        mobileNumber: '09217300107',
                        emailAddress: 'test@gmail.com',
                        jobTitle: 'test',
                        percentageOfAllocatedShares: '20',
                    },
                    {
                        percentageOfAllocatedShares: '20',
                    },
                ],
            }
            wrapper.find('Formik').props().onSubmit(data, jest.fn())
            wrapper.update()
            expect(onSubmitSpy).toBeCalled()
        })
    })
})
