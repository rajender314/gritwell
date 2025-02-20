import { PiSpinner } from 'pixel-kit';
import React from 'react';
import { SpinnerOverlay } from '../../styles/common-styles';

export default function Spinner() {
	return (
		<SpinnerOverlay>
			<PiSpinner
				color="secondary"
				libraryType="atalskit"
				size={50}
			/>
		</SpinnerOverlay>
	)
}