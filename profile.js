// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCEBA8Dnd7pBs2rNKwxLETwObxBm9TYS4",
    authDomain: "doller-tree-4434d.firebaseapp.com",
    databaseURL: "https://doller-tree-4434d-default-rtdb.firebaseio.com",
    projectId: "doller-tree-4434d",
    storageBucket: "doller-tree-4434d.appspot.com",
    messagingSenderId: "308263906273",
    appId: "1:308263906273:web:060be293712c9a1fcf00a0"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Function to fetch user data
function fetchUserProfile() {
    const user = auth.currentUser; // Get the currently logged-in user
    
    if (user) {
        // Reference to the user's data in Firebase
        const userRef = database.ref('users/' + user.uid);

        // Fetch user data
        userRef.once('value')
            .then((snapshot) => {
                const userData = snapshot.val();

                // Display user data on the page
                if (userData) {
                    document.getElementById('email').textContent = userData.email || 'Not Available';
                    document.getElementById('mobile').textContent = userData.mobileNumber || 'Not Available';
                    document.getElementById('wallet').textContent = userData.walletAddress || 'Not Available';
                } else {
                    alert('No data found for this user.');
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    } else {
        // Redirect user to login page if not logged in
        alert('No user is logged in.');
        window.location.href = 'login.html'; // Redirect to the login page
    }
}

// Call the function to load user profile when the page is ready
window.onload = function() {
    fetchUserProfile();
};
