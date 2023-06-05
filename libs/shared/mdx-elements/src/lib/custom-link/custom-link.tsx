import Link from 'next/link';
import styles from './custom-link.module.css';

export interface CustomLinkProps {
  href?: string;
}

export function CustomLink({ href = '#', ...otherProps }: CustomLinkProps) {
  return <Link href={href} className="bg-yellow-100" {...otherProps} />;
}

export default CustomLink;
