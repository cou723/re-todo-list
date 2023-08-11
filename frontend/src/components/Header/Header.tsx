import { Icon } from '@iconify-icon/solid';
import { Show, createResource } from 'solid-js';

import { IconButton } from '../util/IconButton';

import { LoginButton } from './LoginButton';
import LogoIcon from './LogoIcon';
import { LogoutButton } from './LogoutButton';
import { UserDeleteButton } from './UserDeleteButton';

import api from '@/lib/api';

const Header = () => {
  const [loginName, { refetch }] = createResource(true, async () => {
    console.log('refetch');
    const res = await api.authStatus();
    if (res.ok) return res.val;
    else return undefined;
  });

  return (
    <header class="d-flex flex-wrap align-items-center justify-content-between py-3 border-bottom bg-pri-light">
      <nav class=" border-gray-400 px-4 py-2.5">
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
              <div class="flex flex-row items-center gap-3">
                <div class="flex flex-row item-center border  border-pri px-3 py-1">
                  <Icon class="text-3xl text-pri" icon="mdi:account-circle" />
                  <span class="mx-3 text-lg">{loginName()}</span>
                </div>
                <LogoutButton refetch={refetch} />
                <UserDeleteButton refetch={refetch} />
              </div>
            </Show>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
