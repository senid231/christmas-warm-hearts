window.onload = function(){
  // request reCaptch token for current action
  function applyReCaptcha(fn) {
    const rekey = document.getElementById("recaptcha_site_key").value;
    grecaptcha.ready(function() {
      grecaptcha.execute(rekey, {action: 'submit'}).then(function(token) {
        document.getElementById("recaptcha_token").value = token;

        fn();
      });
    });
  }

  const formElem = document.getElementById("form_letter")
  const pbButton = document.getElementById("show_pb_number")
  const euButton = document.getElementById("show_eu_number")

  let pbButtonClicked = false;
  let euButtonClicked = false;

  formElem.onsubmit = (e) => {
    e.preventDefault();

    applyReCaptcha(function() {
      document.getElementById("letter-button").disabled = true;
      var url = formElem.getAttribute("action");
      var data =  new FormData(formElem);
      data.append("submit", "Submit");

      fetch(url, {
	      method: 'POST', body: data
      }).then((response) => {
        if (response.status >= 400 && response.status < 600) {
          document.getElementById("error_container").style.display = "block";
        } else {
          document.getElementById("letter_front_side").style.display = "none";
          document.getElementById("letter_back_side").style.display = "block";
        }
      }).catch((error) => {
        alert(error)
      });
    });
  };

  if (pbButton) {
    pbButton.onclick = function () {
      if (pbButtonClicked) {
        return true
      }
  
      pbButton.innerHTML = "5168 7520 1327 7994";
      pbButtonClicked = true;
    }
  }

  euButton.onclick = function () {
    if (euButtonClicked) {
      return true
    }

    euButton.innerHTML = `
    Account holder: Evghenii Melnic<br>
    IBAN: BE16967185901674<br>
    Reference: Charity Warm hearts`;
    euButtonClicked = true;
  }
};
