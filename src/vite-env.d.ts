/// <reference types="vite/client" />

declare namespace JSX {
	interface IntrinsicElements {
		'spline-viewer': {
			url: string;
			[key: string]: string | number | boolean | undefined;
		};
	}
}
