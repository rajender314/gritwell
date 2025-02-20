import {PiSnackbarMessage} from 'pixel-kit';
import React from 'react';
type Props = {
appearance: string | any;
message: string;
open: boolean;
close: () => void;
title: string;
};
const Snackbar = (props: Props) => {
  return (
    <>
      <PiSnackbarMessage appearance={props.appearance}
        isOpen={props.open}
        onClose={props.close}
        title={props.title} >
        {props.message}
      </PiSnackbarMessage>
    </>
  );
};
export default Snackbar;
