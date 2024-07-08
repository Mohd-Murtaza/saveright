# saveright

# Login Flow Project

This project implements a simple login flow using phone number verification and OTP (One-Time Password). Users can enter their phone number, receive an OTP via a modal dialog, enter the OTP on the OTP verification page, and upon successful verification, proceed to a welcome page.

## Folder Structure
    saveright/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── script.js
    ├── index.html
    ├── otp.html
    └── welcome.html

## Images
<img width="959" alt="image" src="https://github.com/Mohd-Murtaza/saveright/assets/112779948/de9fa6ef-dd1a-4765-9fdb-285c9d654252">
<br/>
<img width="959" alt="image" src="https://github.com/Mohd-Murtaza/saveright/assets/112779948/6162615b-e514-4be4-a216-e60c0a8d2424">
<br/>
<img width="959" alt="image" src="https://github.com/Mohd-Murtaza/saveright/assets/112779948/f4c5bb7b-1386-4957-9eac-82dc38756ba5">
<br/>
<img width="959" alt="image" src="https://github.com/Mohd-Murtaza/saveright/assets/112779948/83a7756e-f278-4f5f-bdff-92f91adccfbd">
<br/>
<img width="946" alt="image" src="https://github.com/Mohd-Murtaza/saveright/assets/112779948/3c4c861d-7ef6-4fe0-bd0e-df1114748479">
<br/>





## Features

- **Phone Number Verification:** Users can enter a 10-digit phone number to receive an OTP.
- **OTP Verification:** Users enter a 6-digit OTP to verify their phone number.
- **Responsive Design:** Designed to work well on various screen sizes using Bootstrap classes and custom CSS.
- **Error Handling:** Provides feedback for invalid inputs and displays error messages.
- **Loading Indicator:** Displays a loader while verifying OTP for better user experience.
- **Fireworks Effect:** When the user logs in successfully and reaches the welcome page/Home Page, Fireworks will play.

## Libraries Used

- **Bootstrap 4.5.2:** Used for responsive layout and styling.
  - CDN: [Bootstrap CDN](https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css)
- **SweetAlert2 10:** Used for custom modal dialogs for displaying OTP and error messages.
  - CDN: [SweetAlert2 CDN](https://cdn.jsdelivr.net/npm/sweetalert2@10)
- **jQuery 3.5.1:** Used for DOM manipulation and event handling.
  - CDN: [jQuery CDN](https://code.jquery.com/jquery-3.5.1.min.js)

## How to Use

1. Clone the repository.
2. Open `index.html` in your web browser to start the login flow.
3. Enter a valid 10-digit phone number and submit to receive an OTP.
4. Switch to `otp.html`, enter the received OTP, and verify.
5. Upon successful verification, you will be redirected to `welcome.html`.

## Deployed Link

https://saveright-murtaza.netlify.app/

## Customization

- You can customize the styling in `styles.css` to match your branding or design preferences.
- Modify `script.js` to add more features or enhance existing functionality based on your requirements.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests for any improvements or additional features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
