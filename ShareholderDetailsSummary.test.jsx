import React from "react";
import { mount } from "enzyme";
import ShareholderDetailsSummary from "./ShareholderDetailsSummary";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { Store } from "app/redux/Store";
import { useSelector } from "react-redux";


jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
  }));

describe("Behavior and Render Test", () => {
  let wrapper;
  const props = {
      item: [
          {
              firstNameEn: 'firstname',
              lastNameEn: 'lastname',
              firstNameTh: 'th',
              lastNameTh: 'th',
              nationality: 'Thailand',
              nationalIdCardNo: '',
              laserNumber: '',
              passportNo: '123123123',
              percentageOfAllocatedShares: '',
          },
          {
              firstNameEn: 'firstname',
              lastNameEn: 'lastname',
              firstNameTh: 'th',
              lastNameTh: 'th',
              nationality: 'other',
              nationalIdCardNo: '',
              laserNumber: '',
              passportNo: '123123123',
              percentageOfAllocatedShares: '',
          },
      ],
  }

  const theme = createTheme();

  beforeEach(() => {
    mockUseSelector()
    wrapper = mount(
      <Provider store={Store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <ShareholderDetailsSummary {...props} />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  });

  it("Should render", () => {
    expect(wrapper.length).toEqual(1);
  });
  function mockUseSelector() {
    useSelector.mockImplementation((callback) => {
      return callback({
        referrentialData: {
          nationalities: { id: 1, nameEn: "Greece", nameTh: "กรีซ" },
        },
      });
    });
  }
});
