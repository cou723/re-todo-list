import { Button } from 'solid-bootstrap';
import LogoIcon from './LogoIcon';
const Header = (props: { class?: string }) => (
  <div class="container">
    <header
      class={
        'd-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom ' +
        props.class
      }
    >
      <a
        href="/"
        class="d-flex align-items-center  text-dark text-decoration-none"
      >
        <LogoIcon size={2} />
      </a>

      <div class=" text-end">
        <Button
          onClick={() => (window.location.href = '/login')}
          variant="outline-primary"
          class="me-2 mr-1"
        >
          Login
        </Button>
        <Button onClick={() => (window.location.href = '/register')} class="">
          Sign-up
        </Button>
      </div>
    </header>
  </div>
);

export default Header;
