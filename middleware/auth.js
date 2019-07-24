export default function ({ store, redirect }) {
    
    if(localStorage.getItem('key') === undefined || localStorage.getItem('key') === null) {
        return redirect('/user/login')
    }
}