import Button, { ButtonProps } from '../util/Button';
import { Icon } from '@iconify-icon/solid';

export const IconButton = (props: ButtonProps & { icon: string }) => {
  return (
    <Button {...props} class={'pl-4 ' + props.class}>
      <div class="flex items-center">
        <Icon class="mr-1" icon={props.icon} />
        {props.children}
      </div>
    </Button>
  );
};
