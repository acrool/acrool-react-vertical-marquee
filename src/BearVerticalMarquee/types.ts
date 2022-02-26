import * as CSS from 'csstype';


export interface IBearCarouselProps {
  style?: CSS.Properties
  className?: string
  data: TBearSlideItemDataList;
  moveTime: number
  autoPlayTime: number
  isGPURender: boolean
  isDebug: boolean
}




export interface InitData {
  actualIndex: number;
  matchIndex: number;
  sourceIndex?: number;
  inPage: number;
  isClone: boolean;
  onClick?: () => void;
  element: React.ReactNode;
}

export interface IInfo {
  formatElement: InitData[],
  sourceTotal: number, // 來源總數
  // 從0開始
  element: {
    total: number,
    firstIndex: number,
    lastIndex: number,
  },
  // 0為實際一開始的位置(往前為負數), 結束值為最後結束位置
  actual: {
    minIndex: number,
    maxIndex: number,
    firstIndex: number,
    lastIndex: number,
  },
  // 總頁數
  pageTotal: number,
}
export interface IBearSlideItemData {
  key: string|number
  onClick?: () => void,
  text: string
}
export type TBearSlideItemDataList = IBearSlideItemData[];

