const baseUrl = 'http://146.185.154.90:8000/blog/leo@mail.ru/';

const userName = document.getElementById('userName')!;
const editProfileBtn = document.getElementById('editProfile')!
const profileModal = new bootstrap.Modal('#exampleModal');
const firstNameInput = <HTMLInputElement>document.getElementById('firstName');
const lastNameInput = <HTMLInputElement>document.getElementById('lastName');
const profileForm = document.getElementById('profileForm')!;
const messages = document.getElementById('messages')!;
const messageForm = document.getElementById('messageForm')!;
const messageInput = <HTMLInputElement>document.getElementById('message');

interface ProfileResponse {
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
}

interface Post {
  datetime: string;
  message: string;
  user: ProfileResponse;
  userId: string;
  _id: string;
}

const run = async () => {
  const response = await fetch(baseUrl + 'profile');
  const user: ProfileResponse = await response.json();
  userName.innerHTML = user.firstName + ' ' + user.lastName;

  editProfileBtn.addEventListener('click', () => {
    profileModal.show();
    firstNameInput.value = user.firstName
    lastNameInput.value = user.lastName
  });

  profileForm.addEventListener('submit', async event => {
    event.preventDefault();
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;

    const body = new URLSearchParams();
    body.append('firstName', firstName);
    body.append('lastName', lastName);
    try {
      await fetch(baseUrl + 'profile', {method: 'POST', body});
      profileModal.hide();
      userName.innerHTML = firstName + ' ' + lastName;
      user.firstName = firstName;
      user.lastName = lastName
    } catch (e) {
      alert('Error' + e)
    }
  });

  messageForm.addEventListener('submit', async event => {
    event.preventDefault();
    const message = messageInput.value;

    const body = new URLSearchParams();
    body.append('message', message);

    try {
      await fetch(baseUrl + 'posts', {method: 'POST', body})
    } catch (e) {
      alert('Error' + e)
    }
  })

  let lastDate = '';

  setInterval(async () => {
    let url = baseUrl + 'posts';
    if (lastDate) {
      url += '?datetime=' + lastDate
    }
    const response = await fetch(url);
    const posts: Post[] = await response.json();
    if (posts.length  > 0){
      lastDate = posts[posts.length-1].datetime
    }
    for (const post of posts) {
      const message = document.createElement('div');
      message.innerHTML = `
      <strong>${post.user.firstName + ' ' + post.user.lastName} said:<strong/>
      <blockquote>${post.message}<blockquote/>
      `;
      message.className = 'card card-body mb-2';
      messages.insertBefore(message, messages.firstElementChild)
    }

  }, 3000)
};

run().catch(console.error)