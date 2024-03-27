export function loginCheck() {
    const access = localStorage.getItem('access');
    if (access) {
        return true;
    } else {
        return false;
    }
}