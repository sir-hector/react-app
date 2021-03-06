import {requests} from "../agent";
import {
    BLOG_POST_ERROR,
    BLOG_POST_FORM_UNLOAD,
    BLOG_POST_LIST_ADD,
    BLOG_POST_LIST_ERROR,
    BLOG_POST_LIST_RECEIVED,
    BLOG_POST_LIST_REQUEST,
    BLOG_POST_LIST_SET_PAGE,
    BLOG_POST_RECEIVED,
    BLOG_POST_REQUEST,
    BLOG_POST_UNLOAD,
    COMMENT_ADDED,
    COMMENT_LIST_ERROR,
    COMMENT_LIST_RECEIVED,
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_UNLOAD, IMAGE_DELETE_REQUEST,
    IMAGE_DELETED,
    IMAGE_UPLOAD_REQUEST,
    IMAGE_UPLOADED,
    IMAGE_UPLOADED_ERROR,
    USER_CONFIRMATION_SUCCESS,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_PROFILE_ERROR,
    USER_PROFILE_RECEIVED,
    USER_PROFILE_REQUEST,
    USER_REGISTER_COMPLETE,
    USER_REGISTER_SUCCESS,
    USER_SET_ID
} from "./constans";
import {SubmissionError} from "redux-form";
import {parseApiErrors} from "../apiUtils";


export const blogPostListRequest = () => ({
    type: BLOG_POST_LIST_REQUEST
});
export const blogPostListError = (error) => ({
    type: BLOG_POST_LIST_ERROR,

});
export const blogPostListReceived = (data) => ({
    type: BLOG_POST_LIST_RECEIVED,
    data
});
export const blogPostListFetch = (page = 1) => {
    return (dispatch) => {
        dispatch(blogPostListRequest());
        return requests.get(`/blog_posts?_page=${page}`)
            .then(response =>dispatch(blogPostListReceived(response)))
            .catch(error => dispatch(blogPostListError(error)))

}
};

export const blogPostListSetPage = (page) => ({
    type :BLOG_POST_LIST_SET_PAGE,
    page

})

export const  blogPostRequest = () => ({
   type : BLOG_POST_REQUEST
});
export const blogPostError = (error) => ({
    type: BLOG_POST_ERROR,
    error

});
export const blogPostReceived = (data) => ({
    type: BLOG_POST_RECEIVED,
    data
});
export const  blogPostUnload = () => ({
    type : BLOG_POST_UNLOAD
});
export const blogPostFetch = (id) => {
    return(dispatch) => {
        dispatch(blogPostRequest());
        return requests.get(`/blog_posts/${id}`)
            .then(response => dispatch(blogPostReceived(response)))
            .catch(error => dispatch(blogPostError(error)))
    }
}

export const blogPostAdd = () => ({
    type: BLOG_POST_LIST_ADD,
    data: {
        id: Math.floor(Math.random()*100+3),
        title: 'A newly added blog post'
    }
});

export const  commentListRequest = () => ({
    type : COMMENT_LIST_REQUEST
});
export const commentListError = (error) => ({
    type: COMMENT_LIST_ERROR,
    error

});
export const commentListReceived = (data) => ({
    type: COMMENT_LIST_RECEIVED,
    data
});
export const  commentListUnload = () => ({
    type : COMMENT_LIST_UNLOAD
});
export const commentListFetch = (id, page = 1) => {
    return(dispatch) => {
        dispatch(commentListRequest());
        return requests.get(`/blog_posts/${id}/comments?_page=${page}`)
            .then(response => dispatch(commentListReceived(response)))
            .catch(error => dispatch(commentListError(error)))
    }
}
export const commentAdded = (comment) => ({
    type: COMMENT_ADDED,
    comment
});
export const commentAdd = (comment, blogPostId) => {
    return (dispatch) => {
        return requests.post(
            '/comments',
            {
                content: comment,
                blogPost: `/api/blog_posts/${blogPostId}`
            }
        ).then(response => dispatch(commentAdded(response))).catch(error=>{
            if (401 === error.response.status){
                return dispatch(userLogout())
            }
            throw new SubmissionError(parseApiErrors(error))
        })
    }
}

