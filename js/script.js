document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  const phoneForm = document.getElementById("phoneForm");
  const otpForm = document.getElementById("otpForm");
  const phoneNumberInput = document.getElementById("phoneNumber");
  const otpInputs = document.querySelectorAll(".otp-input");
  const phoneError = document.getElementById("phoneError");
  const otpError = document.getElementById("otpError");
  const loader = document.getElementById("loader");
  phoneForm?.addEventListener("submit", function (event) {
    event.preventDefault();
    const phoneNumber = phoneNumberInput.value;
    if (/^\d{10}$/.test(phoneNumber)) {
      fetch(`https://saveright.in/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isdCode: "+91", phone: phoneNumber }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            console.log(data);
            localStorage.setItem("userId", data.userId);
            container.style.display = "none";
            Swal.fire(
              "OTP Sent",
              "OTP sent to your mobile number",
              "success"
            ).then(() => {
              window.location.href = "otp.html";
            });
          } else {
            container.style.display = "block";
          }
        })
        .catch((error) => {
          console.log(error, "this is line no. 30");
        });
    } else {
      phoneNumberInput.classList.add("is-invalid");
      phoneError.classList.add("visible");
    }
  });
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (!/^\d*$/.test(input.value)) {
        input.value = "";
      } else if (input.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
      otpError.classList.remove("visible");
      input.classList.remove("is-invalid");
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Backspace" && input.value.length === 0 && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });
  otpForm?.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("otp very trigger");
    let otp = "";
    otpInputs.forEach((input) => (otp += input.value));
    const userId = localStorage.getItem("userId");
    console.log(userId, "line 61");
    if (/^\d{6}$/.test(otp)) {
      loader.style.display = "block";
      console.log("I'm in if condition");
      setTimeout(() => {
        loader.style.display = "none";
        console.log("I'm in settimeout");
        fetch(`https://saveright.in/auth/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: userId, otp: otp }),
        })
          .then((res) => {
            console.log("Response status:", res.status);
            console.log("Response headers:", res.headers);

            if (!res.ok) {
              return res.text().then((text) => {
                console.log("Raw response body:", text);
                try {
                  const json = text ? JSON.parse(text) : {};
                  return Promise.reject(json);
                } catch (error) {
                  return Promise.reject({
                    message: "Failed to parse response body",
                    text,
                  });
                }
              });
            }
            return res.json();
          })
          .then((data) => {
            console.log(data, "line no. 86");
            if (data.status == 500) {
                container.style.display = "none";
                Swal.fire(
                  "Bad Request",
                  "Oops! this is a bad request",
                  "error"
                ).then(() => {
                  container.style.display = "block";
                });
                otpInputs.forEach((input) => input.classList.add("is-invalid"));
            } else if (data.token) {
              window.location.href = "welcome.html";
            }
          })
          .catch((err) => {
            console.log(err, "line no. 89");
            container.style.display = "none";
              Swal.fire(
                "Invalid OTP",
                "Please enter the correct OTP",
                "error"
              ).then(() => {
                container.style.display = "block";
              });
              otpInputs.forEach((input) => input.classList.add("is-invalid"));
              if (err.status==500){
                  container.style.display = "none";
                  Swal.fire(
                    "Bad Request",
                    "Oops! this is a bad request",
                    "error"
                  ).then(() => {
                    container.style.display = "block";
                  });
                  otpInputs.forEach((input) => input.classList.add("is-invalid"));
              }
          });
        console.log("Request payload:", { userId: userId, otp: otp });
      }, 1000);
    } else {
      otpError.textContent = "Please enter a valid 6-digit OTP.";
      otpError.classList.add("visible");
    }
  });
});
