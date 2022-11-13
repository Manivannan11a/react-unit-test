/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render} from '@testing-library/react';
import FormComp from '.';

describe('Form Component', () => {
  it("renders form inputs", () => {
    const { getByTestId } = render(<FormComp />);
    const fname = getByTestId("fname");
    const lname = getByTestId("lname");
    const pnumber = getByTestId("pnumber");
    const loanPurpose = getByTestId("loanPurpose");
    const loanAmount = getByTestId("loanAmount");
    const termsAndCondition = getByTestId("termsAndCondition");

    expect(fname).toBeInTheDocument();
    expect(lname).toBeInTheDocument();
    expect(pnumber).toBeInTheDocument();
    expect(loanPurpose).toBeInTheDocument();
    expect(loanAmount).toBeInTheDocument();
    expect(termsAndCondition).toBeInTheDocument();
  });

  it('submit form with empty values', () => {
    const { getByTestId } = render(<FormComp />);
    const submit = getByTestId("submit");
    expect(submit.getAttribute('class')).toEqual("disabled");
  });

  it('submit form with filled values', () => {
    const { getByTestId } = render(<FormComp />);
    // console.log(props, "props");
    const fname = getByTestId("fname");
    const lname = getByTestId("lname");
    const pnumber = getByTestId("pnumber");
    const loanPurpose = getByTestId("loanPurpose");
    const loanAmount = getByTestId("loanAmount");
    const termsAndCondition = getByTestId("termsAndCondition");

    fireEvent.change(fname, { target: { name: 'fname', value: 'admin' } });
    fireEvent.change(lname, { target: { name: 'lname', value: 'admin' } });
    fireEvent.change(pnumber, { target: { name: 'pnumber', value: "9876543210" } });
    fireEvent.change(loanPurpose, { target: { name: 'loanPurpose', value: 'carLoan' } });
    fireEvent.change(loanAmount, { target: { name: 'loanAmount', value: "10000" } });
    fireEvent.click(termsAndCondition, { target: { name: 'termsAndCondition', value: true } });

    expect(fname.value).toEqual("admin");
    expect(lname.value).toEqual("admin");
    expect(pnumber.value).toEqual("9876543210");
    expect(loanPurpose.value).toEqual("carLoan");
    expect(loanAmount.value).toEqual("10000");
    expect(termsAndCondition.value).toEqual("true");
    const submit = getByTestId("submit");
    expect(submit.getAttribute('class')).toEqual("");
  });

  it('make empty value after change and check', async () => {
    const { getByTestId } = render(<FormComp />);

    fireEvent.change(getByTestId("fname"), { target: { name: 'fname', value: 'test' } });
    fireEvent.change(getByTestId("fname"), { target: { name: 'fname', value: '' } });
    fireEvent.change(getByTestId("lname"), { target: { name: 'lname', value: 'test' } });
    fireEvent.change(getByTestId("lname"), { target: { name: 'lname', value: '' } });
    fireEvent.change(getByTestId("pnumber"), { target: { name: 'pnumber', value: "9876543210" } });
    fireEvent.change(getByTestId("pnumber"), { target: { name: 'pnumber', value: "" } });
    fireEvent.change(getByTestId("loanPurpose"), { target: { name: 'loanPurpose', value: 'carLoan' } });
    fireEvent.change(getByTestId("loanPurpose"), { target: { name: 'loanPurpose', value: '' } });
    fireEvent.change(getByTestId("loanAmount"), { target: { name: 'loanAmount', value: "10000" } });
    fireEvent.change(getByTestId("loanAmount"), { target: { name: 'loanAmount', value: "" } });

    expect(getByTestId("fnameError")).toBeInTheDocument();
    expect(getByTestId("lnameError")).toBeInTheDocument();
    expect(getByTestId("pnumberError")).toBeInTheDocument();
    expect(getByTestId("loanPurposeError")).toBeInTheDocument();
    expect(getByTestId("loanAmountError")).toBeInTheDocument();
    expect(getByTestId("submit").getAttribute('class')).toEqual("disabled");
  });


})