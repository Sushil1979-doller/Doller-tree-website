// Firebase Configuration
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

// DOM Elements
const emailDiv = document.getElementById('email');
const mobileNumberDiv = document.getElementById('mobileNumber');
const walletAddressDiv = document.getElementById('walletAddress');
const logoutButton = document.getElementById('logoutButton');

// Check if user is logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        const userId = user.uid;

        // Fetch user data from Firebase Realtime Database
        const userRef = database.ref('users/' + userId);
        userRef.once('value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    emailDiv.textContent = data.email || 'Not available';
                    mobileNumberDiv.textContent = data.mobileNumber || 'Not available';
                    walletAddressDiv.textContent = data.walletAddress || 'Not available';
                } else {
                    alert("User data not found!");
                }
            })
            .catch((error) => {
                alert('Error fetching user data: ' + error.message);
            });
    } else {
        // Redirect to login page if user is not logged in
        window.location.href = 'join.html';
    }
});

// Logout functionality
logoutButton.addEventListener('click', () => {
    auth.signOut()
        .then(() => {
            alert('Logged out successfully!');
            window.location.href = 'join.html';
        })
        .catch((error) => {
            alert('Error logging out: ' + error.message);
        });
});
