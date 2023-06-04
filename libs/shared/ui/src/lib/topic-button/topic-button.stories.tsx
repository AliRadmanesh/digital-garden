import type { Meta, StoryFn } from '@storybook/react';
import { TopicButton, TopicButtonProps } from './topic-button';

const Story: Meta<typeof TopicButton> = {
  component: TopicButton,
  title: 'TopicButton',
};
export default Story;

const Template: StoryFn<TopicButtonProps> = (args) => {
  return (
    <div className="bg-gray-200 p-20">
      <TopicButton {...args} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
