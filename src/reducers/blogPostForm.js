import {
    BLOG_POST_FORM_UNLOAD, IMAGE_DELETE_REQUEST,
    IMAGE_DELETED,
    IMAGE_UPLOAD_REQUEST,
    IMAGE_UPLOADED,
    IMAGE_UPLOADED_ERROR
} from "../actions/constans";

export default (state = {
    isImageUploading: false,
    images: []
},action) => {
    switch(action.type){
        case IMAGE_UPLOAD_REQUEST:
            return {
                ...state,
                isImageUploading: true
            }
        case IMAGE_UPLOADED_ERROR:
            return {
                ...state,
                isImageUploading: false
            }
        case IMAGE_UPLOADED:
            return {
                ...state,
                isImageUploading: false,
                images: state.images.concat(action.image)
            }
        case BLOG_POST_FORM_UNLOAD:
            return {
                ...state,
                isImageUploading: false,
                images: [],
            }
        case IMAGE_DELETED:
            return {
                ...state,
                images: state.images.filter(image => image.id !== action.image.id),
                isImageUploading: false
            }
        case IMAGE_DELETE_REQUEST:
            return {
                ...state,
                isImageUploading: true,
            }
        default:
            return state;
    }
}