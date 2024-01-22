document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const username = document.getElementById('usernameInput').value;
  
    // Search for users
    fetch(`https://api.github.com/search/users?q=${octocat}`)
      .then(response => response.json())
      .then(data => {
        displayUsers(data.items);
      })
      .catch(error => console.error('Error fetching users:', error));
  });
  
  function displayUsers(users) {
    const userListElement = document.getElementById('userList');
    userListElement.innerHTML = ''; // Clear previous results
  
    users.forEach(user => {
      const userElement = document.createElement('div');
      userElement.classList.add('user');
      userElement.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login} Avatar">
        <span>${user.login}</span>
        <a href="${user.html_url}" target="_blank">View Profile</a>
      `;
      userElement.addEventListener('click', function () {
        // Clicking on a user fetches their repositories
        fetchUserRepos(user.login);
      });
  
      userListElement.appendChild(userElement);
    });
  }
  
  function fetchUserRepos(username) {
    // Fetch user repositories
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(data => {
        displayRepos(data);
      })
      .catch(error => console.error('Error fetching user repos:', error));
  }
  
  function displayRepos(repos) {
    const repoListElement = document.getElementById('repoList');
    repoListElement.innerHTML = ''; // Clear previous results
  
    repos.forEach(repo => {
      const repoElement = document.createElement('div');
      repoElement.classList.add('repo');
      repoElement.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || 'No description available.'}</p>
        <a href="${repo.html_url}" target="_blank">View Repository</a>
      `;
  
      repoListElement.appendChild(repoElement);
    });
  }
  