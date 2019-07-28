export default function ({ store, redirect }) {
    
    if(localStorage.getItem('current_login_id') === undefined || localStorage.getItem('current_login_id') === null) {
        return redirect('/user/login')
    }
}