import { FC } from 'react';
import LogoImg from '../../assets/logo.png'; // Import the actual asset

const Logo: FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => (
  <img src={LogoImg} alt="Logo" {...props} />
);

export default Logo;
