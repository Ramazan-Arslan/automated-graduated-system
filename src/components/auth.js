
const auth = () => {
    return (Boolean(localStorage.getItem('id')));
}
export default auth;