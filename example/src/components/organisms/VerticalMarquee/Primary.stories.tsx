import VerticalMarquee from '@acrool/react-vertical-marquee';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
    title: 'VerticalMarquee',
    component: VerticalMarquee,
    parameters: {
        // layout: 'centered',
    },
    argTypes: {},
    args: {
        autoPlayTime: 2000,
        data: [
            {key: 1, text: 'Most modern mobile touch slider with hardware accelerated transitions for ReactJS', onClick: () => window.open('https://carousel.bearests.com/')},
            {key: 2, text: 'This is a carousel developed directly using React + Flexbox (non-js secondary development package into React), and only include the features you need, not too many cool effects that might complicate your usage or create other weird issues.', onClick: () => window.open('https://carousel.bearests.com/')},
            {key: 3, text: 'Navigation buttons can be directly moved out of the carousel area without being affected by overflow in simple usage situations', onClick: () => window.open('https://carousel.bearests.com/feature/static-height')},
            {key: 4, text: 'When the image data is loaded asynchronously, it will not be displayed because BearCarousel has componentDidMount, and the image has been loaded but not displayed. Additional processing is required.', onClick: () => window.open('https://carousel.bearests.com/feature/responsive')},
            // {key: 5, text: 'The size of the carousel, the height of the outer container is based, and the item container follows the size of the outer container', onClick: () => window.open('https://carousel.bearests.com/feature/centered')},
        ]
    },
} satisfies Meta<typeof VerticalMarquee>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
    args: {},
};
