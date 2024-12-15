// Function to generate a unique user ID
function generateUniqueID() {
    return 'user-' + Math.random().toString(36).substr(2, 9); // Generates a random alphanumeric string
}

// Function to get the unique user ID from localStorage or generate a new one
function getUserID() {
    let userID = localStorage.getItem('userID'); // Try to get the user ID from localStorage
    
    if (!userID) {
        // If there's no ID in localStorage, generate a new one
        userID = generateUniqueID();
        localStorage.setItem('userID', userID); // Store the generated ID in localStorage
    }
    
    return userID; // Return the user ID (either existing or newly generated)
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the user ID from localStorage or generate a new one
    const userID = getUserID();

    // Show user ID in the UI
    document.getElementById('userID').textContent = userID;

    // Hide the login form and show the user info
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('userInfo').classList.remove('hidden');
});







// Function to generate a unique user ID
function generateUniqueID() {
    return 'user-' + Math.random().toString(36).substr(2, 9); // Generates a random alphanumeric string
}

// Function to get the unique user ID from localStorage or generate a new one
function getUserID() {
    let userID = localStorage.getItem('userID'); // Try to get the user ID from localStorage
    
    if (!userID) {
        // If there's no ID in localStorage, generate a new one
        userID = generateUniqueID();
        localStorage.setItem('userID', userID); // Store the generated ID in localStorage
    }
    
    return userID; // Return the user ID (either existing or newly generated)
}

// Function to get and display bookmarks for the user
function displayBookmarks(userID) {
    const bookmarksKey = `bookmarks-${userID}`;
    const bookmarks = JSON.parse(localStorage.getItem(bookmarksKey)) || []; // Get bookmarks or empty array
    
    const bookmarksList = document.getElementById('bookmarks');
    bookmarksList.innerHTML = ''; // Clear current list

    if (bookmarks.length > 0) {
        bookmarks.forEach(bookmark => {
            const li = document.createElement('li');
            li.textContent = bookmark; // Assuming bookmark is a question title or URL
            bookmarksList.appendChild(li);
        });
    } else {
        bookmarksList.innerHTML = '<li>No bookmarks yet.</li>';
    }
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the user ID from localStorage or generate a new one
    const userID = getUserID();

    // Show user ID in the UI
    document.getElementById('userID').textContent = userID;

    // Hide the login form and show the user info
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('userInfo').classList.remove('hidden');
    
    // Display bookmarks after login
    displayBookmarks(userID);
});

// Handle showing bookmarks
document.getElementById('showBookmarks').addEventListener('click', function() {
    const userID = getUserID(); // Get the current user ID
    const bookmarksList = document.getElementById('bookmarksList');
    bookmarksList.classList.toggle('hidden'); // Toggle visibility of bookmarks list
    displayBookmarks(userID); // Display bookmarks
});

// Function to add a bookmark (this can be called elsewhere in the app)
function addBookmark(questionTitle) {
    const userID = getUserID();
    const bookmarksKey = `bookmarks-${userID}`;
    const bookmarks = JSON.parse(localStorage.getItem(bookmarksKey)) || [];
    
    // Add the new bookmark to the list (avoid duplicates)
    if (!bookmarks.includes(questionTitle)) {
        bookmarks.push(questionTitle);
        localStorage.setItem(bookmarksKey, JSON.stringify(bookmarks)); // Store the updated list in localStorage
    }
}
