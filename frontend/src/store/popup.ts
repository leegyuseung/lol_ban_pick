import { ReactElement } from 'react';
import { create } from 'zustand';

type PopupState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  content: string | ReactElement;
  setContent: (content: string | ReactElement) => void;

  btnList: { func: () => void; text: string }[];
  setBtnList: (btnList: { func: () => void; text: string }[]) => void;
  setPopup: ({
    isOpen,
    title,
    content,
    btnList,
  }: {
    isOpen: boolean;
    title: string;
    content: string | ReactElement;
    btnList: { func: () => void; text: string }[];
  }) => void;
  initPopupState: () => void;
};

export const usePopupStore = create<PopupState>((set, get) => ({
  isOpen: false,
  setIsOpen: (_isOpen) =>
    set({
      isOpen: _isOpen,
    }),
  title: '',
  setTitle: (title: string) =>
    set({
      title,
    }),
  content: '',
  setContent: (content: string | ReactElement) =>
    set({
      content,
    }),
  btnList: [],
  setBtnList: (btnList: { func: () => void; text: string }[]) =>
    set({
      btnList: [...btnList],
    }),
  initPopupState: () => {
    set({
      isOpen: false,
      title: '',
      content: '',
      btnList: [],
    });
  },
  setPopup: ({
    isOpen,
    title,
    content,
    btnList,
  }: {
    isOpen: boolean;
    title: string;
    content: string | ReactElement;
    btnList: { func: () => void; text: string }[];
  }) => {
    set({
      isOpen,
      title,
      content,
      btnList,
    });
  },
}));
