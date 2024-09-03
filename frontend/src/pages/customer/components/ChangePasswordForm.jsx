import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const initialError = {
    currentPass: '',
    newPass: '',
    confirmPass: '',
    message: ''
};

const ChangePasswordForm = () => {
    const [formValues, setFormValues] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState(initialError);

    const { currentUser } = useSelector(state => state.user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = { ...initialError };
        if (!formValues.currentPassword) newErrors.currentPass = 'Current Password is required';
        if (!formValues.newPassword) newErrors.newPass = 'New Password is required';
        if (!formValues.confirmPassword) newErrors.confirmPass = 'Confirm Password is required';
        if (formValues.newPassword !== formValues.confirmPassword) {
            newErrors.message = 'New password and confirmation do not match';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (validationErrors.message || validationErrors.currentPass || validationErrors.newPass || validationErrors.confirmPass) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.patch(
                `${process.env.REACT_APP_BASE_URL}/updatePassword/${currentUser._id}`,
                { currentPassword: formValues.currentPassword, newPassword: formValues.newPassword },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${currentUser.token}`
                    }
                }
            );

            if (response.status === 200) {
                setFormValues({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                setErrors(initialError);
                alert('Password changed successfully');
            } else {
                setErrors({ ...errors, message: response.data.message || 'An error occurred' });
                alert(errors.message);
            }
        } catch {
            setErrors({ ...errors, message: 'Failed to change password' });
        }
    };

    return (
        <FormContainer>
            <Heading>Change Password</Heading>
            {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => (
                        <Grid item xs={12} key={field}>
                            <TextField
                                required
                                id={field}
                                name={field}
                                label={capitalizeFirstLetter(field.replace(/([A-Z])/g, ' $1'))}
                                fullWidth
                                autoComplete={`${field}-line1`}
                                variant="standard"
                                type="password"
                                value={formValues[field]}
                                onChange={handleChange}
                                error={!!errors[`${field}Error`]}
                                helperText={errors[`${field}Error`]}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        sx={{ mt: 3, ml: 1 }}
                        type='submit'
                    >
                        Update Password
                    </Button>
                </Box>
            </form>
        </FormContainer>
    );
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default ChangePasswordForm;

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Heading = styled.h3`
  text-align: center;
  margin-bottom: 30px;
  font-weight: 500;
`;

const ErrorMessage = styled.p`
  color: red;
`;
