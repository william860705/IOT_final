import axios from 'axios';
import uuid from 'uuid/v4';
import moment from 'moment';
import 'babel-polyfill';

const postKey = 'posts';

export function listPosts() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(_listPosts());
        }, 500);
    });
}

// Simulated server-side code
function _listPosts() {
    let postString = localStorage.getItem(postKey);
    let posts = postString ? JSON.parse(postString) : [];
    posts = posts.filter(t => {
             return !t.doneTs;
         });
    return posts;
};

export function createPost(text) {
    // localStorage.clear();
    return new Promise((resolve, reject) => {
        resolve(_createPost(text));
    });
}

// Simulated server-side code
function _createPost(text) {
    const newPost = {
        id: uuid(),
        text: text,
        ts: moment().unix(),
        doneTs: null
    };
    const posts = [
        newPost,
        ..._listPosts()
    ];
    localStorage.setItem(postKey, JSON.stringify(posts));
    return newPost;
}


export function deletePost(id) {
    return new Promise((resolve, reject) => {
        _deletePost(id);
        resolve();
    });
}

// Simulated server-side code
function _deletePost(id) {
    let todos = _listPosts();
    for(let t of todos) {
        if(t.id === id) {
            t.doneTs = moment().unix();
            break;
        }
    }
    localStorage.setItem(postKey, JSON.stringify(todos));
}


export function createVote(id, mood) {
    return new Promise((resolve, reject) => {
        _createVote(id, mood);
        resolve();
    });
}

function _createVote(id, mood) {
    const m = ['clearVotes', 'cloudsVotes', 'clearVotes', 'drizzleVotes', 'drizzleVotes', 'rainVotes', 'thunderVotes', 'snowVotes', 'windyVotes']
    const posts = _listPosts().map(p => {
        if (p.id === id) {
            const s = m.map(i => {
                if(i == mood.toLowerCase() + 'Votes')
                    if(p[i])p[i]--;
                    else p[i] ++;
                else p[i] = 0;
            })

        }
        return p;
    });
    localStorage.setItem(postKey, JSON.stringify(posts));
}
