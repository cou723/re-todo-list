import { Show, createResource } from 'solid-js';
import { Button } from 'solid-bootstrap';
import LogoIcon from './LogoIcon';
import api from '../lib/api';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';

const Header = (props: { class?: string }) => {
  const handleLogout = async () => await api.logout();

  const [isLogin] = createResource(true, async () => {
    const res = await api.authStatus();
    return res.ok;
  });

  return (
    <div class="container">
      <header
        class={
          'd-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom ' +
          props.class
        }
      >
        <a href="/" class="d-flex align-items-center ">
          <LogoIcon size={2} />
        </a>

        <div class="text-end">
          <Show
            when={isLogin()}
            fallback={
              <>
                <LoginButton />
                <Button href="/register">Sign-up</Button>
              </>
            }
          >
            <LogoutButton handleLogout={handleLogout} />
          </Show>
        </div>
      </header>
    </div>
  );
};

export default Header;
