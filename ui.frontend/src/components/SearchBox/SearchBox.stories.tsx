import React from "react";
import { Story, Meta } from "@storybook/react";
import { SearchBoxProps } from "./types";
import SearchBox from "./SearchBox";

export default {
  title: "Molecules/Renew Now",
  component: SearchBox,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/bzSigr5sMfxhUVGZy8GUDi/Buying-Journeys---DE?node-id=7021%3A192202",
    },
  },
} as Meta;

const Template: Story<SearchBoxProps> = (args) => <SearchBox {...args} />;

export const Default = Template.bind({});
Default.args = {};
