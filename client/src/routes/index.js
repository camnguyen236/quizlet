//Layouts
// import { HeaderOnly } from '~/components/Layouts'; //nếu tạo mới layout thì import ở đây để dùng ở dứi

//pages
import Home from '~/pages/Home';
import SignUp from '~/pages/SignUp';
import Login from '../pages/Login/Login';
// import Following from '~/pages/Following';
// import Upload from '~/pages/Upload';
// import Search from '~/pages/Search';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/signup', component: SignUp, layout: null },
    { path: '/signup', component: Login, layout: null },

    // { path: '/upload', component: Upload, layout: HeaderOnly },
    // { path: '/search', component: Search, layout: null },
]; // k đăng nhập vẫn xem đc

const privateRoutes = []; // đăng nhập mới xem đc

export { publicRoutes, privateRoutes };
