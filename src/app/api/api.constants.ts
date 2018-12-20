export class APIConstants {

    
    // Base URL
    // private static readonly BASE_URL = 'http://api.muahh.co.uk/v1'  
    private static readonly BASE_URL = 'http://api.bkndmuahh.co.uk/v1'

    // OAUTH token
    public static readonly OAUTH_TOKEN = 'e245d2135ed332f096b12edd58f442b6114bea46a6669b5ff090684cc6586a99'

    // Login
    public static readonly LOGIN = `${APIConstants.BASE_URL}/user/login`

    // Logout
    public static readonly LOGOUT = `${APIConstants.BASE_URL}/user/logout`

    // Signup
    public static readonly SIGNUP = `${APIConstants.BASE_URL}/user/signup`

    //Rorget password
    public static readonly FORGOT_PASSWORD = `${APIConstants.BASE_URL}/user/forgotpassword`

    // API URL for tag
    public static readonly TAG = `${APIConstants.BASE_URL}/catalog/tag`

    // Front page 
    public static readonly FRONT_PAGE = `${APIConstants.BASE_URL}/frontpage`

    // Cart
    public static readonly CART = `${APIConstants.BASE_URL}/cart`

    // Wish list
    public static readonly WISH_LIST = `${APIConstants.BASE_URL}/wish-list`

    // API URL for category
    public static readonly ADD_OR_DEL_CATEGORY = `${APIConstants.BASE_URL}/admin/catalog/category`

    public static readonly GET_CATEGORY = `${APIConstants.BASE_URL}/catalog/category`

    public static readonly GET_CATEGORIES = `${APIConstants.BASE_URL}/catalog/categories`

    public static readonly UPDATE_CATEGORY = `${APIConstants.BASE_URL}/admin/catalog/category/update`

    // API URL for product
    public static readonly CREATE_OR_DEL_PRODUCT = `${APIConstants.BASE_URL}/admin/catalog/product`

    public static readonly GET_PRODUCT = `${APIConstants.BASE_URL}/catalog/product`

    public static readonly UPDATE_PRODUCT = `${APIConstants.BASE_URL}/admin/catalog/product/update`

    // API URL for varient
    public static readonly ADD_OR_DEL_VARIENT = `${APIConstants.BASE_URL}/admin/catalog/variant`

    public static readonly VARIENT = `${APIConstants.BASE_URL}/catalog/variant`

    public static readonly UPDATE_VARIENT = `${APIConstants.BASE_URL}/admin/catalog/variant/update`
   

    // API URL for varient option
    public static readonly ADD_OR_DEL_VARIENT_OPTION = `${APIConstants.BASE_URL}/admin/catalog/variant_option`

    public static readonly VARIENT_OPTION = `${APIConstants.BASE_URL}/catalog/variant_option`

    public static readonly UPDATE_VARIENT_OPTION = `${APIConstants.BASE_URL}/admin/catalog/variant_option/update`

    // Media upload
    public static readonly MEDIA_UPLOAD = `${APIConstants.BASE_URL}/media/upload`

    // Personal changing room header
    public static readonly PCR_HEADER = `${APIConstants.BASE_URL}/variation/model/header`

    //API to add product in PCR
    public static readonly ADD_TO_PCR = `${APIConstants.BASE_URL}/changing-room-list`

    // API URL for Checkout
    public static readonly CHECKOUT = `${APIConstants.BASE_URL}/checkout`

     // API URL for Get Portal Review
     public static readonly GET_PORTAL_REVIEW = `${APIConstants.BASE_URL}/portal-review`

     // API URl for Post Portal Review
     public static readonly POST_PORTAL_REVIEW = `${APIConstants.BASE_URL}/portal-review`

      // API URl for Get User Review
      public static readonly GET_USER_REVIEW = `${APIConstants.BASE_URL}/feedback`

}

