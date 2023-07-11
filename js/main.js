
let users = [
    {
        name: 'User 1',
        password: 'pass123',
        age: 30,
        isLogin: false
    },
    {
        name: 'User 2',
        password: 'pass124',
        age: 33,
        isLogin: false
    },
    {
        name: 'User 3',
        password: 'pass125',
        age: 21,
        isLogin: false
    },
    {
        name: 'User 4',
        password: 'pass126',
        age: 56,
        isLogin: false
    },
    {
        name: 'User 5',
        password: 'pass127',
        age: 42,
        isLogin: false
    },
    {
        name: 'User 6',
        password: 'pass128',
        age: 13,
        isLogin: false
    },
    {
        name: 'User 7',
        password: 'pass129',
        age: 29,
        isLogin: false
    },
    {
        name: 'User 8',
        password: 'pass130',
        age: 53,
        isLogin: false
    },
    {
        name: 'User 9',
        password: 'pass131',
        age: 18,
        isLogin: false
    },
    {
        name: 'User 10',
        password: 'pass132',
        age: 48,
        isLogin: false
    }
];

let posts = [
    {
        id: 1,
        title: 'Post 1',
        user: 'User 3',
        likes: 34
    },
    {
        id: 2,
        title: 'Post 2',
        user: 'User 4',
        likes: 58
    },
    {
        id: 3,
        title: 'Post 3',
        user: 'User 6',
        likes: 90
    },
    {
        id: 4,
        title: 'Post 4',
        user: 'User 2',
        likes: 2
    },
    {
        id: 5,
        title: 'Post 5',
        user: 'User 3',
        likes: 128
    },
    {
        id: 6,
        title: 'Post 6',
        user: 'User 1',
        likes: 743
    },
    {
        id: 7,
        title: 'Post 7',
        user: 'User 8',
        likes: 9
    },
    {
        id: 8,
        title: 'Post 8',
        user: 'User 10',
        likes: 90
    },
    {
        id: 9,
        title: 'Post 9',
        user: 'User 4',
        likes: 73
    },
    {
        id: 10,
        title: 'Post 10',
        user: 'User 2',
        likes: 581
    },
];





//users logic
let inSystem = '';

function changeInSystemUser(userName = ''){
    inSystem = userName;
    let h3 = document.querySelector('h3');
    inSystem ? h3.innerText = `User: ${inSystem} in system`: h3.innerText = 'No online';
}


//registration

function checkUsername(userName){
    return users.some(item => item.name === userName);
}
function checkPassword(pass,passConfirmation){
    return pass === passConfirmation;
}

function createUser(){
    let userName = prompt('Enter username');
    if(checkUsername(userName)){
        alert('User alrady exists');
        return;
    };
    let pass = prompt('Enter password');
    let passConfirm = prompt('Enter password confirmation');
    if(!checkPassword(pass,passConfirm)) {
        alert('Passwords don\'t match!');
        return;
    }
    let age = +prompt('Enter age');
    let userObj = {
        name:userName,
        password:pass,
        age:age,
        isLogin:false
    }
    users.push(userObj);
    console.log(users);
}

//login
function getUserObj(userName){
    return users.find(item => item.name === userName);
}

function checkUserPassword(userName,pass){
    let user = getUserObj(userName);
    return user.password === pass;
}

function loginUser(){
    let userName = prompt('Enter username');
    if(!checkUsername(userName)){
        alert('User not found');
        return;
    }
    let pass = prompt('Enter password');
    if(!checkUserPassword(userName,pass)){
        alert('Incorrect Password');
        return;
    }
    let user = getUserObj(userName);
    user.isLogin = true;
    changeInSystemUser(userName);
    console.log(users)

}


//logout

function logoutUser(){
    if(!inSystem){
        alert('Only authorized users can logout');
        return;
    }
    let user = getUserObj(inSystem);
    user.isLogin = false;
    changeInSystemUser();
}

//posts logic

//create
function createPost(){
    if(!inSystem){
        alert('Only authorized users can create post');
        return;
    }
    let postTitle = prompt('Enter post title');

    let postObj = {
        id:Date.now(),
        title:postTitle,
        user:inSystem,
        likes:0
    };
    posts.push(postObj);
    readPosts();
}


//update
function getPostObj(postId){
    return posts.find(item => item.id === postId);
}

function checkOwnerPost(postId){
    let postObj = getPostObj(postId);
    return postObj && postObj.user === inSystem;
}

function updatePost() {
    if(!inSystem){
        alert('Only authorized users can update post');
        return;
    }
    let postId = +prompt("Enter post id");
    if(!checkOwnerPost(postId)){
        alert('There is no post with this id or you are not the author of such a post');
        return;
    }
    let postObj = getPostObj(postId);
    let newPostTitle = prompt('Enter post title');
    postObj.title = newPostTitle;
    readPosts();
    
}


function deletePost(){
    if(!inSystem){
        alert('Only authorized users can delete post');
        return;
    }
    let postId = +prompt("Enter post id");
    if(!checkOwnerPost(postId)){
        alert('There is no post with this id or you are not the author of such a post');
        return;
    }

    posts = posts.filter(item => item.id !== postId);
    readPosts();
}


//readPosts

function readPosts(){
    let list = document.querySelector('ul');
    list.innerHTML = '';
    for(let i of posts){
        list.innerHTML += `<li>Post content: ${i.title}; post id:${i.id}; author:${i.user}; likes:${i.likes}</li>`
    }

}
