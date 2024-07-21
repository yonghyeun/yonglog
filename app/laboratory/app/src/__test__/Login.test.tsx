import useSessionStore from '../feature/login/store';
import { QueryStore } from '../App';
import Login from '../feature/login/Login';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.setTimeout(10 * 1000);

const renderSetup = () => {
  render(
    <QueryStore>
      <Login />
    </QueryStore>,
  );
  const $idInput = screen.getByTestId('id');
  const $passwordInput = screen.getByTestId('password');
  const $submitButton = screen.getByTestId('submit');
  const exampleString = 'test-test';
  return { $idInput, $passwordInput, $submitButton, exampleString };
};

const apiRenderSetup = () => {
  render(
    <QueryStore>
      <Login />
    </QueryStore>,
  );
  const $idInput = screen.getByTestId('id');
  const $passwordInput = screen.getByTestId('password');
  const $submitButton = screen.getByTestId('submit');
  return { $idInput, $passwordInput, $submitButton };
};

beforeEach(() => {
  jest.spyOn(console, 'error');
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockImplementation(() => null);
});

afterEach(() => {
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockRestore();
});

describe('Login Form이 렌더링 되었을 때', () => {
  it('ID가 입력되지 않았다면 제출 버튼은 비활성화 되어 있어야 한다.', async () => {
    const { $idInput, $passwordInput, $submitButton, exampleString } =
      renderSetup();
    await userEvent.type($idInput, '');
    await userEvent.type($passwordInput, exampleString);
    await expect($submitButton).toBeDisabled();
  });
  it('PASSWORD가 입력되지 않았다면 제출 버튼은 비활성화 되어 있어야 한다.', async () => {
    const { $idInput, $passwordInput, $submitButton, exampleString } =
      renderSetup();
    await userEvent.type($passwordInput, '');
    await userEvent.type($idInput, exampleString);
    await expect($submitButton).toBeDisabled();
  });
  it('ID,PASSWORD가 모두 입력 되었다면 제출 버튼은 활성화 되어 있어야 한다.', async () => {
    const { $idInput, $passwordInput, $submitButton, exampleString } =
      renderSetup();
    await userEvent.type($passwordInput, exampleString);
    await userEvent.type($idInput, exampleString);
    await expect($submitButton).toBeEnabled();
  });
});

describe('로그인 요청을 보냈을 때', () => {
  it('제출 버튼을 클릭 하면 API요청이 올바르게 전송 된다.', async () => {
    const { $idInput, $passwordInput, $submitButton } = apiRenderSetup();
    const ENDPOINT = 'http://localhost:3000/api/dev/auth';
    global.fetch = jest.fn();

    await userEvent.type($idInput, 'user');
    await userEvent.type($passwordInput, 'password');
    await $submitButton.click();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    expect(global.fetch).toBeCalledWith(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 'user',
        password: 'password',
      }),
    });
  });

  describe('로그인에 성공하면', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({ token: 'example-token', userName: 'useruser' }),
        }),
      ) as jest.Mock;
    });

    afterEach(() => {
      (global.fetch as jest.Mock).mockClear();
    });

    it('세션 스토어에 전송 받은 토큰이 저장된다.', async () => {
      const { $idInput, $passwordInput, $submitButton } = apiRenderSetup();
      await userEvent.type($idInput, 'useruser');
      await userEvent.type($passwordInput, 'password');
      await userEvent.click($submitButton);

      await waitFor(() => {
        const sessionStore = useSessionStore.getState();
        expect(sessionStore.token).toBe('example-token');
      });
    });

    it('세션 스토어에 전송 받은 유저 이름이 저장된다.', async () => {
      const { $idInput, $passwordInput, $submitButton } = apiRenderSetup();
      await userEvent.type($idInput, 'useruser');
      await userEvent.type($passwordInput, 'password');
      await userEvent.click($submitButton);

      await waitFor(() => {
        const sessionStore = useSessionStore.getState();
        expect(sessionStore.userName).toBe('useruser');
      });
    });
  });

  describe('로그인에 다음과 같은 이유로 실패하면', () => {
    describe('(네트워크나 서버 문제)', () => {
      it('서버 오류로 실패한 경우 동일한 요청을 성공 할 때 까지 3회 재전송 한다.', async () => {
        const { $idInput, $passwordInput, $submitButton } = apiRenderSetup();
        global.fetch = jest.fn(() => {
          return Promise.resolve({
            ok: false,
            status: 500,
            json: () => ({ message: '서버나 네트워크 상황이 불안정합니다.' }),
          });
        }) as jest.Mock;

        await userEvent.type($idInput, 'user');
        await userEvent.type($passwordInput, 'password');
        await userEvent.click($submitButton);

        await waitFor(
          () => {
            expect(global.fetch).toBeCalledTimes(4); // 초기 시도 + 재시도 3회,
          },
          {
            timeout: 5000,
            interval: 50,
          },
        );
      });
      it('네트워크 문제가 발생하면 동일한 요청을 성공 할 때 까지 3회 재전송 한다.', async () => {
        const { $idInput, $passwordInput, $submitButton } = apiRenderSetup();
        global.fetch = jest.fn(() => {
          return Promise.resolve({
            ok: false,
            status: 500,
            json: () => ({ message: '서버나 네트워크 상황이 불안정합니다.' }),
          });
        }) as jest.Mock;

        await userEvent.type($idInput, 'user');
        await userEvent.type($passwordInput, 'password');
        await userEvent.click($submitButton);

        await waitFor(
          () => {
            expect(global.fetch).toBeCalledTimes(4); // 초기 시도 + 재시도 3회
          },
          {
            timeout: 5000,
            interval: 50,
          },
        );
      });

      it('최종적으로 네트워크나 서버 문제로 인해 로그인에 실패했을 경우 에러 메시지를 alert 창을 이용해 띄운다.', async () => {
        const { $idInput, $passwordInput, $submitButton } = apiRenderSetup();
        global.fetch = jest.fn(() => {
          return Promise.resolve({
            ok: false,
            status: 500,
            json: () => ({ message: '서버나 네트워크 상황이 불안정합니다.' }),
          });
        }) as jest.Mock;

        const alertMock = jest.spyOn(window, 'alert');

        await userEvent.type($idInput, 'user');
        await userEvent.type($passwordInput, 'password');
        await userEvent.click($submitButton);

        await waitFor(
          () => {
            expect(alertMock).toBeCalledWith(
              '서버나 네트워크 상황이 불안정합니다.',
            );
          },
          {
            timeout: 5000,
            interval: 50,
          },
        );
      });
    });
  });

  it('인증에 실패하면 아이디나 비밀번호를 확인하라는 문구가 렌더링 된다.', async () => {
    const { $idInput, $passwordInput, $submitButton } = apiRenderSetup();
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: false,
        status: 401,
        json: () => ({ message: 'ID나 PASSWORD를 확인해주세요' }),
      });
    }) as jest.Mock;

    await userEvent.type($idInput, 'wrongUser');
    await userEvent.type($passwordInput, 'wrongPassword');
    await userEvent.click($submitButton);

    await waitFor(
      async () => {
        const $errorMessage = await screen.findByText(
          /ID나 PASSWORD를 확인해주세요/i,
        );
        expect($errorMessage).toBeInTheDocument();
      },
      {
        timeout: 5000,
        interval: 50,
      },
    );
  });
});
