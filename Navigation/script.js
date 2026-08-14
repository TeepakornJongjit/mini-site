// ==================== Grouped-digit formatting ====================
function formatGroupedDigits(rawValue, groupLengths) {
    const digits = rawValue.replace(/\D/g, "").slice(
        0,
        groupLengths.reduce((sum, n) => sum + n, 0)
    );
    let out = "";
    let index = 0;
    groupLengths.forEach((len) => {
        const part = digits.slice(index, index + len);
        if (part.length === 0) return;
        out += (out.length > 0 ? "-" : "") + part;
        index += len;
    });
    return out;
}
function attachGroupedDigitFormatting(inputId, groupLengths) {
    const input = document.getElementById(inputId);
    input.addEventListener("input", () => {
        input.value = formatGroupedDigits(input.value, groupLengths);
    });
}
attachGroupedDigitFormatting("shopPhone", [3, 3, 4]);
attachGroupedDigitFormatting("MobileNumber", [3, 3, 4]); // 000-000-0000
attachGroupedDigitFormatting("ownerPhone", [1, 4, 5, 2, 1]); // 0-0000-00000-00-0
// ==================== Date of birth dropdowns ====================
const dobDay = document.getElementById("dobDay");
for (let day = 1; day <= 31; day++) {
    const option = document.createElement("option");
    option.value = String(day);
    option.textContent = String(day);
    dobDay.appendChild(option);
}
const dobMonth = document.getElementById("dobMonth");
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
monthNames.forEach((name, i) => {
    const option = document.createElement("option");
    option.value = String(i + 1);
    option.textContent = name;
    dobMonth.appendChild(option);
});
const dobYear = document.getElementById("dobYear");
const currentYear = new Date().getFullYear();
for (let year = currentYear - 18; year >= currentYear - 80; year--) {
    const option = document.createElement("option");
    option.value = String(year);
    option.textContent = String(year);
    dobYear.appendChild(option);
}
// ==================== Switch (Halal certified) ====================
// JS-driven toggle
const halalSwitch = document.getElementById("halal-switch");
const halalThumb = document.getElementById("halal-switch-thumb");
const halalInput = document.getElementById("halalCertifiedInput");
halalSwitch.addEventListener("click", () => {
    const isOn = halalSwitch.getAttribute("aria-checked") === "true";
    halalSwitch.setAttribute("aria-checked", String(!isOn));
    halalSwitch.classList.toggle("bg-green-500", !isOn);
    halalSwitch.classList.toggle("bg-gray-300", isOn);
    halalThumb.classList.toggle("translate-x-5", !isOn);
    halalThumb.classList.toggle("translate-x-1", isOn);
    // Keep the real (hidden) checkbox in sync, so "halalCertified"
    // actually appears in the form's submitted data.
    halalInput.checked = !isOn;
});
const vegetarianSwitch = document.getElementById("vegetarian-switch");
const vegetarianThumb = document.getElementById("vegetarian-switch-thumb");
const vegetarianInput = document.getElementById("vegetarianInput");
vegetarianSwitch.addEventListener("click", () => {
    const isOn = vegetarianSwitch.getAttribute("aria-checked") === "true";
    vegetarianSwitch.setAttribute("aria-checked", String(!isOn));
    vegetarianSwitch.classList.toggle("bg-green-500", !isOn);
    vegetarianSwitch.classList.toggle("bg-gray-300", isOn);
    vegetarianThumb.classList.toggle("translate-x-5", !isOn);
    vegetarianThumb.classList.toggle("translate-x-1", isOn);
    // Keep the real (hidden) checkbox in sync, so "vegetarian"
    // actually appears in the form's submitted data.
    vegetarianInput.checked = !isOn;
});
// ==================== Form submit -> Dialog/Modal ====================
// Clicking "Submit Application"
const vendorForm = document.getElementById("vendor-form");
const confirmBackdrop = document.getElementById("confirm-backdrop");
const confirmDialog = document.getElementById("confirm-dialog");
const confirmActions = document.getElementById("confirm-dialog-actions");
const confirmSpinner = document.getElementById("confirm-spinner");
const confirmProgressWrap = document.getElementById("confirm-progress-wrap");
const confirmProgressBar = document.getElementById("confirm-progress-bar");
const confirmProgressPercent = document.getElementById("confirm-progress-percent");
const confirmCancel = document.getElementById("confirm-cancel");
const confirmSubmit = document.getElementById("confirm-submit");

