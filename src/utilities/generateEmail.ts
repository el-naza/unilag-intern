
export const generateEmailHTML = (args) => {
  console.log('Generating email, OTP from context:', args?.req?.context);

  return `
    <!doctype html>
    <html>
      <body>
        <h1>PASSWORD RESET OTP</h1>
        <p>Hello, ${args?.user.email}!</p>
        <p>Use the OTP below to reset your password.</p>
        <p>
          ${args?.req?.context?.otp}
        </p>
      </body>
    </html>
  `;
};
