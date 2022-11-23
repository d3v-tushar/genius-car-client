export const setJsonToken = (user) =>{
    const currentUser = {
        email: user.email
    };
    fetch('https://genius-car-server-three-snowy.vercel.app/jwt',{
        method: 'POST',
        headers: {
        'content-type' : 'application/json',
        },
        body: JSON.stringify(currentUser)
    })
    .then(res => res.json())
    .then(data =>{
        localStorage.setItem('genius-Token', data.token);
    })
}