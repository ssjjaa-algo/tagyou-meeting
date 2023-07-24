import { StoryObj, Meta } from "@storybook/react";
import HomeIdx from "./index";

export default {
  title: "HomeIdx",
  component: HomeIdx,
} as Meta<typeof HomeIdx>;

type Story = StoryObj<typeof HomeIdx>;

const Template: Story = {
  name: "Default",
  args: {},
  render: () => <HomeIdx />,
};

export const AppStory: Story = {
  ...Template,
  name: "태그명",
  args: {
    ...Template.args,
  },
};
