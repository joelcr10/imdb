  // Dom elements
  let form = document.querySelector("form");
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");

  // Event listener to submit form
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleInput();
  });

  // What to do with inputs ?
  function handleInput() {
    // Values from dom elements ( input )
    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();

    // Checking for email
    if (emailValue === "") {
      setErrorFor(email, "Email cannot be blank");
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, "Email is not valid");
    } else {
      setSuccessFor(email);
    }

    // Checking for password
    if (passwordValue === "") {
      setErrorFor(password, "Password cannot be blank");
    } else if (passwordValue.length < 6 || passwordValue.length > 30) {
      setErrorFor(password, "Password length should be between 6 and 30");
    } else {
      setSuccessFor(password);
    }

  }

  // If there is some error, than what we want to do with input ?
  function setErrorFor(input, message) {
    let formControl = input.parentElement;
    formControl.className = "form-control error";
    let small = formControl.querySelector("small");
    small.innerText = message;
  }

  // If there is no error, than what we want to do with input ?
  function setSuccessFor(input) {
    let formControl = input.parentElement;
    formControl.className = "form-control success";
  }

  // To check if email is valid or not ?
  function isEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }




