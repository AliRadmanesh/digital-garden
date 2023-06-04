import styles from './youtube.module.css';

export interface YoutubeProps {
  title: string;
  uid: string;
}

export function Youtube({ uid, title }: YoutubeProps) {
  return (
    <div>
      <iframe
        width="100%"
        height="500px"
        title={title}
        src={`https://www.youtube.com/embed/${uid}`}
      ></iframe>
    </div>
  );
}

export default Youtube;
