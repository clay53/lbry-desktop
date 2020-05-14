// @flow
import React from 'react';
import Page from 'component/page';
import Card from 'component/common/card';
import Spinner from 'component/spinner';

type Props = {
  receiveAddress: ?string,
  gettingNewAddress: boolean,
  doGetNewAddress: () => void,
};

export default function BuyPage(props: Props) {
  const { receiveAddress, gettingNewAddress, doGetNewAddress } = props;

  React.useEffect(() => {
    if (!receiveAddress && !gettingNewAddress) {
      doGetNewAddress();
    }
  }, [receiveAddress, gettingNewAddress]);

  return (
    <Page authPage className="main--buy">
      <Card
        title={__('Purchase LBC')}
        subtitle={__('You can purchase LBC now.')}
        actions={
          receiveAddress ? (
            <iframe
              allow="accelerometer; autoplay; camera; gyroscope; payment"
              frameBorder="0"
              src={`https://buy.moonpay.io?apiKey=pk_live_xNFffrN5NWKy6fu0ggbV8VQIwRieRzy&colorCode=%23257761&currencyCode=lbc&walletAddress=${receiveAddress}`}
              width="100%"
            >
              <p>{__('Your browser does not support iframes.')}</p>
            </iframe>
          ) : (
            <div className="main--empty">
              <Spinner delayed />
            </div>
          )
        }
      />
    </Page>
  );
}
