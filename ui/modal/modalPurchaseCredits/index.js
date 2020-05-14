import { connect } from 'react-redux';
import { doHideModal } from 'redux/actions/app';
import ModalPurchaseCredits from './view';

export default connect(null, {
  doHideModal,
})(ModalPurchaseCredits);
