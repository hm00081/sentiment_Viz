import { atom } from 'recoil';

export const isDetail = atom({
    key: 'paperDetail',
    default: false,
});

export const GlobalSearchClose = atom({
    key: 'searchClose',
    default: false,
});
