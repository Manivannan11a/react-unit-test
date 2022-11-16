import { useState, useCallback } from "react";
import { TextField, FormControl, MenuItem, NativeSelect} from '@mui/material';
import { isEmpty, isValidAmount, isValidfName, isValidlName, isValidphone } from "../../Helper/formValidator";


const CTextField = ({ type, name, value, onChange }) => (
  <TextField type={type} name={name} value={value} onChange={onChange} variant="outlined" inputProps={{
    "data-testid": name,
}} />
)

const FormComp = () => {
  const [formValues, setFormValues] = useState({
    fname: { value: "", validateField: isValidfName, isValid: true },
    lname: { value: "", validateField: isValidlName, isValid: true },
    pnumber: { value: "", validateField: isValidphone, isValid: true },
    loanPurpose: { value: "", validateField: isValidlName, isValid: true },
    loanAmount: { value: 0, validateField: isValidAmount, isValid: true },
    termsAndCondition: { value: false, validateField: isEmpty, isValid: true }
  });

  const inputonChangeHandler = useCallback((e) => {
    // console.log(e.target.name, e.target.checked, e, "e");
    const value = e.target.name === "termsAndCondition" ? e.target.checked : e.target.value;
    const isValid = e.target.name === "termsAndCondition" ? value : formValues[e.target.name].validateField(value)
    // console.log(isValid, "formValues");
    setFormValues({
      ...formValues,
      [e.target.name]: { ...formValues[e.target.name], value: value, isValid }
    })
  }, [formValues])

  const isFormValid = useCallback(() => Object.keys(formValues).filter((item) => !formValues[item].validateField(formValues[item].value)).length === 0, [formValues]);

  const validateForm = useCallback(() => {
    const tempFormValues = { ...formValues };

    for (let field in tempFormValues) {
      tempFormValues[field].isValid = tempFormValues[field].validateField(tempFormValues[field].value);
    }

    setFormValues(tempFormValues);
  }, [formValues]);

  const onSubmitHandler = useCallback((e) => {
    e.preventDefault();
    if (validateForm() && isFormValid()) {

    }
  }, [formValues]);

  const FormError = ({ name }) => !formValues[name].isValid && <span data-testid={`${name}Error`} className="error">Please Enter Valid {name}</span>
  // console.log(formValues, "isFormValid");

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="form-control">
        <label>First name:</label><br />
        <CTextField type="text" data-testid="fname" name="fname" value={formValues.fname.value} onChange={inputonChangeHandler} />
        <FormError data-testid="fnameError" name="fname" />
      </div>
      <div className="form-control">
        <label>Last name:</label><br />
        <CTextField type="text" data-testid="lname" name="lname" value={formValues.lname.value} onChange={inputonChangeHandler} />
        <FormError data-testid="lnameError" name="lname" />
      </div>
      <div className="form-control">
        <label>Phone number:</label><br />
        <CTextField type="text" data-testid="pnumber" name="pnumber" value={formValues.pnumber.value} onChange={inputonChangeHandler} />
        <FormError data-testid="pnumberError" name="pnumber" />
      </div>
      <div className="form-control">
        <label>Loan Purpose:</label><br />
        <FormControl fullWidth>
          {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
          <NativeSelect
            name="loanPurpose" value={formValues.loanPurpose.value} onChange={inputonChangeHandler}
            inputProps={{
              name: 'loanPurpose',
              "data-testid": "loanPurpose"
            }}
            variant="outlined"
          >
            <option value="carLoan">Car Loan</option>
            <option value="homeLoan">Home Loan</option>
            <option value="personalLoan">Personal Loan</option>
          </NativeSelect>
        </FormControl>
        <FormError data-testid="loanPurposeError" name="loanPurpose" />
      </div>
      <div className="form-control">
        <label>Loan Amount:</label><br />
        <CTextField type="number" min={0} data-testid="loanAmount" name="loanAmount" value={formValues.loanAmount.value} onChange={inputonChangeHandler} />
        <FormError data-testid="loanAmountError" name="loanAmount" />
      </div>
      <div className="form-control">
        <label>
          <input type="checkbox" data-testid="termsAndCondition" name="termsAndCondition" value={formValues.termsAndCondition.value} onClick={inputonChangeHandler} /> Terms & Condition</label>
      </div>
      <input type="submit" data-testid="submit" value="Submit" className={!isFormValid() ? 'disabled' : ''} />
    </form>
  )
}

export default FormComp;