import { StoryObj, Meta } from "@storybook/react";
import LeftContainer from "./index";

export default {
  title: "LeftContainer",
  component: LeftContainer,
} as Meta<typeof LeftContainer>;

type Story = StoryObj<typeof LeftContainer>;

const Template: Story = {
  name: "Default",
  args: {},
  render: () => <LeftContainer />,
};

export const AppStory: Story = {
  ...Template,
  name: "태그명",
  args: {
    ...Template.args,
  },
};
