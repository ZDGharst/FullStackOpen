import { useApolloClient, useMutation } from '@apollo/client';

import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ( username, password ) => {
    try {
      const { data } = await mutate({ variables: { username, password }});
      await authStorage.setAccessToken(data.authorize.accessToken);
      apolloClient.resetStore();
    } catch(e) {
      throw new Error(e);
    }
  };

  return [ signIn, result ];
};

export default useSignIn;
