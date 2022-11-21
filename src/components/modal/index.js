import React, { useState, useCallback } from "react";
import {
  isEmpty,
  isValidAmount,
  isValidfName,
  isValidlName,
  isValidphone,
} from "../../Helper/formValidator";

import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
// import axios from 'axios';

const CTextField = ({ type, name, value, onChange }) => (
  <TextField type={type} name={name} value={value} onChange={onChange} variant="outlined" inputProps={{
    "data-testid": name,
  }} />
)
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const initFormState = {
  fname: { value: "", validateField: isValidfName, isValid: true },
  lname: { value: "", validateField: isValidlName, isValid: true },
  pnumber: { value: "", validateField: isValidphone, isValid: true },
  loanPurpose: { value: "", validateField: isValidlName, isValid: true },
  loanAmount: { value: 0, validateField: isValidAmount, isValid: true },
  termsAndCondition: { value: false, validateField: isEmpty, isValid: true },
};
export default function Modalfunction() {
  const [open, setOpen] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmitHandler = () => {
    // axios.post('http://localhost:3001/applyloan')
    //   .then(res => {
    //     if (res.status === 200)
    //       console.log("Loan application Submitted")
    //     else
    //       Promise.reject()
    //   })
    //   .catch(err => alert(err))
    // setTimeout(10000)
    // validateForm();
    // if (isFormValid()) {
    //   setFormValues({ ...initFormState });
    //   setOpen(false);
    // }
  };

  //Customize validation
  const [formValues, setFormValues] = useState({ ...initFormState });

  const inputonChangeHandler = useCallback(
    (e) => {
      // console.log(e.target.name, e.target.checked, "e");
      const value =
        e.target.name === "termsAndCondition"
          ? e.target.checked
          : e.target.value;
      const isValid =
        e.target.name === "termsAndCondition"
          ? value
          : formValues[e.target.name].validateField(value);
      // console.log(isValid, "formValues");
      setFormValues({
        ...formValues,
        [e.target.name]: {
          ...formValues[e.target.name],
          value: value,
          isValid,
        },
      });
    },
    [formValues]
  );

  const isFormValid = useCallback(
    () =>
      Object.keys(formValues).filter(
        (item) => !formValues[item].validateField(formValues[item].value)
      ).length === 0,
    [formValues]
  );

  const validateForm = useCallback(() => {
    const tempFormValues = { ...formValues };

    for (let field in tempFormValues) {
      tempFormValues[field].isValid = tempFormValues[field].validateField(
        tempFormValues[field].value
      );
    }

    setFormValues(tempFormValues);
  }, [formValues]);

  // for select purpose of loan
  const [POL, setPOL] = React.useState("");
  console.log(formValues);
  const handleChange = (event) => {
    setPOL(event.target.value);
    setIsChecked(!isChecked);
  };
  const numberValidation = (e) => {
    e.target.value.replace(/[^0-9]/g, "");
    console.log(e.target.value);
  };

  const FormError = ({ name }) =>
    !formValues[name].isValid && (
      <span data-testid={`${name}Error`} className="error text-danger">
        Please Enter Valid {name}
      </span>
    );
  // console.log(formValues, "isFormValid");

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} data-testid="openModal">
        click to apply
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <strong> LOAN PURPOSE</strong>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom component="div">
            <div className="row">
              <div className="col-6">
                <CTextField
                  id="outlined-firstname-input"
                  label="First"
                  type="text"
                  name="fname"
                  autoComplete="firstname"
                  size="small"
                  data-testid="fname"
                  inputProps={{ "data-testid": "fname" }}
                  value={formValues.fname.value}
                  onChange={inputonChangeHandler}
                />
                <FormError data-testid="fnameError" name="fname" />
              </div>

              <div className="col-6">
                <CTextField
                  id="outlined-lastname-input"
                  label="Last Name"
                  type="text"
                  name="lname"
                  autoComplete="lastname"
                  size="small"
                  data-testid="lname"
                  value={formValues.lname.value}
                  onChange={inputonChangeHandler}
                />
                <FormError data-testid="lnameError" name="lname" />
              </div>
            </div>
            <div className=" row mt-3 mx-auto ">
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Purpose Of Loan
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                data-testid="loanPurpose"
                onChange={inputonChangeHandler}
                inputProps={{
                  name: "loanPurpose",
                  id: "loanPurpose",
                }}
              >
                <option value="">Please select</option>
                <option value="Ten">Ten</option>
                <option value="Twenty">Twenty</option>
                <option value="Thirty">Thirty</option>
              </NativeSelect>
              <FormError data-testid="loanPurposeError" name="loanPurpose" />
            </div>

            <div className="row mt-3 mx-auto">
              <CTextField
                id="outlined-amount-input"
                label="Amount Of Loan"
                type="number"
                autoComplete="amount of loan"
                size="small"
                min={0}
                data-testid="loanAmount"
                name="loanAmount"
                value={formValues.loanAmount.value}
                onChange={inputonChangeHandler}
              />
              <FormError data-testid="loanAmountError" name="loanAmount" />
            </div>
            <div className="row mt-3 mx-auto">
              <CTextField
                onInput={numberValidation}
                id="outlined-mobile-input"
                label="Mobile Number"
                type="text"
                maxlength={10}
                autoComplete="Mobile Number"
                size="small"
                data-testid="pnumber"
                name="pnumber"
                value={formValues.pnumber.value}
                onChange={inputonChangeHandler}
              />
              <FormError data-testid="pnumberError" name="pnumber" />
            </div>

            <FormGroup className="mt-2">
              <FormControlLabel
                control={
                  <Checkbox
                    required
                    data-testid="termsAndCondition"
                    name="termsAndCondition"
                    value={formValues.termsAndCondition.value}
                    onClick={inputonChangeHandler}
                  />
                }
                label={
                  <small className="text-muted">
                    "I hereby authorize BMS and/or its representatives to call
                    me, email me, or SMS me with reference to my loan
                    application. This consent will supersede any registration
                    for any Do Not Call (DNC) / National Do Not Call (NDNC). *"
                  </small>
                }
              />
            </FormGroup>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            data-testid="submit"
            onClick={onSubmitHandler}
            disabled={!isFormValid()}
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>


  );
}