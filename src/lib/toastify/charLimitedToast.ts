// toastUtils.ts
import { toast as toastify, ToastOptions } from 'react-toastify';
import { limitChars } from '../../utils/limitCharacters';

export const toast = {
	error: (msg: string, opts?: ToastOptions) =>
		toastify.error(limitChars(msg), opts),
	success: (msg: string, opts?: ToastOptions) =>
		toastify.success(limitChars(msg), opts),
	info: (msg: string, opts?: ToastOptions) =>
		toastify.info(limitChars(msg), opts),
	warn: (msg: string, opts?: ToastOptions) =>
		toastify.warn(limitChars(msg), opts),
};
