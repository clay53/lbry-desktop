// @flow
import React from 'react';
import { Modal } from 'modal/modal';
import Card from 'component/common/card';

type Props = {
  doHideModal: () => void,
};

export default function ModalPurchaseCredits(props: Props) {
  const { doHideModal } = props;
  return (
    <Modal isOpen contentLabel={'Purchase LBRY Credits'} type="card" onAborted={doHideModal} className="modal--iframe">
      <Card
        title={__('Purchase LBC')}
        subtitle={__('You can purchase LBC now.')}
        actions={
          <iframe
            allow="accelerometer; autoplay; camera; gyroscope; payment"
            frameBorder="0"
            src="https://buy.moonpay.io?apiKey=pk_live_xNFffrN5NWKy6fu0ggbV8VQIwRieRzy&colorCode=%23257761&currencyCode=lbc"
            width="100%"
          >
            <p>{__('Your browser does not support iframes.')}</p>
          </iframe>
        }
      />
    </Modal>
  );
}
