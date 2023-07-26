import {Ok, Err, type Result} from 'ts-results';
import endpoints from './endpoints';
import {PathReporter} from 'io-ts/PathReporter';
import {isRight} from 'fp-ts/lib/Either';
import {string} from 'io-ts';
import * as t from 'io-ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
const LoginResponse = t.type({
	accessToken: string,
});

async function fetchJwt(username: string, password: string): Promise<Result<string, string>> {
	const response = await fetch(endpoints.login, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({username, password}),
	});
	if (!response.ok) {
		return Err('Invalid username or password');
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const data: any = await response.json();
	const result = LoginResponse.decode(data);

	if (!isRight(result)) {
		return Err(PathReporter.report(result)[0]);
	}

	const jwt = result.right.accessToken;
	return Ok(jwt);
}
