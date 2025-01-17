const yup = require('yup');

async function validateUser(userData) {
  const schema = yup.object().shape({
    email: yup.string().email().required('Must be a valid email'),
    password: yup.string().min(8, "Oga your password dey too short").max(255).required('Must be at least 8 characters long')
    // other fields...
  });

  try {
    const data = await schema.validate(userData);
    console.log(data);  // If validation passes, log the data
 
} catch (err) {
    console.log(err.errors)
    // Return the first error message
    return err.errors;  // Corrected the access to errors array

  }
}


async function validatelogin(loginData) {
  const schema = yup.object().shape({
    email: yup.string().email().required('Must be a valid email'),
    password: yup.string().required('Password is required'),
    
  });

  try {
    const data = await schema.validate(loginData);
    console.log(data);  // If validation passes, log the data
 
} catch (err) {
    console.log(err.errors)
    // Return the first error message
    return err.errors;  // Corrected the access to errors array

  }
}

module.exports = {
  validateUser,
  validatelogin
};
