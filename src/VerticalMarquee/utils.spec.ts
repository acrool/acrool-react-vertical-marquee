import {IBearCarouselProps} from './types';
import {getMediaInfo} from './utils';

describe('getMediaInfo', () => {


    it('單一資料時應正確回傳 info 結構', () => {
        const props: IBearCarouselProps = {
            data: [
                {key: 1, text: 'A'}
            ],
            autoPlayTime: 0,
        };
        const {info} = getMediaInfo(props);
        expect(info.sourceTotal).toBe(1);
        expect(info.formatElement.length).toBe(3); // 1 clone before + 1 data + 1 clone after
        expect(info.formatElement[1].element).toBe('A');
        expect(info.element.total).toBe(3);
        expect(info.pageTotal).toBe(1);
    });

    it('多筆資料時應正確回傳 info 結構', () => {
        const props: IBearCarouselProps = {
            data: [
                {key: 1, text: 'A'},
                {key: 2, text: 'B'},
                {key: 3, text: 'C'},
            ],
            autoPlayTime: 0,
        };
        const {info} = getMediaInfo(props);
        expect(info.sourceTotal).toBe(3);
        expect(info.formatElement.length).toBe(5); // 1 clone before + 3 data + 1 clone after
        expect(info.formatElement[1].element).toBe('A');
        expect(info.formatElement[2].element).toBe('B');
        expect(info.formatElement[3].element).toBe('C');
        expect(info.element.total).toBe(5);
        expect(info.pageTotal).toBe(3);
    });

    it('資料含 onClick 時應正確保留', () => {
        const onClick = jest.fn();
        const props: IBearCarouselProps = {
            data: [
                {key: 1, text: 'A', onClick}
            ],
            autoPlayTime: 0,
        };
        const {info} = getMediaInfo(props);
        expect(info.formatElement[1].onClick).toBe(onClick);
    });
});