function openConfirmDialog() {
    confirmBackdrop.classList.remove("opacity-0", "pointer-events-none");
    confirmDialog.classList.remove("opacity-0", "pointer-events-none");
    confirmSubmit.focus();
}
function closeConfirmDialog() {
    confirmBackdrop.classList.add("opacity-0", "pointer-events-none");
    confirmDialog.classList.add("opacity-0", "pointer-events-none");
    confirmActions.classList.remove("hidden");
    confirmSpinner.classList.add("hidden");
    confirmSpinner.classList.remove("flex");
    confirmProgressWrap.classList.add("hidden");
    confirmProgressBar.style.width = "0%";
    confirmProgressPercent.textContent = "0%";
}
vendorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!vendorForm.checkValidity()) {
        vendorForm.reportValidity();
        return;
    }
    openConfirmDialog();
});
confirmCancel.addEventListener("click", closeConfirmDialog);
confirmBackdrop.addEventListener("click", closeConfirmDialog);
confirmSubmit.addEventListener("click", () => {
    // Step 1: Spinner — indeterminate, short. Swap the action
    confirmActions.classList.add("hidden");
    confirmSpinner.classList.remove("hidden");
    confirmSpinner.classList.add("flex");
    setTimeout(() => {
        // Step 2: Progress Bar — determinate, longer.
        confirmSpinner.classList.add("hidden");
        confirmSpinner.classList.remove("flex");
        confirmProgressWrap.classList.remove("hidden");
        let percent = 0;
        const progressInterval = setInterval(() => {
            percent += 10;
            confirmProgressBar.style.width = percent + "%";
            confirmProgressPercent.textContent = percent + "%";
            if (percent >= 100) {
                clearInterval(progressInterval);
                setTimeout(finishSubmission, 300);
            }
        }, 220); // ~10 steps x 220ms ≈ 2.2s total — comfortably over the ">2 seconds" threshold
    }, 800); // ~800ms of indeterminate "preparing" before we have real progress to show
});
function finishSubmission() {
    closeConfirmDialog();
    vendorForm.reset();
    // reset() unchecks the hidden checkbox but doesn't touch the
    // visual switch button — sync it back to "off" manually.
    halalSwitch.setAttribute("aria-checked", "false");
    halalSwitch.classList.add("bg-gray-300");
    halalSwitch.classList.remove("bg-gray-500");
    halalThumb.classList.add("translate-x-1");
    halalThumb.classList.remove("translate-x-5");
    showToast("Application submitted successfully!");
}
// Escape closes the confirm dialog too, same convention as the drawer
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !confirmDialog.classList.contains("opacity-0")) {
        closeConfirmDialog();
    }
});
// ==================== Snackbar/Toast ====================
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");
const toastClose = document.getElementById("toast-close");
let toastTimeoutId = null;
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.remove("opacity-0", "translate-y-4", "pointer-events-none");
    // Low-priority means it doesn't wait for the user — it leaves
    // on its own after a few seconds, unlike the Dialog which
    // waited for an explicit choice.
    clearTimeout(toastTimeoutId);
    toastTimeoutId = setTimeout(hideToast, 4000);
}
function hideToast() {
    toast.classList.add("opacity-0", "translate-y-4", "pointer-events-none");
}
toastClose.addEventListener("click", () => {
    clearTimeout(toastTimeoutId);
    hideToast();
});