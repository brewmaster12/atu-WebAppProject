// Store user data in an array
const users = [{
    username: "user@123.com",
    password: "pass"
}];

// Function to authenticate a user based on their username and password
function authenticateUser(username, password){
    // Find the user with the given username in the users array
    const user = users.find(user => user.username === username);

    // If the user is not found or the provided password does not match, return false
    if(!user || user.password !== password ) {
        return false;
    }
    // If the username and password match, return true
    return true;
}

// Export the createUser and authenticateUser functions for use in other modules
module.exports = authenticateUser;