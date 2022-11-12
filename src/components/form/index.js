import React, { useState, useCallback } from "react";
import { isEmpty, isValidAmount, isValidfName, isValidlName, isValidphone } from "../../Helper/formValidator";

const FormComp = () => {
  const [formValues, setFormValues] = React.useState({
    fname: { value: "", validateField: isValidfName, isValid: true },
    lname: { value: "", validateField: isValidlName, isValid: true },
    pnumber: { value: "", validateField: isValidphone, isValid: true },
    loanPurpose: { value: "", validateField: isValidlName, isValid: true },
    loanAmount: { value: 0, validateField: isValidAmount, isValid: true },
    termsAndCondition: { value: false, validateField: isEmpty, isValid: true }
  });

  const inputonChangeHandler = useCallback((e) => {
    // console.log(e.target.name, e.target.checked, "e");
    const isValid = e.target.name === "termsAndCondition" ? e.target.checked : formValues[e.target.name].validateField(e.target.value)
    // console.log(isValid, "formValues");
    setFormValues({
      ...formValues,
      [e.target.name]: { ...formValues[e.target.name], value: e.target.checked, isValid }
    })
  }, [formValues])

  const isFormValid = useCallback(() => Object.keys(formValues).filter((item) => !formValues[item].validateField(formValues[item].value)).length === 0, [formValues]);

  const validateForm = useCallback(() => {
    const tempFormValues = {...formValues};

    for(let field in tempFormValues) {
      tempFormValues[field].isValid = tempFormValues[field].validateField(tempFormValues[field].value);
    }

    setFormValues(tempFormValues);
  }, [formValues]);

  const onSubmitHandler = useCallback((e) => {
    e.preventDefault();
    if(validateForm() && isFormValid()) {
      
    }
  }, [formValues]);

  const FormError = ({ name }) => !formValues[name].isValid && <span className="error">Please Enter Valid {name}</span>
  // console.log(formValues, "isFormValid");

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="form-control">
        <label>First name:</label><br />
        <input type="text" id="fname" name="fname" value={formValues.fname.value} onChange={inputonChangeHandler} />
        <FormError name="fname" />
      </div>
      <div className="form-control">
        <label>Last name:</label><br />
        <input type="text" id="lname" name="lname" value={formValues.lname.value} onChange={inputonChangeHandler} />
        <FormError name="lname" />
      </div>
      <div className="form-control">
        <label>Phone number:</label><br />
        <input type="text" id="pnumber" name="pnumber" value={formValues.pnumber.value} onChange={inputonChangeHandler} />
        <FormError name="pnumber" />
      </div>
      <div className="form-control">
        <label>Loan Purpose:</label><br />
        <select id="loanPurpose" name="loanPurpose" value={formValues.loanPurpose.value} onChange={inputonChangeHandler} >
        <option value="">Select</option>
          <option value="carLoan">Car Loan</option>
          <option value="homeLoan">Home Loan</option>
        </select>
        <FormError name="loanPurpose" />
      </div>
      <div className="form-control">
        <label>Loan Amount:</label><br />
        <input id="number" min={0} id="loanAmount" name="loanAmount" value={formValues.loanAmount.value} onChange={inputonChangeHandler} />
        <FormError name="loanAmount" />
      </div>
      <div className="form-control">
        <label>
          <input type="checkbox" id="termsAndCondition" name="termsAndCondition" value={formValues.termsAndCondition.value} onClick={inputonChangeHandler} /> Terms & Condition</label>
      </div>
      <input type="submit" id="submit" value="Submit" className={!isFormValid() ? 'disabled' : ''} />
    </form>
  )
}

export default FormComp;