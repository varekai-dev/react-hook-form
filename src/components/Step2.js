import { FormControlLabel, Typography } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Form from "./Form";
import { Input } from "./Input";
import { MainContainer } from "./MainContainer";
import { PrimaryButton } from "./PrimaryButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import Checkbox from "@material-ui/core/Checkbox";
import parsePhoneNumberFromString from "libphonenumber-js";

const shema = yup.object().shape({
  email: yup
    .string()
    .email("Email should have correct format")
    .required("Email is required field"),
});

const Step2 = () => {
  const history = useHistory();
  const { register, handleSubmit, errors, watch } = useForm({
    mode: "onBlur",
    resolver: yupResolver(shema),
  });

  const hasPhone = watch("hasPhone");

  const normalizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber) {
      return value;
    }
    return phoneNumber.formatInternational();
  };

  const onSubmit = (data) => {
    history.push("/step3");
  };
  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        🦄 Step2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          id="email"
          type="email"
          label="Email"
          name="email"
          required
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <FormControlLabel
          control={
            <Checkbox name="hasPhone" inputRef={register} color="primary" />
          }
          label="Do you have a phone"
        />
        {hasPhone && (
          <Input
            ref={register}
            id="phoneNumber"
            type="tel"
            label="Phone number"
            name="phoneNumber"
            onChange={(e) =>
              (e.target.value = normalizePhoneNumber(e.target.value))
            }
          />
        )}
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

export default Step2;
