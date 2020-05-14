import { connect } from 'react-redux';
import { selectGettingNewAddress, selectReceiveAddress, doGetNewAddress } from 'lbry-redux';
import BuyPage from './view';

const select = state => ({
  receiveAddress: selectReceiveAddress(state),
  gettingNewAddress: selectGettingNewAddress(state),
});

export default connect(select, {
  doGetNewAddress,
})(BuyPage);
