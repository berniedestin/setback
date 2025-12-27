// utils/grid.ts

import { Dimensions } from 'react-native';

const GRID_SIZE = 16;

/**
 * Calculates the size of a single 1x1 grid unit based on the 
 * smallest screen dimension (to ensure a square grid always fits).
 * @returns {number} The size (in pixels) of a 1x1 grid cell.
 */
export const getGridUnitSize = (): number => {
	const { width, height } = Dimensions.get('window');
	const smallestDimension = Math.min(width, height);
	return smallestDimension / GRID_SIZE;
};

/**
 * Converts grid coordinates and spans into absolute positioning styles.
 * @param rStart The starting row (1-16)
 * @param cStart The starting column (1-16)
 * @param rSpan How many rows the component covers (e.g., 2)
 * @param cSpan How many columns the component covers (e.g., 2)
 * @returns {object} The absolute positioning style object.
 */
export const getGridStyles = (
	rStart: number,
	cStart: number,
	rSpan: number,
	cSpan: number
): { position: 'absolute'; top: number; left: number; width: number; height: number } => {
	const gridUnitSize = getGridUnitSize();

	return {
		position: 'absolute',

		// Position (1-indexed start coordinates are converted to 0-indexed pixel offsets)
		top: (rStart - 1) * gridUnitSize,
		left: (cStart - 1) * gridUnitSize,

		// Size
		width: cSpan * gridUnitSize,
		height: rSpan * gridUnitSize,
	};
};
