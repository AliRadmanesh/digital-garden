import Link from 'next/link';
import styles from './custom-link.module.css';

export interface CustomLinkProps {
  as: string;
  href: string;
}

export function CustomLink({ as, href, ...otherProps }: CustomLinkProps) {
  return <Link as={as} href={href} className="bg-yellow-100" {...otherProps} />;
}

export default CustomLink;
