import styles from './topic-button.module.css';

/* eslint-disable-next-line */
export interface TopicButtonProps {}

export function TopicButton(props: TopicButtonProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to TopicButton!</h1>
    </div>
  );
}

export default TopicButton;
