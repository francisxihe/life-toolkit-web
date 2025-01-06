import { Checkbox } from '@arco-design/web-react';
import styles from './style.module.less';

export default function CheckDone(props: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div
      className={`w-8 h-8 flex items-center ${styles['custom-checkbox-wrapper']}`}
    >
      <Checkbox checked={props.checked} onChange={props.onChange} />
    </div>
  );
}
