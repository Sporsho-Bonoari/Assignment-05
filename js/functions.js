function handleDonation(donationInputId, totalDonationId, donationTitleId) {
  let donationAmount = getDonationAmount(donationInputId);

  // Check if the donation amount is valid
  if (donationAmount <= 0) {
    // Don't show the modal or perform any actions if the amount is invalid
    return;
  }

  let totalDonateAmount = getTotalDonateAmount(totalDonationId, donationAmount);
  let userBdtAmount = getUserBdtNumber("user-bdt");

  if (userBdtAmount >= donationAmount) {
    updateUserBdtAmount(userBdtAmount, donationAmount);
    document.getElementById(
      totalDonationId
    ).innerText = `${totalDonateAmount} BDT`;
    const donationTitle = document.getElementById(donationTitleId).innerText;
    addToHistory(donationAmount, donationTitle);
    showModal(`You have successfully donated for ${donationTitle}!`);
  } else {
    alert("Insufficient funds");
  }
}

function showModal(message) {
  const modal = document.getElementById("success-modal");
  const modalMessage = document.getElementById("modal-message");
  modalMessage.innerText = message;
  modal.classList.remove("hidden");
}
document
  .getElementById("close-modal-btn")
  .addEventListener("click", function () {
    const modal = document.getElementById("success-modal");
    modal.classList.add("hidden");
  });

function addToHistory(donateAmountNumber, donationTitle) {
  const historyContainer = document.getElementById("history-container");
  const donationDiv = document.createElement("div");
  donationDiv.style.border = "2px solid #B4F461";
  donationDiv.style.padding = "10px";
  donationDiv.style.marginBottom = "10px";
  donationDiv.style.borderRadius = "8px";
  donationDiv.style.backgroundColor = "#f9f9f9";
  const donationInfo = document.createElement("p");
  donationInfo.innerText = `${donateAmountNumber} taka donated to ${donationTitle}`;
  const dateParagraph = document.createElement("p");
  const currentDate = new Date();
  const formattedDate = currentDate.toString();
  dateParagraph.innerText = `Date: ${formattedDate}`;
  donationDiv.appendChild(donationInfo);
  donationDiv.appendChild(dateParagraph);
  historyContainer.appendChild(donationDiv);
}

function getDonationAmount(inputId) {
  let donateAmount = document.getElementById(inputId).value;
  let donateAmountNumber = parseFloat(donateAmount);
  if (isNaN(donateAmountNumber) || donateAmountNumber <= 0) {
    alert("Please enter a valid donation amount");
    return 0;
  }
  return donateAmountNumber;
}

function getTotalDonateAmount(donationId, newDonation) {
  let currentDonateAmount = parseFloat(
    document.getElementById(donationId).innerText
  );
  return currentDonateAmount + newDonation;
}

function getUserBdtNumber(bdtId) {
  let userBdt = parseFloat(document.getElementById(bdtId).innerText);
  return userBdt;
}

function updateUserBdtAmount(userBdtAmount, donationAmount) {
  let updatedUserBdtAmount = userBdtAmount - donationAmount;
  document.getElementById("user-bdt").innerText = `${updatedUserBdtAmount} BDT`;
}

function showSectionById(id) {
  document.getElementById("add-donation-form").classList.add("hidden");
  document.getElementById("add-history-form").classList.add("hidden");
  document.getElementById(id).classList.remove("hidden");
}
function toggleActiveButton(activeButtonId, inactiveButtonId) {
  document.getElementById(inactiveButtonId).classList.remove("active-btn");
  document.getElementById(activeButtonId).classList.add("active-btn");
}
