export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.authorisation.token) {
      return { Authorization: `Bearer ${user.authorisation.token}` };
    } else {
      return {};
    }
  }
  