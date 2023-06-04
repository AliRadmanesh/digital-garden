import { TopicButton } from '@digital-garden/shared/ui';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AboutProps {}

export default function About(props: AboutProps) {
  return (
    <div className="md:container md:mx-auto p-20 bg-gray-100">
      <TopicButton topicName="Next.js" />
    </div>
  );
}
