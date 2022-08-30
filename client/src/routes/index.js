//Layouts
import { HeaderOnly } from '~/components/Layouts'; //nếu tạo mới layout thì import ở đây để dùng ở dứi

//pages
import Home from '~/pages/Home';
import HomeLogined from '~/pages/HomeLogined';
import SignUp from '~/pages/SignUp';
import Login from '../pages/Login/Login';
import SearchPage from '~/pages/SearchPage';
import ResetPwd1 from '../pages/ResetPwd1/index';
import ResetPwd2 from '../pages/ResetPwd2/index';
import ResetPwd3 from '../pages/ResetPwd3/index';
import CreateStudySet from '~/pages/CreateStudySet/index';
// import Following from '~/pages/Following';
// import Upload from '~/pages/Upload';
// import Search from '~/pages/Search';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/search', component: SearchPage },
    { path: '/latest', component: HomeLogined, layout: HeaderOnly },
    { path: '/signup', component: SignUp, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/forgotten', component: ResetPwd1 },
    { path: '/forgotten/password', component: ResetPwd2 },
    { path: '/forgotten/password/changepwd', component: ResetPwd3 },
    { path: '/latest/create-set', component: CreateStudySet },

    // { path: '/upload', component: Upload, layout: HeaderOnly },
    // { path: '/search', component: Search, layout: null },
]; // k đăng nhập vẫn xem đc

const privateRoutes = []; // đăng nhập mới xem đc

export { publicRoutes, privateRoutes };
