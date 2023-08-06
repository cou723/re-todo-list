import { Show, createResource } from 'solid-js';
import LogoIcon from './LogoIcon';
import api from '@/lib/api';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';
import { UserDeleteButton } from './UserDeleteButton';
import Button from '../util/Button';

const Header = (props: { class?: string }) => {
  const [loginName] = createResource(true, async () => {
    const res = await api.authStatus();
    console.log(res.ok, res.val);
    if (res.ok) return res.val;
    else return undefined;
  });

  return (
    <header
      class={
        'd-flex flex-wrap align-items-center justify-content-between py-3 border-bottom ' +
        props.class
      }
    >
      <nav class="bg-white border-gray-200 px-4 py-2.5">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" class="ml-4" style={{ display: 'inline-block' }}>
            <LogoIcon size={2} />
          </a>

          <div>
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
                <LogoutButton />
                <span class="ml-3">username: {loginName()}</span>
                <UserDeleteButton class="ml-3" />
              </>
            </Show>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
