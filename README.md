<div align="center">
        <a href="https://marquee.bearests.com/" title="Bear Marquee Logo - Most modern mobile touch slider with hardware accelerated transitions for ReactJS">
            <img src="https://raw.githubusercontent.com/imagine10255/bear-marquee/main/example/public/logo.png" alt="Bear Marquee Logo - Most modern mobile touch slider with hardware accelerated transitions for ReactJS" />
        </a>
</div>

<div align="center">

    

[![NPM](https://img.shields.io/npm/v/bear-marquee.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-marquee)
[![npm downloads](https://img.shields.io/npm/dm/bear-marquee.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-marquee)
[![npm](https://img.shields.io/npm/dt/bear-marquee.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-marquee)
[![npm](https://img.shields.io/npm/l/bear-marquee?style=for-the-badge)](https://github.com/bear-marquee/bear-marquee/blob/master/LICENSE)

</div>

<p align="center">
  <a href="https://marquee.bearests.com">Get started</a> | 
  <a href="https://marquee.bearests.com/api">API</a> |
  <a href="https://marquee.bearests.com/example/text-animations">Demo</a> |
  <a href="https://marquee.bearests.com/props-try">Prop Try</a>
</p>

### Features

- Use React + Flexbox directly, not javascript in secondary development into React
- Easier to use
- Supports both Web, Mobile
- Responsive setting parameters
- Navigation buttons can be directly moved out of the marquee area without being affected by overflow in simple usage situations
- Use Flexbox instead of adding inlineStyle to marquee items
- Number of times to avoid re-renders by key in marquee items
- When the image data is loaded asynchronously, it will not be displayed because BearMarquee has componentDidMount, and the image has been loaded but not displayed. Additional processing is required.
- There is no need to set the style of the project, Bear Marquee directly provides the components of your project, you only need to set the image URL and form an array, and put it in the data parameter.
- The size of the marquee, the height of the outer container is based, and the item container follows the size of the outer container
- Provide project scale setting or fixed height setting
- Prevent onClick of marquee item from triggering on swipe


### Install

```bash
yarn add bear-marquee
```

### Usage

```tsx
import BearMarquee, {TBearSlideItemDataList, BearSlideItem} from 'bear-marquee';
import 'bear-marquee/dist/index.css';

const images = [
        {id: 1, image: "https://dummyimage.com/900x400/dee2e6/6c757d.jpg"},
        {id: 2, image: "https://dummyimage.com/900x400/dee2e6/6c757d.jpg"},
        {id: 3, image: "https://dummyimage.com/900x400/dee2e6/6c757d.jpg"},
    ];
    
const bearSlideItemData: TBearSlideItemDataList  = images.map(row => {
        return {
            key: row.id,
            children: <BearSlideItem imageUrl={row.image}/>
        };
    });


export const CustomBanner = () => {
    return <BearMarquee 
        data={bearSlideItemData} 
        aspectRatio={{widthRatio: 16, heightRatio: 9}}
    />
}
```

There is also a codesandbox template that you can fork and play with it:

[![Edit react-editext-template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/bear-marquee-9h6eu)



### if your need control by out component

```tsx
const CustomBanner = ({
    const [marquee, setMarquee] = useState<IBearMarqueeObj>();
  
    const goToPage = (index: number): void => control?.goToPage(index);
    const getPageTotal = (): number => control?.info.pageTotal ?? 0;

    <BearMarquee
        setMarquee={setMarquee}
        data={bearSlideItemData}
        staticHeight="250px"/
    />
}
```

### License

MIT © [imagine10255](https://github.com/imagine10255)
