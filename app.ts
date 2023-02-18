const baseUrl = 'http://146.185.154.90:8000/blog/leo@mail.ru/';

const  userName = document.getElementById('userName')!;
const editProfileBtn = document.getElementById('editProfile')!
const profileModal = new bootstrap.Modal('#exampleModal');
const firstNameInput = <HTMLInputElement> document.getElementById('firstName')!;
const lastNameInput = <HTMLInputElement> document.getElementById('lastName')!;
const profileForm = <HTMLFormElement>document.getElementById('profileForm');


interface ProfileResponse {
  email:string;
  firstName:string;
  lastName:string;
  _id:string;
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
      await fetch(baseUrl + 'profile', {method:'POST', body});
      profileModal.hide();
      userName.innerHTML = firstName + ' ' + lastName;
      user.firstName = firstName;
      user.lastName = lastName
    } catch (e) {
      alert('Error' + e)
    }
  });
};

run().catch(console.error)