export const postAdd = (title, content, images = []) => {
    return (dispatch) => {
        return requests.post(
            '/blog_posts',
            {
                title,
                content,
                slug: title && title.replace(/ /g, "-").toLowerCase(),
                images: images.map(image =>`/api/images/${image.id}`)
            }
        ).catch(error=>{
            if (401 === error.response.status){
                return dispatch(userLogout())
            }
            if(403 === error.response.status){
                throw new SubmissionError({
                 _error: 'Nie masz praw do publikacji'
                })
            }
            throw new SubmissionError(parseApiErrors(error))
        })
    }
}
export const imageUpload = (file) => {
    return (dispatch) => {
        dispatch(imageUploadRequest());
        return requests.upload('/images', file)
            .then(response => dispatch(imageUploaded(response)))
            .catch(() => dispatch(imageUploadError))
    }
};


export const imageUploaded = (data) => {
    return {
        type: IMAGE_UPLOADED,
        image: data
    }
}

export const imageDelete = (id) => {
    return (dispatch) => {
        dispatch(imageDeleteRequest());
        return requests.delete(`/images/${id}`)
            .then(() => dispatch(imageDeleted(id)));
    }
}

export const imageDeleteRequest = () => {
    return {
        type: IMAGE_DELETE_REQUEST,
    }
};

export const imageDeleted = (data) => {
    return  {
        type: IMAGE_DELETED,
        imageId: data
    }
}
export const imageUploadRequest = () => {
    return {
        type: IMAGE_UPLOAD_REQUEST,
    }
}

export const imageUploadError = () => {
    return {
        type: IMAGE_UPLOADED_ERROR,
    }
}

export const blogPostFormUnload = () => {
    return {
        type: BLOG_POST_FORM_UNLOAD,
    }
}



export const userLoginSuccess = (token, userId) => {
    return {
        type: USER_LOGIN_SUCCESS,
        token,
        userId,
    }
}

export const userProfileFetch = (userId) => {
    return (dispatch) => {
        dispatch(userProfileRequest());
        return requests.get(`/users/${userId}`, true).then(
            response => dispatch(userProfileReceived(userId, response))).catch( error => dispatch(userProfileError()))
    }
}
export const userProfileRequest = () => {
    return  {
        type: USER_PROFILE_REQUEST
    }
}
export const userProfileError = (error) => {
    return  {
        type: USER_PROFILE_ERROR,
        error
    }
}
export const userProfileReceived = (userId, userData) => {
    return  {
        type: USER_PROFILE_RECEIVED,
        userData,
        userId,
    }
}

export const userLoginAttempt = (username, password) => {
    return (dispatch) => {
        return requests.post('/login_check', {username, password}, false).then(
            response => {dispatch(userLoginSuccess(response.token,response.id))})
            .catch(error => {
                throw new SubmissionError({
                    _error: "username or password is invalid"
                })
            }
        )
    }
}

export const userRegister = (username, password, retypedPassword, email, name) => {
    return (dispatch) => {
        return requests.post('/users', {username, password, retypedPassword, email, name}, false)
            .then(() => dispatch(userRegisterSuccess()))
            .catch(error => {
                console.log(error)
                throw new SubmissionError(parseApiErrors(error));
            });
    }
};

export const userConfirm = (confirmationToken) => {
    return (dispatch) => {
        return requests.post('/users/confirm', {confirmationToken}, false)
            .then(() => dispatch(userConfirmationSuccess()))
            .catch(error => {
                console.log(error)
                throw new SubmissionError({
                    _error: "Niepoprawny token"
                });
            });
    }
};


export const userConfirmationSuccess= () => {
    return {
        type: USER_CONFIRMATION_SUCCESS
    }
}

export const userRegisterComplete= () => {
    return {
        type: USER_REGISTER_COMPLETE
    }
}


export const userRegisterSuccess= () => {
    return {
        type: USER_REGISTER_SUCCESS,
    }
}

export const userLogout = () => {
    return {
        type: USER_LOGOUT
    }
}

export const userSetId = (userId) => {
    return {
        type: USER_SET_ID,
        userId
    }
}
