import { Show, createResource } from 'solid-js';
import { Button } from 'solid-bootstrap';
import LogoIcon from './LogoIcon';
import api from '../../lib/api';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';
import { UserDeleteButton } from './UserDeleteButton';

const Header = (props: { class?: string }) => {
  const handleLogout = async () => await api.logout();

  const [loginName] = createResource(true, async () => {
    const res = await api.authStatus();
    console.log(res.ok, res.val);
    if (res.ok) return res.val;
    else return undefined;
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
            when={loginName()}
            fallback={
              <>
                <LoginButton />
                <Button href="/register">Sign-up</Button>
              </>
            }
          >
            <>
              <LogoutButton handleLogout={handleLogout} />
              <span class="ml-3">username: {loginName()}</span>
              <UserDeleteButton class="ml-3" />
            </>
          </Show>
        </div>
      </header>
    </div>
  );
};

export default Header;
