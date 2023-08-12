import { Icon } from '@iconify-icon/solid';
import { Accessor, Setter, Show, createResource, createSignal } from 'solid-js';

import { IconButton } from '../util/IconButton';

import { LoginButton } from './LoginButton';
import LogoIcon from './LogoIcon';
import { LogoutButton } from './LogoutButton';
import { UserDeleteButton } from './UserDeleteButton';

import api from '@/lib/api';

const Header = (props:{username:Accessor<string|undefined>,setUsername:Setter<string|undefined>}) => {
  return (
    <header class="d-flex flex-wrap align-items-center justify-content-between py-3 border-bottom bg-pri-light">
      <nav class=" border-gray-400 px-4 py-2.5">
        <div class="flex flex-wrap justify-between items-center ">
          <a href="/" class="ml-4" style={{ display: 'inline-block' }}>
            <LogoIcon size={2} />
          </a>

          <div>
            <Show
              when={props.username()}
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
                  <span class="mx-3 text-lg">{props.username()}</span>
                </div>
                <LogoutButton refetch={()=>props.setUsername(undefined)} />
                <UserDeleteButton refetch={()=>props.setUsername(undefined)} />
              </div>
            </Show>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
