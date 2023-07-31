import { Button } from 'solid-bootstrap';

export const LogoutButton = (props: { handleLogout: () => void }) => (
  <Button
    href="/login"
    variant="outline-primary"
    class="me-2 mr-1"
    onClick={props.handleLogout}
  >
    Logout
  </Button>
);
