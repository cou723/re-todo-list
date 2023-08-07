import { Show, createResource } from 'solid-js';
import LogoIcon from './LogoIcon';
import api from '@/lib/api';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';
import { UserDeleteButton } from './UserDeleteButton';
import { IconButton } from '../util/IconButton';

const Header = (props: { class?: string }) => {
  const [loginName] = createResource(true, async () => {
    const res = await api.authStatus();
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
      <nav class="bg-white border-gray-400 px-4 py-2.5">
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
                  <IconButton href="/register" icon="mdi:account-plus">
                    Sign-up
                  </IconButton>
                </>
              }
            >
              <div class="flex flex-row items-center">
                <span class="mr-3">username: {loginName()}</span>
                <LogoutButton />
                <UserDeleteButton class="ml-3" />
              </div>
            </Show>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
