export const welcomeEmailHTML = (student) => {
  console.log('Welcome email')

  return `
    <!doctype html>
    <html>
      <body>
        <h1>PASSWORD RESET OTP</h1>
        <p>Hello, ${student.firstName}!</p>
        <p>Welcome to the platform. Use your matric number to login.</p>
      </body>
    </html>
  `
}
