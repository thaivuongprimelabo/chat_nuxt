export default function ({ context, redirect }) {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    

    if(token === undefined || token === null || token.length === 0) {
        return redirect('/user/login');
    }
}