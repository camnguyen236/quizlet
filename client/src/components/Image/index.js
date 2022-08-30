import { forwardRef } from 'react';
//để cho thèn Tippy lấy đc ref
import img from '~/assets/img';

const Image = forwardRef(({ src, alt, ...props }, ref) => {
    return <img ref={ref} src={src || img.defaultImage} alt={alt} {...props} />;
});

export default Image;
