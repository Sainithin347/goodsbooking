document.addEventListener('DOMContentLoaded', function () {
    const bookingForm = document.querySelector('.booking-form');
    const priceInput = document.getElementById('price');
    const vehicleTypeSelect = document.getElementById('vehicle_type');
    const pickupLocationInput = document.getElementById('pickup_location_input');
    const destinationInput = document.getElementById('destination_input');
    const phoneNumberInput = document.getElementById('phone_number'); // Updated ID
    const otpInput = document.getElementById('otp'); // Updated ID

    const vehiclePrices = {
        'Flight': 85000,
        'Lorry': 30000,
        'Ship': 60000,
        'Train': 70000
    };

    vehicleTypeSelect.addEventListener('change', function () {
        const selectedVehicle = vehicleTypeSelect.value;
        priceInput.value = vehiclePrices[selectedVehicle] || 'N/A';
    });

    pickupLocationInput.addEventListener('input', function () {
        const searchTerm = pickupLocationInput.value;
        const suggestionsContainer = document.getElementById('pickup_suggestions');
        getSuggestions(searchTerm, suggestionsContainer);
    });

    destinationInput.addEventListener('input', function () {
        const searchTerm = destinationInput.value;
        const suggestionsContainer = document.getElementById('destination_suggestions');
        getSuggestions(searchTerm, suggestionsContainer);
    });

    function getSuggestions(searchTerm, suggestionsContainer) {
        if (searchTerm.trim() === '') {
            suggestionsContainer.innerHTML = '';
            return;
        }

        const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchTerm)}&format=json&limit=5`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                suggestionsContainer.innerHTML = '';
                data.forEach(item => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('autocomplete-suggestion');
                    suggestionItem.textContent = item.display_name;
                    suggestionItem.addEventListener('click', () => {
                        pickupLocationInput.value = item.display_name;
                        destinationInput.value = item.display_name;
                        suggestionsContainer.innerHTML = '';
                    });
                    suggestionsContainer.appendChild(suggestionItem);
                });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }

    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const pickupLocation = pickupLocationInput.value;
        const destination = destinationInput.value;
        const date = document.getElementById('date').value;
        const vehicleType = vehicleTypeSelect.value;
        const phoneNumber = phoneNumberInput.value; // Get phone number
        const otp = otpInput.value; // Get OTP
        const price = priceInput.value;

        console.log('Booking Details:');
        console.log('Name:', name);
        console.log('Phone Number:', phoneNumber);
        console.log('OTP:', otp);
        console.log('Pickup Location:', pickupLocation);
        console.log('Destination:', destination);
        console.log('Date:', date);
        console.log('Vehicle Type:', vehicleType);
        console.log('Price:', price);
    });
});

const refLink = document.getElementById('refLink');

refLink.addEventListener('click', (event) => {
    event.preventDefault();

    // Open the ref link in a smaller popup window
    const popupWidth = 600;
    const popupHeight = 400;
    const left = (window.innerWidth - popupWidth) / 2;
    const top = (window.innerHeight - popupHeight) / 2;
    window.open(refLink.href, 'refLinkPopup', `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`);
});
let menu_icon_box = document.querySelector(".menu_icon_box");
let box= document.querySelector(".box");

menu_icon_box.onclick = function(){
    menu_icon_box.classList.toggle("active");
    box.classList.toggle("active");
}
document.onclick = function(e){
    if(!menu_icon_box.contains(e.target) && !box.contains(e.target)){
        menu_icon_box.classList.remove("active");
        box.classList.remove("active");  
    }
}